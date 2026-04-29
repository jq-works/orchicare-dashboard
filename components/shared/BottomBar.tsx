"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Camera, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Zonasi", href: "/zones", icon: LayoutGrid },
  { name: "AI Lab", href: "/ai-lab", icon: Camera, isMain: true },
  { name: "Setting", href: "/settings", icon: Settings },
  { name: "Profil", href: "/profile", icon: User },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-around h-[88px] px-2 pb-safe bg-card border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
      {bottomNavItems.map((item) => {
        const isActive = pathname === item.href;

        // Desain Khusus untuk Tombol Tengah (AI Lab)
        if (item.isMain) {
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (isActive && item.isMain) {
                  window.dispatchEvent(new Event("reset-ai-lab"));
                }
              }}
              className="relative flex flex-col items-center justify-center w-1/5 h-full group"
            >
              {/* Floating Action Button (FAB) */}
              <div className={cn(
                "absolute -top-7 flex items-center justify-center w-[64px] h-[64px] rounded-[1.75rem] shadow-2xl border-[6px] border-card transition-all duration-300 active:scale-95 group-hover:-translate-y-1",
                isActive 
                  ? "bg-emerald-600 shadow-emerald-600/40" 
                  : "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30"
              )}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Teks AI Lab */}
              <span className={cn(
                "mt-9 text-[10px] uppercase tracking-wider transition-all duration-300",
                isActive ? "text-emerald-600 dark:text-emerald-400 font-black" : "text-muted-foreground opacity-80 font-bold"
              )}>
                {item.name}
              </span>
            </Link>
          );
        }

        // Desain Standar untuk Tombol Lainnya
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-1/5 h-full space-y-1.5 transition-all group",
              isActive ? "text-emerald-600 dark:text-emerald-500" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-2.5 rounded-[1rem] border transition-all duration-300",
              isActive 
                ? "bg-emerald-500/20 border-emerald-500/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]" 
                : "bg-transparent border-transparent group-hover:bg-secondary/50 group-hover:border-border"
            )}>
              <item.icon className={cn(
                "w-[22px] h-[22px] transition-colors", 
                isActive && "stroke-[2.5px]"
              )} />
            </div>
            <span className={cn(
              "text-[9px] uppercase tracking-widest transition-all duration-300",
              isActive ? "opacity-100 font-black" : "opacity-70 font-bold"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}