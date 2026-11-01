import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

export default function App() {
  return <RouterProvider router={router} />
}


// Базовая архитектура

// Плюсы
// Очень просто
// Быстрый старт
// Легко найти

// Минусы
// Код одной фичи размазан по всему проекту
// Папки разрастаются
// Нет правил зависимостей
// Сложно удалить фичу
// Плохо масштабируется на команду

// api, components, hooks, pages, store, types, utils
// Подходит для маленьких проектов (до 10-15 экранов), прототипов, учебных проектов

//

// FSD - Feature Sliced Design

// app - Запуск приложения: провайдеры, роутер, глобальные стили
// pages - Страницы целиком: CatalogPage, ProductPage, LoginPage
// widgets - Крупные самостоятельные блоки: Header, Sidebar, ProductList,
// features - Действия пользователя, которые приносят пользу: add-to-cart, auth-by-email, search-products
// entities - Бизнес сущности: product, user, cart
// shared - Переиспользуемое, не связанное с бизнесом: Button, Input
