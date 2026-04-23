// app/(dashboard)/page.tsx
import AIBanner from "@/components/dashboard/AIBanner";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ThermometerSun } from "lucide-react";
import SystemStatus from "@/components/dashboard/SystemStatus";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Top Banner AI */}
      <AIBanner />

      {/* 2. Grid Cuaca & Status Sistem */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget Cuaca (Sekarang komponen mengatur Card-nya sendiri) */}
        <div className="lg:col-span-2 flex">
          <WeatherWidget />
        </div>

        {/* Status Sistem IoT & Bot */}
        <div className="flex">
          <SystemStatus />
        </div>
      </div>

      {/* 3. Grid Zonasi (ESP32) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">Pemantauan Zona</h3>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
            4 Zona Aktif
          </Badge>
        </div>
        
        {/* Placeholder Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((zone) => (
            <Card key={zone} className="shadow-sm border-slate-200 dark:border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-orange-500" />
                  Zona {String.fromCharCode(64 + zone)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50">
                  <span className="text-xs text-slate-500 text-center px-2">Komponen Indikator Sensor<br/>(Suhu, Kelembapan, Cahaya, Air)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}