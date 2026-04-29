"use client";

import { Shield, Key, LogOut, Trash2 } from "lucide-react";

export default function AccountActions() {
  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* 1. SEKSI KEAMANAN AKUN */}
      <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
        <h3 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-3 mb-6 md:mb-8 tracking-tight">
          <Shield className="w-6 h-6 text-emerald-500" /> Keamanan Akun
        </h3>

        {/* PERBAIKAN INTI: Layout Baris Horizontal di Desktop dengan PENGELOMPOKKAN */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between p-5 md:p-6 border border-border rounded-[2rem] bg-secondary/30 hover:bg-secondary/60 transition-colors duration-300">
          
          {/* GRUP 1 (KIRI): Ikon + Teks. Dipastikan rata kiri. */}
          <div className="flex items-center gap-5 text-left w-full md:w-auto">
            {/* Ikon Kunci dengan shrink-0 agar tidak gepeng */}
            <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0 shadow-sm border border-orange-200/50 dark:border-orange-700/50">
              <Key className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            
            {/* Teks: Dipaksa rata kiri (flex flex-col text-left justify-center) */}
            <div className="flex flex-col text-left justify-center">
              <p className="text-base md:text-lg font-black text-foreground tracking-tight">
                Kata Sandi
              </p>
              <p className="text-xs font-medium text-muted-foreground mt-1">
                Terakhir diperbarui 3 bulan yang lalu
              </p>
            </div>
          </div>

          {/* Tombol: Berdiri sendiri di sebelah kanan (md:w-auto, shrink-0) */}
          <button className="w-full md:w-auto bg-background border border-border text-foreground hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-[2rem] font-black text-xs md:text-sm h-12 md:h-14 px-8 transition-all shrink-0 shadow-sm active:scale-[0.98]">
            Ubah Sandi
          </button>
        </div>
      </div>

      {/* 2. ZONA BAHAYA (DANGER ZONE) */}
      <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm flex flex-col gap-4">
        <h3 className="text-[10px] md:text-[11px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-2 pl-1">
          Zona Bahaya
        </h3>
        
        {/* Menggunakan Grid agar seimbang di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center md:justify-start w-full text-foreground border border-border bg-background hover:bg-secondary/80 hover:border-border/80 rounded-[2rem] h-14 font-black transition-all shadow-sm group active:scale-[0.98] px-6">
            <LogOut className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" /> 
            Keluar dari Sistem
          </button>
          
          <button className="flex items-center justify-center md:justify-start w-full text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-900/80 rounded-[2rem] h-14 font-black transition-all active:scale-[0.98] px-6">
            <Trash2 className="w-5 h-5 mr-3" /> 
            Hapus Akun Permanen
          </button>
        </div>
      </div>

    </div>
  );
}