import { useMemo, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { listMakes, listModels, listYears } from "@/data/catalog"

export function MmySearchForm() {
  const navigate = useNavigate()
  const makes = useMemo(() => listMakes(), [])
  const [make, setMake] = useState<string | null>(null)
  const [model, setModel] = useState<string | null>(null)
  const [year, setYear] = useState<string | null>(null)

  const models = useMemo(() => (make ? listModels(make) : []), [make])
  const years = useMemo(
    () => (make && model ? listYears(make, model) : []),
    [make, model]
  )

  const canSearch = Boolean(make && model && year)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!make || !model || !year) {
      return
    }

    const params = new URLSearchParams({
      make,
      model,
      year,
    })
    navigate(`/catalog?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="make">Make</Label>
        <Select
          value={make}
          onValueChange={(value) => {
            setMake(value)
            setModel(null)
            setYear(null)
          }}
        >
          <SelectTrigger id="make" className="w-full">
            <SelectValue placeholder="Select make" />
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
        <Label htmlFor="model">Model</Label>
        <Select
          value={model}
          onValueChange={(value) => {
            setModel(value)
            setYear(null)
          }}
          disabled={!make}
        >
          <SelectTrigger id="model" className="w-full">
            <SelectValue placeholder="Select model" />
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
        <Label htmlFor="year">Year</Label>
        <Select value={year} onValueChange={setYear} disabled={!model}>
          <SelectTrigger id="year" className="w-full">
            <SelectValue placeholder="Select year" />
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

      <div className="flex items-end">
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={!canSearch}
        >
          Find Parts
        </Button>
      </div>
    </form>
  )
}
