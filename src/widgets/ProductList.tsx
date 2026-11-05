import ProductCard from '../entities/ProductCard'
import type { Product } from '../shared/types'

type ProductsListProps = {
  products?: Product[]
}

export default function ProductsList({ products = [] }: ProductsListProps) {
  if (products.length === 0) {
    return <div>Ничего не нашлось.</div>
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}