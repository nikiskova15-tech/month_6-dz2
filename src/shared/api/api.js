const API = "https://api.escuelajs.co/api/v1"

import axios from "axios";

export const api = axios.create({  baseURL: 'https://api.escuelajs.co/api/v1'})

export const getProducts = async ({ q, category, sort, order }) => {
    const { data } = await api.get('/products', {
        params: {
            q: q || undefined,
            category: category || undefined,
            _sort: sort,
            _order: order
        }
    })

    return data;
}

export const createProduct = (product) => api.post('/products', product).then((r) => r.data)
export const replaceProduct = ({ id, ...product }) => api.put(`/products/${id}`, product).then((r) => r.data)
export const patchProduct = ({ id, ...changes }) => api.patch(`/products/${id}`, changes).then((r) => r.data)

export const updateProduct = async ({ id, changes }) => {
  const { data } = await api.patch(`/products/${id}`, changes);
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export async function getCategories() {
  const { data } = await api.get('/categories')
  return Array.isArray(data) ? data : []
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`)
  return data
}

const OWNER_KEY = 'forme-owned-products'
export const OWNER_PREFIX = 'Nikiskova'

export function rememberOwnedProduct(id) {
  const ids = getOwnedProductIds()
  if (!ids.includes(id)) localStorage.setItem(OWNER_KEY, JSON.stringify([...ids, id]))
}

export function getOwnedProductIds() {
  try {
    return JSON.parse(localStorage.getItem(OWNER_KEY) || '[]')
  } catch {
    return []
  }
}

export function isOwnedProduct(product) {
  return Boolean(product && getOwnedProductIds().includes(product.id))
}