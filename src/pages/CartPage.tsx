import { Link } from 'react-router-dom'
import { useProductStore } from '../entities/useProductStore'

const money = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export default function CartPage() {
  const cart = useProductStore((state) => state.cart)
  const changeQuantity = useProductStore((state) => state.changeQuantity)
  const removeFromCart = useProductStore((state) => state.removeFromCart)
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <div>
      <h1>Ваша корзина.</h1>

      {cart.length ? (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                {item.image && <img src={item.image} alt={item.title} />}
              </Link>

              <div>
                <Link to={`/products/${item.id}`}>{item.title}</Link>
                <span>{item.category?.name}</span>
                <div>
                  <button onClick={() => changeQuantity(item.id, -1)}>
                    −
                  </button>
                  <b>{item.quantity}</b>
                  <button onClick={() => changeQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>

              <strong>{money(item.price * item.quantity)}</strong>
              <button onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          ))}

          <div>
            <span>Итого</span>
            <b>{money(total + (total > 150 ? 0 : 12))}</b>
          </div>
        </div>
      ) : (
        <div>
          <h3>Корзина пока пуста</h3>
          <Link to="/">Перейти в каталог</Link>
        </div>
      )}
    </div>
  )
}