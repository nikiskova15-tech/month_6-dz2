import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getProducts } from '../shared/api/api.js'
import Loader from '../shared/Loader.js'
import ProductFilters from '../features/ProductFilters.jsx'
import ProductsList from '../widgets/ProductList.js'

export default function HomePage() {
    const [params, setParams] = useSearchParams()
    const page = Math.max(1, Number(params.get('page') || 1))
    const limit = 12
    const title = params.get('title') || ''
    const categoryId = params.get('categoryId') || ''
    const min = params.get('price_min') || ''
    const max = params.get('price_max') || ''
    const sort = params.get('sort') || 'newest'
    const apiParams = {
        offset: (page - 1) * limit,
        limit,
        title: title || undefined,
        categoryId: categoryId || undefined,
        price_min: min || undefined,
        price_max: max || undefined,
        sortBy: sort.startsWith('price') ? 'price' : 'id',
        order: sort === 'price-asc' ? 'ASC' : 'DESC',
    }
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 300000
    })
    const { data: products = [], isLoading, isFetching, error } = useQuery({
        queryKey: ['products', apiParams],
        queryFn: () => getProducts(apiParams),
        placeholderData: (previous) => previous,
    })
    const hasNextPage = products.length === limit
    const goToPage = (value) => setParams(
        (previous) => {
            const next = new URLSearchParams(previous);
            next.set('page', String(value));
            return next
        })

    return <>
        <section id="catalog" >
            <ProductFilters categories={categories} />
            {error
                ? <div>Каталог временно недоступен. Попробуйте обновить страницу.</div>
                : isLoading
                    ? <Loader />
                    : <>
                        <div>
                            <ProductsList products={products} />
                        </div>
                        <div>
                            <div>
                                <button disabled={page <= 1}
                                    onClick={() => goToPage(page - 1)}>ПРошлая страница</button>
                                <span>{page}</span>
                                <button disabled={!hasNextPage}
                                    onClick={() => goToPage(page + 1)}>Cледующая страница</button>
                            </div>
                        </div>
                    </>
            }
        </section>
    </>
}