"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Cpu, Wifi, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddNodeModal() {
  const [step, setStep] = useState(1);
  const [isPairing, setIsPairing] = useState(false);

  const handlePairing = () => {
    setIsPairing(true);
    setTimeout(() => {
      setIsPairing(false);
      setStep(3);
    }, 3000);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setStep(1)}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 px-8 font-black shadow-lg shadow-emerald-500/20 text-sm">
          <Plus className="w-5 h-5 mr-2 stroke-[3px]" /> TAMBAH ORCHI-NODE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-[3rem] border-border bg-card p-0 overflow-hidden outline-none">
        <div className="h-2 w-full bg-muted">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-10 space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center">
                <Cpu className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground tracking-tight">Daftarkan Node</h3>
                <p className="text-sm text-muted-foreground font-medium">Masukkan Serial Number yang tertera pada modul ESP32 Anda.</p>
              </div>
              <input 
                type="text" 
                placeholder="Ex: ON-NODE-2026-X" 
                className="w-full bg-background border border-border rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="w-20 h-20 bg-blue-500/10 rounded-[2rem] flex items-center justify-center">
                <Wifi className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground tracking-tight">Koneksi Gateway</h3>
                <p className="text-sm text-muted-foreground font-medium">Pastikan Orchi-Gateway dalam keadaan aktif untuk sinkronisasi data.</p>
              </div>
              <div className="p-5 border border-border rounded-[1.5rem] bg-background flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-black text-foreground tracking-tight">Orchi-Hub Moklet 01</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase">Ready</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 className="w-12 h-12 text-white stroke-[3px]" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black text-foreground tracking-tight">Berhasil!</h3>
                <p className="text-sm text-muted-foreground font-medium px-6">Orchi-Node berhasil terhubung dan mulai memproses data kesehatan.</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step < 3 ? (
              <Button 
                onClick={step === 2 ? handlePairing : () => setStep(step + 1)} 
                disabled={isPairing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] h-14 font-black text-sm"
              >
                {isPairing ? <Loader2 className="w-6 h-6 animate-spin" /> : step === 2 ? "MULAI PAIRING" : "LANJUT"}
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} className="w-full bg-emerald-600 text-white rounded-[1.5rem] h-14 font-black">
                MASUK DASHBOARD
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}