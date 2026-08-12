import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"

import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CheckoutPage() {
  const { lines, itemCount, subtotalLabel, clear } = useCart()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clear()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Order placed (mock)
        </h1>
        <p className="text-sm text-muted-foreground">
          This is a UI-only checkout. No payment was processed and no order was
          sent to a backend.
        </p>
        <Button render={<Link to="/catalog" />} className="w-fit">
          Continue shopping
        </Button>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          Your cart is empty. Add parts before checking out.
        </p>
        <Button render={<Link to="/catalog" />} className="w-fit">
          Browse catalog
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          Mock checkout for {itemCount} item{itemCount === 1 ? "" : "s"} ·
          Subtotal {subtotalLabel}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required placeholder="Shop contact" />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@shop.com"
            />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="address">Shipping address</Label>
            <Input
              id="address"
              name="address"
              required
              placeholder="Street, city, state, ZIP"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" size="lg">
            Place mock order
          </Button>
          <Button render={<Link to="/cart" />} variant="outline" size="lg">
            Back to cart
          </Button>
        </div>
      </form>
    </section>
  )
}
