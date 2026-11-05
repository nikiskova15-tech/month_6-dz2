import axios from 'axios'
import type {
  Category,
  Product,
  ProductChanges,
  ProductInput,
  ProductQuery,
} from './types'

export const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
})

export async function getProducts(
  params: ProductQuery = {},
): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products', { params })
  return data
}

export async function createProduct(
  product: ProductInput,
): Promise<Product> {
  const { data } = await api.post<Product>('/products', product)
  return data
}

export async function replaceProduct(
  product: ProductInput & { id: number },
): Promise<Product> {
  const { id, ...body } = product
  const { data } = await api.put<Product>(`/products/${id}`, body)
  return data
}

export async function patchProduct(
  product: ProductChanges & { id: number },
): Promise<Product> {
  const { id, ...changes } = product
  const { data } = await api.patch<Product>(`/products/${id}`, changes)
  return data
}

export async function updateProduct({
  id,
  changes,
}: {
  id: number
  changes: ProductChanges
}): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}`, changes)
  return data
}

export async function getProduct(id: string | number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories')
  return Array.isArray(data) ? data : []
}

export async function deleteProduct(id: number): Promise<Product> {
  const { data } = await api.delete<Product>(`/products/${id}`)
  return data
}

const OWNER_KEY = 'forme-owned-products'
export const OWNER_PREFIX = 'Nikiskova'

export function rememberOwnedProduct(id: number): void {
  const ids = getOwnedProductIds()
  if (!ids.includes(id)) {
    localStorage.setItem(OWNER_KEY, JSON.stringify([...ids, id]))
  }
}

export function getOwnedProductIds(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(OWNER_KEY) || '[]')
    return Array.isArray(value)
      ? value.filter((id): id is number => typeof id === 'number')
      : []
  } catch {
    return []
  }
}

export function isOwnedProduct(
  product: Product | null | undefined,
): boolean {
  return Boolean(product && getOwnedProductIds().includes(product.id))
}