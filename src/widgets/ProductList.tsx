import ProductCard from '../entities/ProductCard'

type Product = {
  id: string | number
  title: string
  price: number
}

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