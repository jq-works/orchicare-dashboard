"use client";

export default function ScannerAnimation() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-black/20">
      
      {/* Bingkai Putih ala Google Lens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-[3px] border-white/40 rounded-[40px] shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-1000 scale-100 animate-pulse-slow">
        {/* Sudut Frame */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-[4px] border-l-[4px] border-white rounded-tl-[40px]"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[4px] border-r-[4px] border-white rounded-tr-[40px]"></div>
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-[4px] border-l-[4px] border-white rounded-bl-[40px]"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-[4px] border-r-[4px] border-white rounded-br-[40px]"></div>
      </div>

      {/* Titik Partikel Pencarian (Shimmering Dots) */}
      <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white] animate-bounce"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-bounce delay-150"></div>
      <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_white] animate-pulse delay-300"></div>

      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
        <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-xs font-bold tracking-widest uppercase drop-shadow-md">Mencari Hasil...</span>
        </div>
      </div>
    </div>
  );
}