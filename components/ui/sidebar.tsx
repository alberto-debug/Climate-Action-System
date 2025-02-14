import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LogOut, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex h-screen w-16 flex-col items-center border-r bg-white py-4">
      <Logo />
      <nav className="mt-8 flex flex-1 flex-col gap-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg hover:bg-gray-100",
                pathname === link.href && "bg-[#7ac943]/10 text-[#7ac943]",
              )}
            >
              <Icon className="size-5" />
              <span className="sr-only">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <Button variant="ghost" size="icon" className="mt-auto text-red-500 hover:text-red-600">
        <LogOut className="size-5" />
        <span className="sr-only">Log out</span>
      </Button>
    </div>
  )
}

