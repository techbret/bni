import { Link } from "react-router-dom"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"

import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/data/catalog"

export function CartPage() {
  const { lines, itemCount, subtotalLabel, setQuantity, removeItem } = useCart()

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
        <p className="text-sm text-muted-foreground">
          Your cart is empty. Browse the catalog to add reman converters and
          rebuild parts.
        </p>
        <Button render={<Link to="/catalog" />} className="w-fit">
          Browse catalog
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
        <p className="text-sm text-muted-foreground">
          {itemCount} item{itemCount === 1 ? "" : "s"} (mock cart — no payment
          yet)
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-3 py-2 font-medium">Product</th>
              <th className="px-3 py-2 font-medium">Qty</th>
              <th className="px-3 py-2 font-medium">Price</th>
              <th className="px-3 py-2 font-medium">Total</th>
              <th className="px-3 py-2 font-medium">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr
                key={line.productId}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        line.product.images[0] ??
                        "/assets/product-placeholder.svg"
                      }
                      alt=""
                      className="size-10 rounded-md border border-border bg-muted object-cover"
                    />
                    <div>
                      <div className="font-medium">{line.product.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {line.product.sku}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-xs"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity - 1)
                      }
                    >
                      <MinusIcon />
                    </Button>
                    <span className="min-w-6 text-center tabular-nums">
                      {line.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-xs"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setQuantity(line.productId, line.quantity + 1)
                      }
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </td>
                <td className="px-3 py-3">
                  {formatPrice(line.product.price)}
                </td>
                <td className="px-3 py-3 font-medium">
                  {formatPrice(line.lineTotal)}
                </td>
                <td className="px-3 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => removeItem(line.productId)}
                  >
                    <TrashIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Subtotal: <span className="font-semibold">{subtotalLabel}</span>
        </p>
        <Button render={<Link to="/checkout" />} size="lg">
          Proceed to checkout
        </Button>
      </div>
    </section>
  )
}
