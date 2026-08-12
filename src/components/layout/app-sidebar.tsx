import { useState, type ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { ChevronDownIcon, ChevronRightIcon, HomeIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  getChildCategories,
  getTopLevelCategories,
} from "@/data/catalog"
import { cn } from "@/lib/utils"

type AppSidebarProps = {
  onNavigate?: () => void
  className?: string
}

function SidebarNavLink({
  to,
  children,
  onNavigate,
  end,
  className,
}: {
  to: string
  children: ReactNode
  onNavigate?: () => void
  end?: boolean
  className?: string
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
          className
        )
      }
    >
      {children}
    </NavLink>
  )
}

export function AppSidebar({ onNavigate, className }: AppSidebarProps) {
  const partsCategories = getTopLevelCategories("parts")
  const infoCategories = getTopLevelCategories("info")
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(["cat_torque_converters"])
  )

  function toggleOpen(categoryId: string) {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <SidebarNavLink to="/" end onNavigate={onNavigate}>
            <HomeIcon className="size-3.5 shrink-0" />
            Home
          </SidebarNavLink>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Parts
          </p>
          {partsCategories.map((category) => {
            const children = getChildCategories(category.id)
            const isOpen = openIds.has(category.id)

            return (
              <div key={category.id} className="space-y-0.5">
                <div className="flex items-center gap-0.5">
                  <SidebarNavLink
                    to={`/catalog/${category.slug}`}
                    onNavigate={onNavigate}
                  >
                    {category.name}
                  </SidebarNavLink>
                  {children.length > 0 ? (
                    <button
                      type="button"
                      className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      aria-label={
                        isOpen
                          ? `Collapse ${category.name}`
                          : `Expand ${category.name}`
                      }
                      aria-expanded={isOpen}
                      onClick={() => toggleOpen(category.id)}
                    >
                      {isOpen ? (
                        <ChevronDownIcon className="size-3.5" />
                      ) : (
                        <ChevronRightIcon className="size-3.5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {children.length > 0 && isOpen ? (
                  <div className="ml-3 space-y-0.5 border-l border-sidebar-border pl-2">
                    {children.map((child) => (
                      <SidebarNavLink
                        key={child.id}
                        to={`/catalog/${child.slug}`}
                        onNavigate={onNavigate}
                        className="text-xs"
                      >
                        {child.name}
                      </SidebarNavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Automotive info
          </p>
          {infoCategories.map((category) => (
            <SidebarNavLink
              key={category.id}
              to={`/catalog/${category.slug}`}
              onNavigate={onNavigate}
            >
              {category.name}
            </SidebarNavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}
