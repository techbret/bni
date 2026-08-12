import { BrandLogo } from "@/components/brand/brand-logo"
import { FeaturedProducts } from "@/components/catalog/featured-products"
import { MmySearchForm } from "@/components/catalog/mmy-search-form"
import { PopularCategories } from "@/components/catalog/popular-categories"
import { PromoStrip } from "@/components/catalog/promo-strip"

export function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:py-14">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4">
          <BrandLogo className="h-12 sm:h-14" />
          <div className="max-w-2xl space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Find the right remanufactured torque converter
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Custom remanufactured converters for automotive rebuilders.
              Classic trucks, 4WD, and transmission-specific fitment.
            </p>
          </div>
        </div>

        <div id="vehicle-search" className="space-y-2 scroll-mt-20">
          <p className="text-sm font-medium">Search by vehicle</p>
          <MmySearchForm />
        </div>
      </section>

      <PopularCategories />
      <FeaturedProducts />
      <PromoStrip />
    </div>
  )
}
