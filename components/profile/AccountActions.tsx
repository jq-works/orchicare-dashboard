"use client";

import { Shield, Key, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountActions() {
  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* 1. SEKSI KEAMANAN AKUN */}
      <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2 mb-4 md:mb-6">
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Keamanan Akun
        </h3>

        {/* PERBAIKAN INTI: Layout Baris Horizontal di Desktop dengan PENGELOMPOKKAN */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 md:p-5 border border-border rounded-2xl bg-background/50 hover:bg-accent/5 transition-colors duration-300">
          
          {/* GRUP 1 (KIRI): Ikon + Teks. Dipastikan rata kiri. */}
          <div className="flex items-center gap-4 text-left">
            {/* Ikon Kunci dengan shrink-0 agar tidak gepeng */}
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0 shadow-sm border border-orange-200/50 dark:border-orange-700/50">
              <Key className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            
            {/* Teks: Dipaksa rata kiri (flex flex-col text-left justify-center) */}
            <div className="flex flex-col text-left justify-center">
              <p className="text-sm md:text-base font-extrabold text-foreground leading-tight">
                Kata Sandi
              </p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1">
                Terakhir diperbarui 3 bulan yang lalu
              </p>
            </div>
          </div>

          {/* Tombol: Berdiri sendiri di sebelah kanan (md:w-auto, shrink-0) */}
          <Button 
            variant="outline" 
            className="w-full md:w-auto border-border text-foreground hover:bg-background hover:shadow-md rounded-xl font-bold text-xs md:text-sm h-10 md:h-11 px-6 transition-all shrink-0"
          >
            Ubah Sandi
          </Button>
        </div>
      </div>

      {/* 2. ZONA BAHAYA (DANGER ZONE) */}
      <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-2.5 md:gap-3">
        <h3 className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2 pl-1">
          Zona Bahaya
        </h3>
        
        {/* Menggunakan Grid agar seimbang di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-foreground border-border hover:bg-accent hover:text-accent-foreground rounded-xl h-12 font-bold transition-all shadow-sm group"
          >
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-foreground" /> 
            Keluar dari Sistem
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 rounded-xl h-12 font-bold transition-all"
          >
            <Trash2 className="w-4 h-4 mr-3" /> 
            Hapus Akun Permanen
          </Button>
        </div>
      </div>

    </div>
  );
}