import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppShell } from "@/components/layout/app-shell"
import { CartPage } from "@/pages/cart-page"
import { CatalogPage } from "@/pages/catalog-page"
import { CheckoutPage } from "@/pages/checkout-page"
import { HomePage } from "@/pages/home-page"
import { PlaceholderPage } from "@/pages/placeholder-page"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:categorySlug" element={<CatalogPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route
            path="account"
            element={
              <PlaceholderPage
                title="Account"
                description="Login and past orders will be available in a later Phase 1 pass. Guests can keep browsing the catalog without an account."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
