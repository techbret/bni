import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

type BrandIconProps = {
  className?: string
}

export function BrandIcon({ className }: BrandIconProps) {
  const { resolvedTheme } = useTheme()
  const src =
    resolvedTheme === "dark"
      ? "/assets/mainIconDark.png"
      : "/assets/mainIconLight.png"

  return (
    <img
      src={src}
      alt="BNI"
      className={cn("size-8 object-contain", className)}
    />
  )
}
