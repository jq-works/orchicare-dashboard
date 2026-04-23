"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // 1. Tambahkan import Image ini
import { Home, LayoutGrid, Camera, Settings, User } from "lucide-react"; // Hapus Sprout dari sini
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
    <div className="flex h-full w-full flex-col bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800/80 shadow-sm">
      
      {/* Brand Logo - Menggunakan PNG */}
      <div className="flex h-20 items-center px-6 gap-2 border-b border-slate-100 dark:border-zinc-800/50">
        
        {/* Kontainer Gambar Logo */}
        <div className="relative w-9 h-9 shrink-0 drop-shadow-sm">
          <Image 
            src="/logo.png" 
            alt="OrchiCare Logo" 
            fill 
            className="object-contain" // Memastikan gambar tidak terpotong
            sizes="(max-width: 768px) 100vw, 36px"
            priority // Prioritaskan render karena ini adalah logo utama
          />
        </div>

        {/* Teks Brand (Hapus bagian ini jika logo PNG Anda sudah berisi teks OrchiCare) */}
        <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Orchi<span className="text-emerald-600 dark:text-emerald-500">Care</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-3">
          Menu Utama
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                isActive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-900/50 dark:hover:text-slate-100 border border-transparent"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors shrink-0", 
                isActive 
                  ? "text-emerald-600 dark:text-emerald-500" 
                  : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              )} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer / Theme Toggle */}
      <div className="p-4 border-t border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-950/50">
        <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 shadow-sm">
          <div className="flex flex-col px-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Tema Tampilan</span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Atur preferensi</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}