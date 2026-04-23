// components/dashboard/SystemStatus.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, MessageCircle, Zap, BatteryMedium, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SystemStatus() {
  // Simulasi data status dari database/alat
  const systemData = {
    botWhatsApp: { status: "connected", lastPing: "Baru saja" },
    controllers: [
      { zone: "A", status: "online", powerMode: "hybrid", battery: 100 },
      { zone: "B", status: "online", powerMode: "hybrid", battery: 100 },
      { zone: "C", status: "warning", powerMode: "baterai", battery: 45 }, // Contoh jika listrik mati, pindah ke baterai
      { zone: "D", status: "offline", powerMode: "unknown", battery: 0 },  // Contoh jika alat mati/terputus
    ]
  };

  return (
    <Card className="shadow-sm border-slate-200 dark:border-zinc-800 flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-zinc-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          Status Sistem
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Bagian 1: WhatsApp Bot */}
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bot WhatsApp</span>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              Terkoneksi
            </Badge>
          </div>
          <p className="text-xs text-slate-500 ml-6">Service whatsapp-web.js berjalan normal.</p>
        </div>

        {/* Bagian 2: ESP32 Controllers (Zonasi) */}
        <div className="p-4 flex-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
            Node ESP32 (4 Zona)
          </span>
          
          <div className="space-y-3">
            {systemData.controllers.map((node) => (
              <div key={node.zone} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  {/* Ikon Status Dinamis */}
                  <div className="relative">
                    <Cpu className={`w-5 h-5 ${
                      node.status === 'online' ? 'text-slate-600 dark:text-slate-400' :
                      node.status === 'warning' ? 'text-orange-500' : 'text-red-500'
                    }`} />
                    {node.status === 'online' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                    )}
                  </div>
                  
                  {/* Info Zona & Daya Listrik/Baterai */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Zona {node.zone}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      {node.powerMode === 'hybrid' ? (
                        <><Zap className="w-3 h-3 text-yellow-500" /> PLN + Baterai</>
                      ) : node.powerMode === 'baterai' ? (
                        <><BatteryMedium className="w-3 h-3 text-orange-400" /> Baterai ({node.battery}%)</>
                      ) : (
                        <span className="text-red-400">Terputus</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badge Status */}
                {node.status === 'online' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : node.status === 'warning' ? (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                ) : (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-5">Offline</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Sinkronisasi Terakhir */}
        <div className="p-3 bg-slate-50 dark:bg-zinc-950/50 border-t border-slate-100 dark:border-zinc-800 text-center">
          <p className="text-[10px] text-slate-500 font-mono">Sinkronisasi terakhir: {new Date().toLocaleTimeString('id-ID')}</p>
        </div>
      </CardContent>
    </Card>
  );
}