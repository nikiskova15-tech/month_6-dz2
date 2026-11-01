import { useQuery } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct, isOwnedProduct } from '../shared/api/api.js'
import Loader from '../shared/Loader.jsx'
import ProductForm from '../features/ProductForm.jsx'

export default function AddProductPage() {
    const { id } = useParams()
    const editing = Boolean(id)

    const { data: product, isLoading, error, } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        enabled: editing,
    })

    if (editing && isLoading) {
        return <Loader label="Загружаем товар для редактирования..." />
    }

    if (editing && (error || !product)) {
        return (
            <h2>Не удалось загрузить товар.</h2>
        )
    }

    if (editing && !isOwnedProduct(product)) {
        return (
            <section>
                <div>
                    Редактировать можно только свои товары.
                </div>
            </section>
        )
    }

    return (
        <section>
            <div>
                <p>
                    {editing
                        ? 'изменение'
                        : 'новый товар'}
                </p>
                <h2>{editing ? 'Изменить товар' : 'Добавить товар'}</h2>
            </div>

            <ProductForm product={product} editing={editing} />
        </section>
    )
}