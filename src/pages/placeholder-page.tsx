import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button render={<Link to="/" />} variant="outline" className="w-fit">
        Back to home
      </Button>
    </section>
  )
}
