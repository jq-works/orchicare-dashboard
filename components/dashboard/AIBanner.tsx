// components/dashboard/AIBanner.tsx
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-2xl shadow-md border border-green-400/20 dark:border-green-800/30">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse text-green-200" />
            <h2 className="font-bold text-lg tracking-tight">Orchi-AI Insight</h2>
          </div>
          <p className="text-green-50 text-sm md:text-base max-w-3xl leading-relaxed">
            Berdasarkan analisis cuaca BMKG dan tren sensor 24 jam terakhir, diprediksi suhu akan meningkat siang ini. Disarankan untuk memastikan cadangan air pada sistem hybrid (listrik/baterai) terisi penuh untuk penyiraman otomatis di Zona A.
          </p>
        </div>
        <Button 
          variant="secondary" 
          className="bg-white/20 hover:bg-white/30 text-white border-none shadow-none backdrop-blur-md transition-all shrink-0 w-fit"
        >
          Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
}