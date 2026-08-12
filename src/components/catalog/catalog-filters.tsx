import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { listMakes, listModels, listYears } from "@/data/catalog"

export type CatalogFilterState = {
  make: string | null
  model: string | null
  year: string | null
  query: string
}

type CatalogFiltersProps = {
  value: CatalogFilterState
  onChange: (next: CatalogFilterState) => void
}

export function CatalogFilters({ value, onChange }: CatalogFiltersProps) {
  const makes = useMemo(() => listMakes(), [])
  const models = useMemo(
    () => (value.make ? listModels(value.make) : []),
    [value.make]
  )
  const years = useMemo(
    () =>
      value.make && value.model ? listYears(value.make, value.model) : [],
    [value.make, value.model]
  )

  const hasFilters = Boolean(
    value.make || value.model || value.year || value.query.trim()
  )

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground sm:grid-cols-2 lg:grid-cols-5">
      <div className="grid gap-1.5">
        <Label htmlFor="filter-make">Make</Label>
        <Select
          value={value.make}
          onValueChange={(make) =>
            onChange({ make, model: null, year: null, query: value.query })
          }
        >
          <SelectTrigger id="filter-make" className="w-full">
            <SelectValue placeholder="Any make" />
          </SelectTrigger>
          <SelectContent>
            {makes.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="filter-model">Model</Label>
        <Select
          value={value.model}
          onValueChange={(model) =>
            onChange({ ...value, model, year: null })
          }
          disabled={!value.make}
        >
          <SelectTrigger id="filter-model" className="w-full">
            <SelectValue placeholder="Any model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="filter-year">Year</Label>
        <Select
          value={value.year}
          onValueChange={(year) => onChange({ ...value, year })}
          disabled={!value.model}
        >
          <SelectTrigger id="filter-year" className="w-full">
            <SelectValue placeholder="Any year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((item) => (
              <SelectItem key={item} value={String(item)}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5 lg:col-span-2">
        <Label htmlFor="filter-query">Search name or SKU</Label>
        <div className="flex gap-2">
          <Input
            id="filter-query"
            value={value.query}
            onChange={(event) =>
              onChange({ ...value, query: event.target.value })
            }
            placeholder="e.g. 4L60E or BNI-TC"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            disabled={!hasFilters}
            onClick={() =>
              onChange({ make: null, model: null, year: null, query: "" })
            }
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
