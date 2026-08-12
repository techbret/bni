import { useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"

import {
  CatalogFilters,
  type CatalogFilterState,
} from "@/components/catalog/catalog-filters"
import { ProductTable } from "@/components/catalog/product-table"
import {
  filterProducts,
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategoryId,
} from "@/data/catalog"

function resolveCatalogView(categorySlug: string | undefined) {
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined

  if (category) {
    const products = getProductsByCategoryId(category.id)
    const emptyPartsHint =
      category.kind === "parts" && products.length === 0
        ? "No mock products in this category yet — more rebuild parts will be added as the catalog grows."
        : undefined

    return {
      category,
      products,
      title: category.name,
      description:
        category.description ??
        (category.kind === "info"
          ? "Automotive information category — article pages coming soon. Related parts shown when available."
          : "Products in this category."),
      emptyMessage: emptyPartsHint,
    }
  }

  return {
    category,
    products: getAllProducts(),
    title: "Catalog",
    description: "Browse remanufactured torque converters and related parts.",
  }
}

export function CatalogPage() {
  const { categorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState("")

  const filters: CatalogFilterState = {
    make: searchParams.get("make"),
    model: searchParams.get("model"),
    year: searchParams.get("year"),
    query,
  }

  const view = resolveCatalogView(categorySlug)

  function handleFilterChange(next: CatalogFilterState) {
    setQuery(next.query)

    const params = new URLSearchParams()
    if (next.make) {
      params.set("make", next.make)
    }
    if (next.model) {
      params.set("model", next.model)
    }
    if (next.year) {
      params.set("year", next.year)
    }
    setSearchParams(params, { replace: true })
  }

  const filteredProducts = useMemo(() => {
    const yearNumber = filters.year ? Number(filters.year) : null
    return filterProducts(view.products, {
      make: filters.make,
      model: filters.model,
      year: yearNumber,
      query: filters.query,
    })
  }, [filters.make, filters.model, filters.year, filters.query, view.products])

  const title =
    filters.make && filters.model && filters.year
      ? `${filters.make} ${filters.model} ${filters.year}`
      : view.title

  const description =
    filters.make && filters.model && filters.year
      ? `Parts with fitment for ${filters.make} ${filters.model} (${filters.year}).`
      : view.description

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span>{title}</span>
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
        {view.category?.kind === "info" && view.products.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Info articles for this topic will land in a later Phase 1 pass.
          </p>
        ) : null}
      </div>

      <CatalogFilters value={filters} onChange={handleFilterChange} />

      <ProductTable
        products={filteredProducts}
        emptyMessage={view.emptyMessage}
      />
    </section>
  )
}
