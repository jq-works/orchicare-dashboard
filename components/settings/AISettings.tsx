"use client";

import React, { useState } from "react";
import { BrainCircuit, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AISettings() {
  const [selectedModel, setSelectedModel] = useState("auto");

  const models = [
    { id: "auto", name: "Auto-Failover", desc: "Gemini + Groq Llama (Direkomendasikan)", icon: Zap },
    { id: "gemini", name: "Gemini 1.5 Flash", desc: "Akurasi tinggi, stabil", icon: Sparkles },
    { id: "groq", name: "Groq Llama 3.2", desc: "Respon super cepat", icon: BrainCircuit },
  ];

  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500" /> Orchi-AI Lab Engine
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Pilih Model Analisis</p>
        
        <div className="grid grid-cols-1 gap-3">
          {models.map((model) => {
            const Icon = model.icon;
            const isActive = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={cn(
                  "flex items-center justify-between p-5 border rounded-[2rem] transition-all duration-300 text-left group active:scale-[0.98]",
                  isActive 
                    ? "bg-emerald-500/10 border-emerald-500 shadow-sm" 
                    : "bg-background border-border hover:border-emerald-500/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-[1.5rem] flex items-center justify-center shrink-0 transition-colors",
                    isActive ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-muted text-muted-foreground group-hover:bg-emerald-500/20 group-hover:text-emerald-500"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={cn("text-base font-black tracking-tight", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                      {model.name}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{model.desc}</p>
                  </div>
                </div>
                {isActive && <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}