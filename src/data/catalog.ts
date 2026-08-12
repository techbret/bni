import { categories } from "@/data/categories"
import { fitments } from "@/data/fitments"
import { products } from "@/data/products"
import { vehicles } from "@/data/vehicles"
import type { Category, CategoryKind, Product } from "@/types/catalog"

function compareStrings(a: string, b: string) {
  return a.localeCompare(b)
}

export function listMakes(): string[] {
  return [...new Set(vehicles.map((vehicle) => vehicle.make))].sort(
    compareStrings
  )
}

export function listModels(make: string): string[] {
  return [
    ...new Set(
      vehicles
        .filter((vehicle) => vehicle.make === make)
        .map((vehicle) => vehicle.model)
    ),
  ].sort(compareStrings)
}

export function listYears(make: string, model: string): number[] {
  return [
    ...new Set(
      vehicles
        .filter(
          (vehicle) => vehicle.make === make && vehicle.model === model
        )
        .map((vehicle) => vehicle.year)
    ),
  ].sort((a, b) => b - a)
}

export function getCategories(kind?: CategoryKind): Category[] {
  const filtered = kind
    ? categories.filter((category) => category.kind === kind)
    : categories

  return [...filtered].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getTopLevelCategories(kind?: CategoryKind): Category[] {
  return getCategories(kind).filter((category) => !category.parentId)
}

export function getChildCategories(parentId: string): Category[] {
  return getCategories().filter((category) => category.parentId === parentId)
}

export function getPopularCategories(): Category[] {
  return getTopLevelCategories("parts")
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  const childIds = getChildCategories(categoryId).map((child) => child.id)
  const categoryIds = new Set([categoryId, ...childIds])

  return products.filter((product) => categoryIds.has(product.categoryId))
}

export function getProductsByFitment(
  make: string,
  model: string,
  year: number
): Product[] {
  const matchingVehicleIds = new Set(
    vehicles
      .filter(
        (vehicle) =>
          vehicle.make === make &&
          vehicle.model === model &&
          vehicle.year === year
      )
      .map((vehicle) => vehicle.id)
  )

  const productIds = new Set(
    fitments
      .filter((fitment) => matchingVehicleIds.has(fitment.vehicleId))
      .map((fitment) => fitment.productId)
  )

  return products.filter((product) => productIds.has(product.id))
}

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(limit = 6): Product[] {
  const featuredIds = [
    "prod_tc_classic_001",
    "prod_tc_4wd_001",
    "prod_tc_ford_001",
    "prod_tc_gm_001",
    "prod_friction_001",
    "prod_fluid_001",
  ]

  return featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit)
}

export type ProductFilterOptions = {
  make?: string | null
  model?: string | null
  year?: number | null
  query?: string | null
}

export function filterProducts(
  source: Product[],
  options: ProductFilterOptions = {}
): Product[] {
  const { make, model, year, query } = options
  let result = source

  if (make && model && year && !Number.isNaN(year)) {
    const fittedIds = new Set(
      getProductsByFitment(make, model, year).map((product) => product.id)
    )
    result = result.filter((product) => fittedIds.has(product.id))
  }

  const normalizedQuery = query?.trim().toLowerCase()
  if (normalizedQuery) {
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery)
    )
  }

  return result
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}
