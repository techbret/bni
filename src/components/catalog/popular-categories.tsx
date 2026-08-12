import { Link } from "react-router-dom"

import { getPopularCategories } from "@/data/catalog"

export function PopularCategories() {
  const categories = getPopularCategories()

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Popular categories
        </h2>
        <p className="text-sm text-muted-foreground">
          Browse rebuild-focused parts groups for converters, transmissions, and
          related hard parts.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalog/${category.slug}`}
            className="rounded-lg border border-border bg-card px-4 py-3 text-card-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <p className="text-sm font-medium">{category.name}</p>
            {category.description ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {category.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
