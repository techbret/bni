import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { MoonIcon, ShoppingCartIcon, SunIcon, UserIcon } from "lucide-react"

import { useCart } from "@/components/cart/cart-provider"
import { BrandLogo } from "@/components/brand/brand-logo"
import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TopBarProps = {
  mobileNav?: ReactNode
}

export function TopBar({ mobileNav }: TopBarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-3 px-4">
        {mobileNav}
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <BrandLogo className="h-9 max-w-[220px] sm:max-w-none" />
        </Link>
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={
              resolvedTheme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            render={<Link to="/cart" />}
            variant="ghost"
            size="sm"
            className="relative gap-1.5"
          >
            <ShoppingCartIcon data-icon="inline-start" />
            Cart
            {itemCount > 0 ? (
              <Badge className="ml-0.5 h-4 min-w-4 px-1 tabular-nums">
                {itemCount}
              </Badge>
            ) : null}
          </Button>
          <Button
            render={<Link to="/account" />}
            variant="ghost"
            size="sm"
            className="gap-1.5"
          >
            <UserIcon data-icon="inline-start" />
            Account
          </Button>
        </div>
      </div>
    </header>
  )
}
