import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import FavoritesPage from './pages/FavoritesPage'
import CartPage from './pages/CartPage'
import AddProductPage from './pages/AddProductPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products/:id', element: <ProductPage /> },
      { path: 'products/:id/edit', element: <AddProductPage /> },
      { path: 'create', element: <AddProductPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router