import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    deleteProduct,
    getProduct,
    getProducts,
    isOwnedProduct,
} from '../shared/api'
import Loader from '../shared/Loader'
import ProductsList from '../widgets/ProductList'
import { useProductStore } from '../entities/useProductStore'
import type { Product } from '../shared/types'

const money = (value: number) =>
    new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(Number(value) || 0)

export default function ProductPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const addToCart = useProductStore((state) => state.addToCart)
    const favorites = useProductStore((state) => state.favorites)
    const toggleFavorite = useProductStore((state) => state.toggleFavorite)

    const {
        data: product,
        isLoading,
        error,
    } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => getProduct(id!),
        enabled: Boolean(id),
    })

    const { data: related = [] } = useQuery({
        queryKey: ['related', product?.category?.id],
        queryFn: () =>
            getProducts({ categoryId: product!.category!.id, limit: 4 }),
        enabled: Boolean(product?.category?.id),
    })

    const remove = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            navigate('/')
        },
    })

    if (isLoading) return <Loader />
    if (error || !product) return <div>Не удалось загрузить этот товар.</div>

    const owned = isOwnedProduct(product)
    const image = product.images?.find(
        (url) => typeof url === 'string' && /^https?:/.test(url),
    )
    const favorite = favorites.some((item) => item.id === product.id)

    return (
        <>
            <div>
                {image && <img src={image} alt={product.title} />}
                <div>
                    <p>{String(product.id).padStart(4, '0')}</p>
                    <h1>{product.title}</h1>
                    <p>{money(product.price)}</p>

                    <div>
                        <button onClick={() => addToCart(product)}>
                            Добавить в корзину
                        </button>
                        <button onClick={() => toggleFavorite(product)}>
                            {favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                        </button>
                    </div>

                    <div>
                        <b>{product.category?.name || 'Новая коллекция'}</b>
                    </div>

                    {owned && (
                        <div>
                            <Link to={`/products/${id}/edit`}>Редактировать</Link>
                            <button
                                onClick={() => {
                                    if (window.confirm('Удалить этот товар?')) {
                                        remove.mutate(product.id)
                                    }
                                }}
                            >
                                Удалить товар
                            </button>
                        </div>
                    )}

                    {remove.isError && <div>Не удалось удалить товар.</div>}
                </div>
            </div>

            {related.length > 0 && (
                <div>
                    <Link to="/">Весь каталог</Link>
                    <ProductsList
                        products={related
                            .filter((item) => item.id !== product.id)
                            .slice(0, 4)}
                    />
                </div>
            )}
        </>
    )
}