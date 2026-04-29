// app/(dashboard)/page.tsx
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import SystemStatus from "@/components/dashboard/SystemStatus";
import GlobalHealthScore from "@/components/dashboard/GlobalHealthScore";
import ZoneCard from "@/components/dashboard/ZoneCard";
import SolarPanelOverview from "@/components/dashboard/SolarPanelOverview";
import AIInsightDrawer from "@/components/dashboard/AIInsightDrawer"; // Komponen Drawer AI
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const zones = [
    { id: "A1", data: { temp: 28.5, humidity: 62, light: 85, moisture: 45 } },
    { id: "B2", data: { temp: 0, humidity: 0, light: 0, moisture: 0 } },
    { id: "C2", data: { temp: 35.0, humidity: 30, light: 40, moisture: 10 } }, 
    { id: "D4", data: { temp: 26.0, humidity: 70, light: 60, moisture: 55 } },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-6 pb-28 md:pb-10 pt-4 md:pt-6 space-y-6 md:space-y-8">
      
      {/* Header Halaman & Trigger AI Drawer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">Overview Dashboard</h1>
          <p className="text-xs md:text-sm font-medium text-muted-foreground mt-1">Pantau kondisi greenhouse dan analisis AI real-time.</p>
        </div>
        
        {/* Tombol AI Insight pindah ke sini */}
        <AIInsightDrawer />
      </div>

      {/* BARIS 1: Hero Section - Global Health Score */}
      <div className="w-full">
        <GlobalHealthScore />
      </div>

      {/* BARIS 2: Cuaca, Hardware, & Solar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="lg:col-span-2 flex flex-col gap-5 md:gap-6">
          <WeatherWidget />
          <SolarPanelOverview />
        </div>
        <div className="flex h-full">
          <SystemStatus />
        </div>
      </div>

      {/* BARIS 3: Pemantauan Detail per Zona */}
      <section className="space-y-5 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-3">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground">Pemantauan Zona</h3>
            <p className="text-xs font-medium text-muted-foreground tracking-wide">Klik pada zona untuk melihat skor spesifik</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-black tracking-widest uppercase text-[10px]">
            {zones.length} Zona Aktif
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {zones.map((zone) => (
            <ZoneCard key={zone.id} name={zone.id} data={zone.data} />
          ))}
        </div>
      </section>

    </div>
  );
}