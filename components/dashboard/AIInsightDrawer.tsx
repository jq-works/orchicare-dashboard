// components/dashboard/AIInsightDrawer.tsx
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, BrainCircuit } from "lucide-react";

export default function AIInsightDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative gap-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Orchi-AI Insight</span>
          {/* Red Dot Notification */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md border-l border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <SheetHeader className="border-b border-slate-100 dark:border-zinc-800 pb-4 mb-4">
          <SheetTitle className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-emerald-500" />
            Analisis AI Terbaru
          </SheetTitle>
          <SheetDescription>
            Saran otomatis berdasarkan data sensor dan cuaca.
          </SheetDescription>
        </SheetHeader>

        {/* List Insight AI */}
        <div className="space-y-4 m-2">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-emerald-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded uppercase tracking-wider">
                Hari Ini, 10:23
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Berdasarkan analisis cuaca BMKG dan tren sensor 24 jam terakhir, diprediksi suhu akan meningkat siang ini. Disarankan untuk memastikan cadangan air pada sistem hybrid terisi penuh untuk penyiraman otomatis di Zona A.
            </p>
            <Button variant="link" className="px-0 mt-2 text-emerald-600 dark:text-emerald-500">
              Terapkan Aksi <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 opacity-70">
             <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Kemarin, 15:40
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Kelembapan di Zona C stabil. Fase vegetatif berjalan optimal tanpa indikasi jamur.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}