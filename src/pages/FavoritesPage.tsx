import { Link } from 'react-router-dom'
import { useProductStore } from '../entities/useProductStore'
import ProductsList from '../widgets/ProductList'

export default function FavoritesPage() {
  const favorites = useProductStore((state) => state.favorites)

  return (
    <div>
      <h1>Избранное.</h1>

      {favorites.length ? (
        <ProductsList products={favorites} />
      ) : (
        <div>
          <h3>Пока ничего не сохранено</h3>
          <p>Нажмите на сердечко у товара, чтобы добавить его сюда.</p>
          <Link to="/">Перейти в каталог</Link>
        </div>
      )}
    </div>
  )
}