import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { CartProvider } from "@/components/cart/cart-provider"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <CartProvider>
        <App />
        <Toaster position="bottom-right" richColors closeButton />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
)
