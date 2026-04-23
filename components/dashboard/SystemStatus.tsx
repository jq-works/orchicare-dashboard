// components/dashboard/SystemStatus.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, MessageCircle, Zap, BatteryMedium, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SystemStatus() {
  const systemData = {
    botWhatsApp: { status: "connected", lastPing: "Baru saja" },
    controllers: [
      { zone: "A", status: "online", powerMode: "hybrid", battery: 100 },
      { zone: "B", status: "online", powerMode: "hybrid", battery: 100 },
      { zone: "C", status: "warning", powerMode: "baterai", battery: 45 },
      { zone: "D", status: "offline", powerMode: "unknown", battery: 0 },
    ]
  };

  return (
    // Style utama disamakan
    <Card className="shadow-sm border-slate-200 dark:border-zinc-800 flex flex-col h-full w-full bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
      <CardHeader className="py-3 px-4 border-b border-slate-100 dark:border-zinc-800/50">
        <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Activity className="w-4 h-4 text-emerald-500" />
          Status Sistem
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col divide-y divide-slate-100 dark:divide-zinc-800/50">
        
        <div className="p-4 flex flex-col justify-center bg-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Bot WhatsApp</span>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50 px-2 py-0.5 text-[10px]">
              Terkoneksi
            </Badge>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 ml-10 font-medium">Service berjalan normal (Port 3001).</p>
        </div>

        <div className="p-4 flex-1 flex flex-col bg-transparent">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 block">
            Node ESP32 ({systemData.controllers.length} Zona)
          </span>
          
          <div className="space-y-3.5 overflow-y-auto max-h-[140px] pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-700">
            {systemData.controllers.map((node) => (
              <div key={node.zone} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  {/* Warna kotak disamakan dengan gaya GlobalHealthScore */}
                  <div className="relative bg-white dark:bg-zinc-950/50 p-1.5 rounded-md border border-slate-100 dark:border-zinc-800/80">
                    <Cpu className={`w-4 h-4 ${
                      node.status === 'online' ? 'text-slate-600 dark:text-slate-400' :
                      node.status === 'warning' ? 'text-orange-500' : 'text-red-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none mb-1">Zona {node.zone}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
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
                <div>
                  {node.status === 'online' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : node.status === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-orange-500 animate-pulse" />
                  ) : (
                    <Badge variant="destructive" className="text-[9px] px-1.5 py-0 uppercase tracking-wider">Offline</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}