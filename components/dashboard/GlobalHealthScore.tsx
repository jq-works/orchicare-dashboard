// components/dashboard/GlobalHealthScore.tsx
"use client";

import React, { useEffect, useState } from "react";
import { BrainCircuit, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GlobalHealthScore() {
  const [score, setScore] = useState(0);
  const targetScore = 88;

  useEffect(() => {
    const timer = setTimeout(() => setScore(targetScore), 300);
    return () => clearTimeout(timer);
  }, [targetScore]);

  const isGood = score >= 80;
  const colorClass = isGood ? "text-emerald-500" : "text-amber-500";
  const strokeClass = isGood ? "stroke-emerald-500" : "stroke-amber-500";

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-[3rem] shadow-sm relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className={cn(
        "absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[80px] opacity-10 transition-colors",
        isGood ? "bg-emerald-500" : "bg-amber-500"
      )} />

      <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
        
        {/* Sisi Kiri: Circular Gauge Besar */}
        <div className="flex items-center gap-6 md:gap-8 lg:w-1/2">
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} className="stroke-muted" strokeWidth="10" fill="none" />
              <circle
                cx="70" cy="70" r={radius}
                className={cn("transition-all duration-1500 ease-out", strokeClass)}
                strokeWidth="10" fill="none" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={cn("text-5xl font-black tracking-tighter", colorClass)}>{score}</span>
              <span className="text-xs font-black text-muted-foreground mt-1 uppercase tracking-widest">Indeks</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Kesehatan Global</h2>
              <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1">Rata-rata 4 Zona Greenhouse</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.1em] bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" /> Sangat Baik
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground bg-secondary/50 border border-border px-3 py-1.5 rounded-2xl">
                <BrainCircuit className="w-3.5 h-3.5 text-purple-500" /> AI Conf: 95%
              </div>
            </div>
          </div>
        </div>

        {/* Garis Pemisah Desktop */}
        <div className="hidden lg:block w-px h-24 bg-border"></div>

        {/* Sisi Kanan: Breakdown Ringkas per Zona */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground mb-4">Kontribusi per Zona</p>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            {[
              { id: 'A1', score: 94, status: 'good' },
              { id: 'B2', score: 0, status: 'warning' },
              { id: 'C2', score: 35, status: 'warning' },
              { id: 'D4', score: 88, status: 'good' },
            ].map(z => (
              <div key={z.id} className="flex items-center justify-between p-4 rounded-[1.5rem] border border-border bg-secondary/30 transition-colors">
                <span className="text-xs font-black text-foreground">Zona {z.id}</span>
                <span className={cn("text-sm font-black", z.status === 'warning' ? "text-amber-500" : "text-emerald-500")}>
                  {z.score}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}