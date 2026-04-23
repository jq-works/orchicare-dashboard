"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Camera, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Menyembunyikan opsi setting di mobile bottom bar untuk menghemat space
// Setting bisa diakses dari halaman Profile
const bottomNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Zonasi", href: "/zones", icon: LayoutGrid },
  { name: "AI Lab", href: "/ai-lab", icon: Camera },
  { name: "Profil", href: "/profile", icon: User },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-around h-20 px-2 pb-safe bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)]">
      {bottomNavItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
              isActive ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400 hover:text-green-500"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-300",
              isActive ? "bg-green-50 dark:bg-green-500/10" : "bg-transparent"
            )}>
              <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-all duration-300",
              isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}