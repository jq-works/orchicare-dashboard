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
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Orchi-AI Lab Engine
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Pilih Model Analisis</p>
        
        <div className="grid grid-cols-1 gap-3">
          {models.map((model) => {
            const Icon = model.icon;
            const isActive = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-2xl transition-all duration-300 text-left",
                  isActive 
                    ? "bg-emerald-500/10 border-emerald-500 shadow-sm" 
                    : "bg-background border-border hover:border-emerald-500/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    isActive ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={cn("text-sm font-bold", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                      {model.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{model.desc}</p>
                  </div>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}