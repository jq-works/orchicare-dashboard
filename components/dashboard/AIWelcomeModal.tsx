"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, Droplets, AlertTriangle, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    const hasSeenModal = sessionStorage.getItem("orchi_ai_welcome_seen");
    let timerOpen: NodeJS.Timeout;

    if (!hasSeenModal) {
      timerOpen = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("orchi_ai_welcome_seen", "true");
      }, 1000);
    }

    return () => {
      if (timerOpen) clearTimeout(timerOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      const timer = setTimeout(() => {
        setScanning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm w-[90vw] bg-card/95 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-0 overflow-hidden shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] rounded-[1.5rem] sm:rounded-[2rem]">
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scanline {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scanline {
            animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}} />

        {/* --- HEADER: Futuristic AI Core --- */}
        <div className="relative h-28 bg-emerald-950 flex flex-col items-center justify-center overflow-hidden border-b border-emerald-900/50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-12 h-12 mb-2">
              <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-[spin_4s_linear_infinite] border-t-emerald-400"></div>
              <div className="absolute inset-1.5 border border-emerald-500/10 rounded-full animate-[spin_3s_linear_infinite_reverse] border-b-emerald-300"></div>
              <div className={cn(
                "bg-emerald-900/80 p-2.5 rounded-full border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] backdrop-blur-md transition-transform duration-500",
                scanning ? "scale-110" : "scale-100"
              )}>
                <BrainCircuit className={cn("w-5 h-5 text-emerald-400", scanning ? "animate-pulse" : "")} />
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Orchi-AI Diagnostic</span>
            </div>
          </div>
          
          <div className={cn("absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] transition-opacity duration-500", scanning ? "animate-scanline opacity-100" : "opacity-0")}></div>
        </div>

        {/* --- BODY: Diagnostic Results --- */}
        <div className="p-4 md:p-5 relative bg-gradient-to-b from-card to-secondary/30">
          <DialogTitle className="sr-only">Hasil Analisis Orchi-AI</DialogTitle>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-foreground tracking-tight leading-none mb-1">
                Status Harian
              </h3>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-500" />
                {scanning ? "Menganalisis..." : "Analisis Selesai"}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Skor</span>
              <span className="text-xl font-black text-emerald-500">88<span className="text-xs">%</span></span>
            </div>
          </div>

          <div className="space-y-3">
            
            <div className={cn(
              "p-3 rounded-[1rem] border bg-orange-500/5 border-orange-500/20 shadow-[inset_0_0_15px_rgba(249,115,22,0.02)] transition-all duration-700 transform",
              scanning ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            )}>
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 blur-sm opacity-20 rounded-full"></div>
                  <div className="relative bg-background border border-orange-500/30 p-2 rounded-xl shrink-0">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-black text-foreground tracking-tight">Kondisi Zona C2</h4>
                    <span className="text-[8px] font-black text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-orange-500/20">Kritis</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold leading-relaxed">
                    Suhu mencapai <span className="text-orange-500">35°C</span> dengan kelembapan media tanam di ambang batas bawah.
                  </p>
                </div>
              </div>
            </div>

            <div className={cn(
              "p-3 rounded-[1rem] border bg-emerald-500/5 border-emerald-500/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.02)] transition-all duration-700 delay-150 transform",
              scanning ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            )}>
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-20 rounded-full"></div>
                  <div className="relative bg-background border border-emerald-500/30 p-2 rounded-xl shrink-0">
                    <Droplets className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-black text-foreground tracking-tight">Tindakan Otomatis</h4>
                    <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-emerald-500/20">Active</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold leading-relaxed">
                    Sprinkler (Zona A1 & D4) menyala dalam <span className="text-foreground">30 menit</span>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- FOOTER: Actions --- */}
        <div className="p-4 md:px-5 md:py-4 border-t border-border bg-card/80 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground font-black uppercase tracking-wider text-[9px] h-8 px-3 rounded-lg">
            Abaikan
          </Button>
          <Button onClick={() => setIsOpen(false)} className="bg-foreground hover:bg-foreground/90 text-background font-black uppercase tracking-widest text-[9px] h-8 px-4 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all gap-1.5 group">
            Lihat Zona C2 
            <div className="bg-background/20 p-0.5 rounded-full group-hover:bg-background/30 transition-colors">
              <ChevronRight className="w-3 h-3" />
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}