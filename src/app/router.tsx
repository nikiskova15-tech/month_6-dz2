import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import ProductPage from '../pages/ProductPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import CartPage from '../pages/CartPage.jsx'
import AddProductPage from '../pages/AddProductPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

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