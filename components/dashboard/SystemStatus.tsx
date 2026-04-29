// components/dashboard/SystemStatus.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Activity, MessageCircle, Thermometer, Droplets, Zap, Sun, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemStatus() {
  const systemData = {
    botWhatsApp: { status: "connected", lastPing: "Baru saja" },
    controllers: [
      { id: "NODE-A1", status: "online", temp: 28.5, humid: 62, solar: "Charging", sun: "High", battery: 85 },
      { id: "NODE-B2", status: "offline", temp: 0, humid: 0, solar: "Disconnected", sun: "None", battery: 0 },
      { id: "NODE-C2", status: "warning", temp: 35.0, humid: 30, solar: "Active", sun: "Low", battery: 15 },
      { id: "NODE-D4", status: "online", temp: 26.0, humid: 70, solar: "Charging", sun: "Medium", battery: 100 },
    ]
  };

  return (
    <div className="shadow-sm border border-border flex flex-col h-full w-full bg-card rounded-[3rem] overflow-hidden">
      <div className="py-5 px-6 md:px-8 border-b border-border bg-secondary/20">
        <h3 className="text-lg md:text-xl font-black tracking-tight flex items-center gap-3 text-foreground">
          <Activity className="w-5 h-5 text-emerald-500" />
          Status Sistem
        </h3>
      </div>
      
      <div className="p-0 flex-1 flex flex-col divide-y divide-border">
        
        <div className="p-6 md:p-8 flex flex-col justify-center bg-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-[1rem] border border-emerald-500/20">
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <span className="text-sm md:text-base font-black text-foreground tracking-tight">Bot WhatsApp</span>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 px-3 py-1 text-[10px] uppercase font-black tracking-[0.1em]">
              Terkoneksi
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground ml-[3.25rem] font-bold">Service berjalan normal (Port 3001).</p>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col bg-transparent min-h-0">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-4 block shrink-0">
            Node ESP32 ({systemData.controllers.length} Zona)
          </span>
          
          <div className="space-y-4 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin">
            {systemData.controllers.map((node) => (
              <div key={node.id} className="bg-secondary/30 border border-border rounded-[1.5rem] p-4 space-y-4">
                {/* Info Alat & Identitas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {node.status === "online" ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    ) : node.status === "warning" ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    )}
                    <span className="text-xs font-black text-foreground uppercase tracking-tight">{node.id}</span>
                  </div>
                  {node.status !== "offline" ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-[10px] font-bold text-foreground">{node.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] font-bold text-foreground">{node.humid}%</span>
                      </div>
                    </div>
                  ) : (
                    <Badge variant="destructive" className="text-[9px] px-2 py-0.5 uppercase tracking-widest font-black">Offline</Badge>
                  )}
                </div>

                {/* Progress Baterai & Indikator Solar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-1.5">
                      {node.solar === "Charging" ? (
                        <Zap className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                      ) : node.status === "offline" ? (
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Mode: {node.solar} {node.sun !== "None" && `(${node.sun})`}
                      </span>
                    </div>
                    <span className={cn("text-[11px] font-black", node.battery < 20 ? "text-red-500" : "text-foreground")}>
                      {node.battery}%
                    </span>
                  </div>
                  
                  {/* Progress Bar Baterai */}
                  <div className="w-full h-2.5 bg-background rounded-full overflow-hidden p-0.5 border border-border shadow-inner">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        node.battery < 20 ? "bg-red-500" : node.battery > 50 ? "bg-emerald-500" : "bg-amber-500"
                      )}
                      style={{ width: `${node.battery}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}