import ProductCard from './ProductCard'

export default function ProductsList({ products = [] }) {
  if (products.length === 0) {
    return <div>Ничего не нашлось.</div>
  }

  return (
    <div >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}