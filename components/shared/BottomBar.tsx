"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Camera, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Menambahkan Settings kembali, sehingga total ada 5 item. 
// AI Lab (index 2) otomatis berada tepat di tengah.
const bottomNavItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Zonasi", href: "/zones", icon: LayoutGrid },
  { name: "AI Lab", href: "/ai-lab", icon: Camera, isMain: true }, // Tandai sebagai tombol utama
  { name: "Setting", href: "/settings", icon: Settings },
  { name: "Profil", href: "/profile", icon: User },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    // Menggunakan bg-background dan border-border agar adaptif dengan Light/Dark Mode
    <div className="flex items-center justify-around h-20 px-2 pb-safe bg-background border-t border-border shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.3)] z-50">
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
              {/* Lingkaran Bulat yang Melayang (FAB) */}
              <div className={cn(
                "absolute -top-6 flex items-center justify-center w-14 h-14 rounded-full shadow-xl border-[4px] border-background transition-transform duration-300 active:scale-95",
                isActive 
                  ? "bg-emerald-600 shadow-emerald-600/30" 
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
              )}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Teks AI Lab (Diturunkan agar tidak menabrak lingkaran) */}
              <span className={cn(
                "mt-8 text-[10px] font-bold transition-all duration-300",
                isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground opacity-80"
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
              "flex flex-col items-center justify-center w-1/5 h-full space-y-1 transition-all",
              isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-emerald-500"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-300",
              isActive ? "bg-emerald-50 dark:bg-emerald-500/10" : "bg-transparent"
            )}>
              <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-all duration-300",
              isActive ? "opacity-100 translate-y-0 font-bold" : "opacity-70 translate-y-1"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}