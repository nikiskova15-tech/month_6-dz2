export type Category = {
  id: number
  name: string
  image?: string
}

export type Product = {
  id: number
  title: string
  price: number
  description?: string
  images?: string[]
  image?: string
  category?: Category
  categoryId?: number
}

export type CartItem = Product & {
  quantity: number
}

export type ProductInput = {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export type ProductQuery = {
  offset?: number
  limit?: number
  title?: string
  categoryId?: string | number
  price_min?: string
  price_max?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export type ProductChanges = Partial<ProductInput>