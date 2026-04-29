"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, LayoutGrid, Camera, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Zonasi", href: "/zones", icon: LayoutGrid },
  { name: "Orchi-AI Lab", href: "/ai-lab", icon: Camera },
  { name: "Pengaturan", href: "/settings", icon: Settings },
  { name: "Profil", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-card border-r border-border shadow-sm">
      
      {/* Brand Logo */}
      <div className="flex h-24 items-center px-6 md:px-8 gap-3 border-b border-border bg-secondary/20">
        <div className="relative w-11 h-11 shrink-0 drop-shadow-md">
          <Image 
            src="/logo.png" 
            alt="OrchiCare Logo" 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 44px"
            priority 
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-2xl font-black text-foreground tracking-tight leading-none mb-1">
            Orchi<span className="text-emerald-500">Care</span>
          </span>
          <span className="text-[9px] font-semibold  text- uppercase tracking-[0.2em] leading-none">demo dashboard</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-8 px-5 space-y-2 scrollbar-thin">
        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-5 px-3">
          Menu Utama
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-[1.25rem] px-4 py-3 text-sm font-bold transition-all group",
                isActive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl border transition-colors",
                isActive 
                  ? "bg-emerald-500/20 border-emerald-500/30" 
                  : "bg-background border-border group-hover:border-foreground/20"
              )}>
                <item.icon className={cn(
                  "w-4 h-4 shrink-0 transition-colors", 
                  isActive 
                    ? "text-emerald-600 dark:text-emerald-500" 
                    : "text-muted-foreground group-hover:text-foreground"
                )} />
              </div>
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Theme Toggle */}
      <div className="p-6 border-t border-border bg-secondary/10">
        <div className="flex items-center justify-between p-3 rounded-[1.5rem] border border-border bg-card shadow-sm">
          <div className="flex flex-col px-3">
            <span className="text-[11px] font-black text-foreground uppercase tracking-widest">Tema</span>
            <span className="text-[10px] font-bold text-muted-foreground">Preferensi</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}