"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, BrainCircuit, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIInsightDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 px-5 py-2.5 rounded-[2rem] font-black text-sm transition-all active:scale-[0.98] outline-none shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-emerald-500" />
        <span>Orchi-AI Insight</span>
        {/* Red Dot Notification */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed top-16 md:top-0 bottom-20 md:bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Panel */}
      <div className={cn(
        "fixed top-16 md:top-0 bottom-20 md:bottom-0 right-0 w-[88%] max-w-[380px] z-40 md:z-50 bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-border",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <BrainCircuit className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em]">Orchi-AI System</span>
              <p className="text-foreground font-black text-base leading-tight tracking-tight">Analisis Terbaru</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground transition p-2 rounded-xl hover:bg-accent border border-transparent hover:border-border outline-none active:scale-[0.95]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-wide mb-2 px-1">
            Saran otomatis berdasarkan data sensor dan cuaca.
          </p>
          
          {/* Insight Item 1 */}
          <div className="p-5 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-xl uppercase tracking-[0.1em] border border-emerald-500/20">
                Hari Ini, 10:23
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed font-bold">
              Berdasarkan analisis cuaca BMKG dan tren sensor 24 jam terakhir, diprediksi suhu akan meningkat siang ini. Disarankan untuk memastikan cadangan air pada sistem hybrid terisi penuh untuk penyiraman otomatis di Zona A.
            </p>
            <button className="flex items-center text-xs font-black mt-4 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 transition-colors uppercase tracking-[0.15em] outline-none">
              Terapkan Aksi <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>

          {/* Insight Item 2 */}
          <div className="p-5 rounded-[2rem] bg-secondary/30 border border-border/50 opacity-80">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em] bg-secondary px-2.5 py-1 rounded-xl border border-border">
                Kemarin, 15:40
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-bold">
              Kelembapan di Zona C stabil. Fase vegetatif berjalan optimal tanpa indikasi jamur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}