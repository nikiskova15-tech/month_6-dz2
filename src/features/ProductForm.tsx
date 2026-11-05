import { useEffect, useState, type FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
    createProduct,
    getCategories,
    isOwnedProduct,
    OWNER_PREFIX,
    rememberOwnedProduct,
    updateProduct,
} from '../shared/api'
import type { Category, Product, ProductInput } from '../shared/types'

type ProductFormProps = {
    product?: Product
    editing?: boolean
}

export default function ProductForm({
    product,
    editing = false,
}: ProductFormProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [images, setImages] = useState('')
    const [message, setMessage] = useState('')

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    useEffect(() => {
        if (!product) return
        setTitle(product.title || '')
        setPrice(String(product.price || ''))
        setDescription(product.description || '')
        setCategoryId(String(product.category?.id || product.categoryId || ''))
        setImages((product.images || []).join('\n'))
    }, [product])

    const mutation = useMutation({
        mutationFn: (payload: ProductInput) =>
            editing && product
                ? updateProduct({ id: product.id, changes: payload })
                : createProduct(payload),

        onSuccess: (saved) => {
            if (!editing) rememberOwnedProduct(saved.id)
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.setQueryData(['product', String(saved.id)], saved)
            navigate(`/products/${saved.id}`)
        },

        onError: (error: unknown) => {
            const messageFromApi = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined

            setMessage(
                messageFromApi ||
                'Не удалось сохранить товар. Проверьте данные и повторите попытку.',
            )
        },
    })

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setMessage('')

        if (!editing && !title.trim().startsWith(`${OWNER_PREFIX} `)) {
            setMessage(`Добавьте фамилию в начало названия: «${OWNER_PREFIX}».`)
            return
        }

        const imageList = images
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean)

        if (!imageList.length) {
            setMessage('Добавьте хотя бы одну ссылку на изображение.')
            return
        }

        mutation.mutate({
            title: title.trim(),
            price: Number(price),
            description: description.trim(),
            categoryId: Number(categoryId),
            images: imageList,
        })
    }

    if (editing && !isOwnedProduct(product)) {
        return <div>Редактировать можно только свои товары.</div>
    }

    return (
        <form onSubmit={submit}>
            <label>
                Название
                <input
                    required
                    maxLength={120}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder={`${OWNER_PREFIX} Ceramic Vase`}
                />
            </label>

            <div>
                <label>
                    Цена
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="0"
                    />
                </label>

                <label>
                    Категория
                    <select
                        required
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <label>
                Описание
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="О товаре..."
                />
            </label>

            <label>
                Ссылки на изображения
                <span>Каждая ссылка — с новой строки</span>
                <textarea
                    rows={3}
                    required
                    value={images}
                    onChange={(event) => setImages(event.target.value)}
                    placeholder="https://..."
                />
            </label>

            {message && <div>{message}</div>}

            <div>
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending
                        ? 'Сохраняем...'
                        : editing
                            ? 'Сохранить изменения'
                            : 'Опубликовать товар'}
                </button>
                <Link to={editing && product ? `/products/${product.id}` : '/'}>
                    Отмена
                </Link>
            </div>
        </form>
    )
}