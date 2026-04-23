// app/(dashboard)/page.tsx
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import SystemStatus from "@/components/dashboard/SystemStatus";
import GlobalHealthScore from "@/components/dashboard/GlobalHealthScore";
import ZoneCard from "@/components/dashboard/ZoneCard";
import AIInsightDrawer from "@/components/dashboard/AIInsightDrawer"; // Komponen Drawer AI
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const zones = [
    { id: "A", data: { temp: 28, humidity: 75, light: 60, moisture: 85 } },
    { id: "B", data: { temp: 29, humidity: 72, light: 55, moisture: 40 } },
    { id: "C", data: { temp: 34, humidity: 65, light: 90, moisture: 25 } }, 
    { id: "D", data: { temp: 27, humidity: 80, light: 40, moisture: 90 } },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Halaman & Trigger AI Drawer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Overview Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pantau kondisi greenhouse dan analisis AI real-time.</p>
        </div>
        
        {/* Tombol AI Insight pindah ke sini */}
        <AIInsightDrawer />
      </div>

      {/* BARIS 1: Hero Section - Global Health Score */}
      <div className="w-full">
        <GlobalHealthScore />
      </div>

      {/* BARIS 2: Cuaca & Status Hardware */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex">
          <WeatherWidget />
        </div>
        <div className="flex h-full">
          <SystemStatus />
        </div>
      </div>

      {/* BARIS 3: Pemantauan Detail per Zona */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Pemantauan Zona</h3>
            <p className="text-xs text-slate-500 font-medium">Klik pada zona untuk melihat skor spesifik</p>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
            4 Zona Aktif
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {zones.map((zone) => (
            <ZoneCard key={zone.id} name={zone.id} data={zone.data} />
          ))}
        </div>
      </section>

    </div>
  );
}