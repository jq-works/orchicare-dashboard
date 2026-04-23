"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Camera, Settings, User, Sprout, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; 
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Zonasi", href: "/zones", icon: LayoutGrid },
  { name: "Orchi-AI Lab", href: "/ai-lab", icon: Camera },
  { name: "Pengaturan", href: "/settings", icon: Settings },
  { name: "Profil", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800">
      {/* Brand Logo */}
      <div className="flex h-20 items-center px-6 gap-3 border-b border-slate-100 dark:border-zinc-900">
        <div className="bg-green-600 p-2 rounded-xl">
          <Sprout className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-green-700 dark:text-green-500 tracking-tight">
          OrchiCare
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-green-600 dark:text-slate-400 dark:hover:bg-zinc-900 dark:hover:text-green-400"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-green-600 dark:text-green-400")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer / Theme Toggle */}
      <div className="p-4 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 pl-2">
          Tema Tampilan
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
}