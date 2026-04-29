"use client";

import { useState } from "react";
import { User, Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";

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
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <User className="w-6 h-6 text-emerald-500" /> Informasi Personal
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" readOnly defaultValue="Demo Account" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Nomor Telepon</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="tel" readOnly defaultValue="+62 812-3456-7890" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Email Akun</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" readOnly defaultValue="orchicare@demo.test" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Alamat / Lokasi Greenhouse</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
            <textarea rows={3} readOnly defaultValue="SMK Telkom Malang (Moklet), Jawa Timur, Indonesia" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-4 pt-6 border-t border-border">
        {saveSuccess && (
          <span className="text-xs md:text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> Tersimpan
          </span>
        )}
        <button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] px-8 h-14 font-black transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center">
          {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}