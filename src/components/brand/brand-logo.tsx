import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  const { resolvedTheme } = useTheme()
  const src =
    resolvedTheme === "dark"
      ? "/assets/mainLogoDark.png"
      : "/assets/mainLogoLight.png"

  return (
    <img
      src={src}
      alt="BNI Torque Converters"
      className={cn("h-8 w-auto object-contain", className)}
    />
  )
}
