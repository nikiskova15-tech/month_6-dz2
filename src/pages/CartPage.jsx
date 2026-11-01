import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.jsx'

export default function CartPage() {
    const cart = useProductStore((state) => state.cart)
    const changeQuantity = useProductStore((state) => state.changeQuantity)
    const removeFromCart = useProductStore((state) => state.removeFromCart)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div>
            <div >
                <h1>Ваша корзина.</h1>
            </div>

            {cart.length ? (
                <div >
                    <div>
                        {cart.map((item) => (
                            <div key={item.id}>
                                <Link to={`/products/${item.id}`}>
                                    <img src={item.image} alt={item.title} />
                                </Link>

                                <div >
                                    <Link to={`/products/${item.id}`} >
                                        {item.title}
                                    </Link>
                                    <span>{item.category?.name}</span>
                                    <div>
                                        <button
                                            onClick={() => changeQuantity(item.id, -1)}
                                        >
                                            −
                                        </button>
                                        <b>{item.quantity}</b>
                                        <button
                                            onClick={() => changeQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <strong>{(item.price * item.quantity)}</strong>
                                <button onClick={() => removeFromCart(item.id)}                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                        <div >
                            <span>Итого</span>
                            <b>{(total + (total > 150 ? 0 : 12))}</b>
                        </div>
                    
                </div>
            ) : (
                <div>
                    <h3>Корзина пока пуста</h3>
                    <Link to="/">            Перейти в каталог          </Link>
                </div>
            )}
        </div>
    )
}