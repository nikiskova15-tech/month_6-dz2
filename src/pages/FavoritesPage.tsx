import { Link } from 'react-router-dom'
import { useProductStore } from '../entities/useProductStore.js'
import ProductsList from '../widgets/ProductList.js'

export default function FavoritesPage() {
  const favorites = useProductStore((state) => state.favorites)

  return (
    <div >
      <div>
        <h1>Избранное.</h1>
      </div>

      {favorites.length ? (
        <ProductsList products={favorites} />
      ) : (
        <div>
          <h3>Пока ничего не сохранено</h3>
          <p>Нажмите на сердечко у товара, чтобы добавить его сюда.</p>
          <Link to="/" >
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  )
}