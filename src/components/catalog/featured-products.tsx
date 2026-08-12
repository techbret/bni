import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import {
  CatalogFilters,
  type CatalogFilterState,
} from "@/components/catalog/catalog-filters"
import { ProductTable } from "@/components/catalog/product-table"
import { filterProducts, getFeaturedProducts } from "@/data/catalog"

export function FeaturedProducts() {
  const products = useMemo(() => getFeaturedProducts(), [])
  const [filters, setFilters] = useState<CatalogFilterState>({
    make: null,
    model: null,
    year: null,
    query: "",
  })

  const filteredProducts = useMemo(() => {
    const yearNumber = filters.year ? Number(filters.year) : null
    return filterProducts(products, {
      make: filters.make,
      model: filters.model,
      year: yearNumber,
      query: filters.query,
    })
  }, [filters, products])

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured products
          </h2>
          <p className="text-sm text-muted-foreground">
            A quick look at reman converters and related rebuild parts.
          </p>
        </div>
        <Link
          to="/catalog"
          className="text-sm font-medium text-primary hover:underline"
        >
          View full catalog
        </Link>
      </div>

      <CatalogFilters value={filters} onChange={setFilters} />
      <ProductTable products={filteredProducts} showStall={false} />
    </section>
  )
}
