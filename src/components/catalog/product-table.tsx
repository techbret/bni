import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/data/catalog"
import type { Product } from "@/types/catalog"

type ProductTableProps = {
  products: Product[]
  emptyMessage?: string
  showStall?: boolean
}

export function ProductTable({
  products,
  emptyMessage = "No parts matched this view. Try another make, model, and year, or browse a category from the sidebar.",
  showStall = true,
}: ProductTableProps) {
  const { addItem } = useCart()

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-border bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="w-14 px-3 py-2 font-medium">
              <span className="sr-only">Image</span>
            </th>
            <th className="px-3 py-2 font-medium">SKU</th>
            <th className="px-3 py-2 font-medium">Product</th>
            {showStall ? (
              <th className="px-3 py-2 font-medium">Stall</th>
            ) : null}
            <th className="px-3 py-2 font-medium">Price</th>
            <th className="px-3 py-2 font-medium">Stock</th>
            <th className="px-3 py-2 font-medium">Cart</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const imageSrc =
              product.images[0] ?? "/assets/product-placeholder.svg"

            return (
              <tr
                key={product.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30"
              >
                <td className="px-3 py-2">
                  <img
                    src={imageSrc}
                    alt=""
                    className="size-10 rounded-md border border-border bg-muted object-cover"
                  />
                </td>
                <td className="px-3 py-2 font-mono text-xs">{product.sku}</td>
                <td className="px-3 py-2">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {product.shortDescription}
                  </div>
                </td>
                {showStall ? (
                  <td className="px-3 py-2 text-muted-foreground">
                    {product.specs.stall ?? "—"}
                  </td>
                ) : null}
                <td className="px-3 py-2 font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="px-3 py-2">
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In stock" : "Call"}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={!product.inStock}
                    onClick={() => addItem(product.id)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
