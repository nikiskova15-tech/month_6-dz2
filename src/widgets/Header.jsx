import { Link, NavLink } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.jsx'

function Header() {
    const favoriteCount = useProductStore((state) => state.favorites.length)
    const cartCount = useProductStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0))

    return(
    <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <Link to="/"><h1>Мини-маркетплейс</h1></Link>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '300px'
        }}>
            <nav>
                <NavLink to="/">Каталог</NavLink>
                <NavLink to="/favorites">Избранное {favoriteCount}</NavLink>
                <NavLink to="/cart">Корзина {cartCount}</NavLink>
            </nav>
            <Link to="/create">Добавить товар</Link>
        </div>
    </header>
)}

export default Header