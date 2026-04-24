"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, Droplets, AlertTriangle, ArrowRight } from "lucide-react";

export default function AIWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timerClient = setTimeout(() => setIsClient(true), 0);
    
    // Cek apakah modal sudah pernah ditampilkan pada sesi browser ini
    const hasSeenModal = sessionStorage.getItem("orchi_ai_welcome_seen");

    let timerOpen: NodeJS.Timeout;

    // Jika belum pernah melihat modal
    if (!hasSeenModal) {
      timerOpen = setTimeout(() => {
        setIsOpen(true);
        // Tandai bahwa pengguna sudah melihat modal ini
        sessionStorage.setItem("orchi_ai_welcome_seen", "true");
      }, 1000);
    }

    return () => {
      clearTimeout(timerClient);
      if (timerOpen) clearTimeout(timerOpen);
    };
  }, []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 p-0 overflow-hidden shadow-2xl">
        
        {/* Dekorasi Header Gradient */}
        <div className="h-24 bg-gradient-to-r from-emerald-500 to-green-600 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg relative z-10 animate-bounce-slow">
            <BrainCircuit className="w-8 h-8 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="text-xl font-bold flex items-center justify-center gap-2 text-slate-800 dark:text-slate-100">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Orchi-AI Insight
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
              Analisis prioritas untuk greenhouse Anda hari ini.
            </DialogDescription>
          </DialogHeader>

          {/* Kotak Rekomendasi Utama */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl border bg-orange-50/50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
              
              <div className="flex items-start gap-3 relative z-10">
                <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Peringatan Zona C</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Suhu mencapai <span className="font-bold text-orange-600 dark:text-orange-400">34°C</span> (di atas normal) dengan cadangan air pot kritis.
                  </p>
                </div>
              </div>
            </div>

            {/* Kotak Info Normal */}
            <div className="p-4 rounded-xl border bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg shrink-0 mt-0.5">
                  <Droplets className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Jadwal Penyiraman</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Sistem hybrid ESP32 akan memulai penyiraman otomatis untuk Zona A & B dalam 30 menit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:justify-between border-t border-slate-100 dark:border-zinc-800/50 mt-2 bg-slate-50/50 dark:bg-zinc-900/20">
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            Tutup
          </Button>
          <Button onClick={() => setIsOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2">
            Periksa Zona C <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}