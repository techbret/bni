export type CategoryKind = "parts" | "info"

export type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  transmission?: string
  engine?: string
}

export type Category = {
  id: string
  slug: string
  name: string
  kind: CategoryKind
  parentId?: string
  description?: string
  sortOrder: number
}

export type Product = {
  id: string
  sku: string
  slug: string
  name: string
  categoryId: string
  shortDescription: string
  description: string
  specs: Record<string, string>
  price: number
  images: string[]
  tags: string[]
  inStock: boolean
}

export type Fitment = {
  id: string
  productId: string
  vehicleId: string
  notes?: string
}
