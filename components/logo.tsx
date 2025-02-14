import Link from "next/link"
import { Leaf } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative size-8">
        <Leaf className="absolute size-8 text-[#7ac943]" />
        <Leaf className="absolute size-8 text-[#7ac943] rotate-[200deg] opacity-70" />
      </div>
    </Link>
  )
}

