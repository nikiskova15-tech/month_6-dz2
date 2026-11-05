import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct, isOwnedProduct } from '../shared/api'
import Loader from '../shared/Loader'
import ProductForm from '../features/ProductForm'
import type { Product } from '../shared/types'

export default function AddProductPage() {
    const { id } = useParams<{ id: string }>()
    const editing = Boolean(id)

    const {
        data: product,
        isLoading,
        error,
    } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => getProduct(id!),
        enabled: editing,
    })

    if (editing && isLoading) {
        return <Loader label="Загружаем товар для редактирования..." />
    }

    if (editing && (error || !product)) {
        return <h2>Не удалось загрузить товар.</h2>
    }

    if (editing && !isOwnedProduct(product)) {
        return <section>Редактировать можно только свои товары.</section>
    }

    return (
        <section>
            <p>{editing ? 'изменение' : 'новый товар'}</p>
            <h2>{editing ? 'Изменить товар' : 'Добавить товар'}</h2>
            <ProductForm product={product} editing={editing} />
        </section>
    )
}