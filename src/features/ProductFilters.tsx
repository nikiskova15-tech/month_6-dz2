import { useSearchParams } from 'react-router-dom'
import type { Category } from '../shared/types'

type ProductFiltersProps = {
  categories?: Category[]
}

export default function ProductFilters({
  categories = [],
}: ProductFiltersProps) {
  const [params, setParams] = useSearchParams()

  const setFilter = (key: string, value: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        value ? next.set(key, value) : next.delete(key)
        if (key !== 'page') next.delete('page')
        return next
      },
      { replace: true },
    )
  }

  return (
    <div>
      <label>
        <span>⌕</span>
        <input
          aria-label="Поиск товаров"
          placeholder="Найти предмет..."
          value={params.get('title') || ''}
          onChange={(event) => setFilter('title', event.target.value)}
        />
      </label>

      <select
        aria-label="Категория"
        value={params.get('categoryId') || ''}
        onChange={(event) => setFilter('categoryId', event.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div>
        <input
          type="number"
          min="0"
          placeholder="Цена от"
          value={params.get('price_min') || ''}
          onChange={(event) => setFilter('price_min', event.target.value)}
        />
        <span>—</span>
        <input
          type="number"
          min="0"
          placeholder="до"
          value={params.get('price_max') || ''}
          onChange={(event) => setFilter('price_max', event.target.value)}
        />
      </div>

      <select
        value={params.get('sort') || 'newest'}
        onChange={(event) => setFilter('sort', event.target.value)}
      >
        <option value="newest">Сначала новые</option>
        <option value="price-asc">Сначала дешевле</option>
        <option value="price-desc">Сначала дороже</option>
      </select>
    </div>
  )
}