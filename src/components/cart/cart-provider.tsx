/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { toast } from "sonner"

import { formatPrice, getAllProducts } from "@/data/catalog"
import type { CartItem } from "@/types/cart"
import type { Product } from "@/types/catalog"

const STORAGE_KEY = "bni-cart"

type CartLine = CartItem & {
  product: Product
  lineTotal: number
}

type CartContextValue = {
  items: CartItem[]
  lines: CartLine[]
  itemCount: number
  subtotal: number
  subtotalLabel: string
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(
      (item) =>
        typeof item.productId === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
    )
  } catch {
    return []
  }
}

function findProductName(productId: string) {
  return (
    getAllProducts().find((product) => product.id === productId)?.name ??
    "Item"
  )
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((productId: string, quantity = 1) => {
    const name = findProductName(productId)
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...current, { productId, quantity }]
    })
    toast.success("Added to cart", {
      description: name,
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    const name = findProductName(productId)
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    )
    toast.message("Removed from cart", {
      description: name,
    })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        const name = findProductName(productId)
        toast.message("Removed from cart", {
          description: name,
        })
        return current.filter((item) => item.productId !== productId)
      }
      return current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
  }, [])

  const productsById = useMemo(() => {
    const map = new Map<string, Product>()
    for (const product of getAllProducts()) {
      map.set(product.id, product)
    }
    return map
  }, [])

  const lines = useMemo(() => {
    return items.flatMap((item) => {
      const product = productsById.get(item.productId)
      if (!product) {
        return []
      }
      return [
        {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        },
      ]
    })
  }, [items, productsById])

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines]
  )

  const value = useMemo(
    () => ({
      items,
      lines,
      itemCount,
      subtotal,
      subtotalLabel: formatPrice(subtotal),
      addItem,
      removeItem,
      setQuantity,
      clear,
    }),
    [
      items,
      lines,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clear,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
