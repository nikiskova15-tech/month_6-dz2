import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from './useProductStore'
import type { Product } from '../shared/types'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const cart = useProductStore((state) => state.cart)
  const favorites = useProductStore((state) => state.favorites)
  const toggleFavorite = useProductStore((state) => state.toggleFavorite)
  const addToCart = useProductStore((state) => state.addToCart)

  const isInCart = cart.some((item) => item.id === product.id)
  const isFavorite = favorites.some((item) => item.id === product.id)
  const image = product.images?.find(
    (url) => typeof url === 'string' && url.startsWith('http'),
  )

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      {image && <img src={image} alt={product.title} loading="lazy" />}
      <h3>{product.title}</h3>
      <span>{product.price} $</span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          toggleFavorite(product)
        }}
      >
        {isFavorite ? 'Убрать из избранного' : 'В избранное'}
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          addToCart(product)
        }}
      >
        {isInCart ? 'Добавить ещё в корзину' : 'В корзину'}
      </button>
    </Card>
  )
}