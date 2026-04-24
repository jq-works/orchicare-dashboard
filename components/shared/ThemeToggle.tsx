"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Mencegah hydration mismatch: render ikon hanya setelah komponen mount di client
  React.useEffect(() => { 
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-transform duration-300" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400 transition-transform duration-300" />
        )
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}