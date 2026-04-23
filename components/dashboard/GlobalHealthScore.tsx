// components/dashboard/GlobalHealthScore.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  const colorClass = isGood ? "text-emerald-500" : "text-orange-500";
  const strokeClass = isGood ? "stroke-emerald-500" : "stroke-orange-500";

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="w-full border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
      <CardContent className="p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
        
        {/* Sisi Kiri: Circular Gauge Besar */}
        <div className="flex items-center gap-6 md:gap-8 lg:w-1/2">
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} className="stroke-slate-100 dark:stroke-zinc-800/80" strokeWidth="10" fill="none" />
              <circle
                cx="70" cy="70" r={radius}
                className={cn("transition-all duration-1500 ease-out", strokeClass)}
                strokeWidth="10" fill="none" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={cn("text-5xl font-extrabold tracking-tighter", colorClass)}>{score}</span>
              <span className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Indeks</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Kesehatan Global</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Rata-rata 4 Zona Greenhouse</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-900/50 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" /> Sangat Baik
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 dark:bg-zinc-950/50 dark:border-zinc-800/80 px-2.5 py-1 rounded-md">
                <BrainCircuit className="w-3 h-3 text-purple-500" /> AI Conf: 95%
              </div>
            </div>
          </div>
        </div>

        {/* Garis Pemisah Desktop */}
        <div className="hidden lg:block w-px h-24 bg-slate-200 dark:bg-zinc-800"></div>

        {/* Sisi Kanan: Breakdown Ringkas per Zona */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Kontribusi per Zona</p>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            {[
              { id: 'A', score: 92, status: 'good' },
              { id: 'B', score: 95, status: 'good' },
              { id: 'C', score: 75, status: 'warning' },
              { id: 'D', score: 90, status: 'good' },
            ].map(z => (
              <div key={z.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white dark:bg-zinc-950/50 dark:border-zinc-800/80 transition-colors">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Zona {z.id}</span>
                <span className={cn("text-sm font-bold", z.status === 'warning' ? "text-orange-500" : "text-emerald-500")}>
                  {z.score}
                </span>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}