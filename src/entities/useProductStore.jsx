import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const sameProduct = (first, second) => String(first) === String(second)

export const useProductStore = create(
  persist(
    (set) => ({
      favorites: [],
      cart: [],

      toggleFavorite: (product) =>
        set((state) => ({
          favorites: state.favorites.some((item) => sameProduct(item.id, product.id))
            ? state.favorites.filter((item) => !sameProduct(item.id, product.id))
            : [...state.favorites, product],
        })),

      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => !sameProduct(item.id, id)),
        })),

      clearFavorites: () => set({ favorites: [] }),

      addToCart: (product) =>
        set((state) => ({
          cart: state.cart.some((item) => sameProduct(item.id, product.id))
            ? state.cart.map((item) =>
              sameProduct(item.id, product.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
            : [...state.cart, { ...product, quantity: 1 }],
        })),

      toggleCart: (product) =>
        set((state) => ({
          cart: state.cart.some((item) => sameProduct(item.id, product.id))
            ? state.cart.filter((item) => !sameProduct(item.id, product.id))
            : [...state.cart, { ...product, quantity: 1 }],
        })),

      changeQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            sameProduct(item.id, id)
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        })),

      setQuantity: (id, quantity) =>
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((item) => !sameProduct(item.id, id))
            : state.cart.map((item) =>
              sameProduct(item.id, id) ? { ...item, quantity } : item,
            ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => !sameProduct(item.id, id)),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'escuelajs-product-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        cart: state.cart,
      }),
    },
  ),
)

export const selectFavoritesCount = (state) => state.favorites.length
export const selectCartCount = (state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0)

export default useProductStore