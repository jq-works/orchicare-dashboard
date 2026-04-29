"use client";

import { useState } from "react";
import { User, Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PersonalInfo() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6 pb-4 border-b border-border">
        <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
          <User className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Informasi Personal
        </h3>
      </div>
      
      <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" defaultValue="Demo Account" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 md:py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
            </div>
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Nomor Telepon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="tel" defaultValue="+62 812-3456-7890" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 md:py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Email Akun</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" defaultValue="orchicare@demo.test" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 md:py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Alamat / Lokasi Greenhouse</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 md:top-3.5 w-4 h-4 text-muted-foreground" />
            <textarea rows={3} defaultValue="SMK Telkom Malang (Moklet), Jawa Timur, Indonesia" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 md:py-3 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition resize-none" />
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-6 flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-3 pt-5 md:pt-6 border-t border-border">
        {saveSuccess && (
          <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Tersimpan
          </span>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 h-11 font-bold shadow-lg shadow-emerald-500/20">
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}