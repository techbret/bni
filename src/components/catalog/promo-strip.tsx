import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function PromoStrip() {
  return (
    <section className="rounded-lg border border-border bg-gradient-to-r from-primary/10 via-amber-500/10 to-transparent px-5 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            Built for rebuilders
          </h2>
          <p className="text-sm text-muted-foreground">
            Custom remanufactured torque converters for classic trucks and 4WD
            applications — search by vehicle or browse the catalog when you know
            the part family.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link to="/#vehicle-search" />} size="lg">
            Search by vehicle
          </Button>
          <Button
            render={<Link to="/account" />}
            variant="outline"
            size="lg"
          >
            Account
          </Button>
        </div>
      </div>
    </section>
  )
}
