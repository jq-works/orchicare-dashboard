"use client";

import { Button } from "@/components/ui/button";
import { Zap, Moon, ShieldAlert } from "lucide-react";

interface MacroProps {
  onAction: (actionType: string) => void;
}

export default function ZoneMacroControls({ onAction }: MacroProps) {
  return (
    <section>
      <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
        Tindakan Makro (Quick Actions)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button 
          onClick={() => onAction("all-pumps")} 
          className="h-auto py-3 justify-start gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/50 transition-all"
        >
          <Zap className="w-5 h-5 shrink-0" />
          <div className="text-left">
            <span className="block font-bold text-sm">Siram Semua Zona</span>
            <span className="text-[10px] opacity-80">Override pompa massal</span>
          </div>
        </Button>
        <Button 
          onClick={() => onAction("night-mode")} 
          className="h-auto py-3 justify-start gap-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800/50 transition-all"
        >
          <Moon className="w-5 h-5 shrink-0" />
          <div className="text-left">
            <span className="block font-bold text-sm">Mode Malam</span>
            <span className="text-[10px] opacity-80">Matikan semua aktuator</span>
          </div>
        </Button>
        <Button 
          onClick={() => onAction("lock-ai")}
          className="h-auto py-3 justify-start gap-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:border-emerald-500 shadow-sm transition-all"
        >
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <div className="text-left">
            <span className="block font-bold text-sm">Kunci AI (Auto)</span>
            <span className="text-[10px] opacity-80">Blokir kontrol manual</span>
          </div>
        </Button>
      </div>
    </section>
  );
}