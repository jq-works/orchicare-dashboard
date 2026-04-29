"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WhatsAppSettings() {
  const [isEnabled, setIsEnabled] = useState(true);
  
  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-emerald-500" /> WhatsApp Chatbot
        </h3>
        
        {/* Toggle Switch */}
        <button 
          onClick={() => setIsEnabled(!isEnabled)}
          className={cn(
            "relative w-12 h-7 rounded-full transition-colors duration-300",
            isEnabled ? "bg-emerald-500" : "bg-muted border border-border"
          )}
        >
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm",
            isEnabled ? "translate-x-6" : "translate-x-1"
          )} />
        </button>
      </div>

      <div className={cn("space-y-6 transition-opacity duration-300", !isEnabled && "opacity-50 pointer-events-none")}>
        
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 space-y-2 text-left">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Nomor Handphone Terdaftar</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" readOnly defaultValue="+62 812 3456 7890" disabled={!isEnabled} className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
        </div>

        {/* Status Koneksi */}
        <div className="p-5 border border-border rounded-[2rem] bg-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-[1.5rem] flex items-center justify-center shrink-0",
                isEnabled ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
              )}>
                {isEnabled ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div>
                <p className={cn("text-base font-black tracking-tight", isEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                  {isEnabled ? "Terhubung ke Orchi-Bot" : "Bot Dinonaktifkan"}
                </p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  Menerima alert kesehatan & laporan harian.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button disabled={!isEnabled} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-[2rem] h-14 font-black transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20">
          Simpan Konfigurasi WhatsApp
        </button>
      </div>
    </div>
  );
}
