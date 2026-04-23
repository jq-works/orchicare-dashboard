// app/(dashboard)/page.tsx
import AIBanner from "@/components/dashboard/AIBanner";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ThermometerSun } from "lucide-react";

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
        <Card className="shadow-sm border-slate-200 dark:border-zinc-800 flex flex-col justify-between w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Status Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">ESP32 Controller</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Bot WhatsApp</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20">
                Terkoneksi
              </Badge>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
              <p className="text-xs text-slate-500 font-mono">Terakhir sinkronisasi: Baru saja</p>
            </div>
          </CardContent>
        </Card>
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