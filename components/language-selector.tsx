"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function LanguageSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          English (UK)
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>English (UK)</DropdownMenuItem>
        <DropdownMenuItem>English (US)</DropdownMenuItem>
        <DropdownMenuItem>Français</DropdownMenuItem>
        <DropdownMenuItem>Deutsch</DropdownMenuItem>
        <DropdownMenuItem>Español</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

