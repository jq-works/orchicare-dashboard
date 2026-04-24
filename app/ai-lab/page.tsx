"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, Upload, Sparkles, ShieldCheck, 
  AlertCircle, RefreshCw, CheckCircle2, 
  Zap, ArrowLeft, Image as ImageIcon, Maximize, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "idle" | "camera-active" | "scanning" | "result";

export default function AiLabPage() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [progress, setProgress] = useState(0);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [cameraError, setCameraError] = useState("");
  
  // Referensi untuk elemen video dan gambar
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // 1. FUNGSI UNTUK MENYALAKAN KAMERA REAL-TIME
  const startCamera = async () => {
    setIsCameraStarting(true);
    setCameraError("");
    try {
      // Meminta izin kamera ke browser (preferensi kamera belakang)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStatus("camera-active");
      }
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
      setCameraError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan di browser Anda.");
    } finally {
      setIsCameraStarting(false);
    }
  };

  // 2. FUNGSI UNTUK MEMATIKAN KAMERA (Penting untuk menghemat baterai/memori)
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // 3. FUNGSI MENGAMBIL FOTO (SNAP) DAN MEMULAI SCANNING
  const takePhotoAndScan = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Atur ukuran canvas sama dengan resolusi video asli
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Gambar frame video saat ini ke canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Ubah canvas menjadi data URL (gambar statis)
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        
        // Matikan kamera langsung setelah dijepret
        stopCamera();
        
        // Mulai proses simulasi AI
        setStatus("scanning");
        setProgress(0);
      }
    }
  };

  // Fungsi Reset kembali ke awal
  const resetScanner = () => {
    setStatus("idle");
    setCapturedImage(null);
    setProgress(0);
    stopCamera();
  };

  // Animasi Progress Bar saat Scanning
  useEffect(() => {
    if (status === "scanning") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStatus("result"), 800);
            return 100;
          }
          return prev + 5; // Kecepatan scan
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Bersihkan memori kamera jika komponen ditutup/dihancurkan
  useEffect(() => {
    return () => stopCamera();
  }, []);


  return (
    <div className="relative w-full max-w-[500px] mx-auto h-[85vh] md:h-[800px] bg-black rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-[8px] border-zinc-900 ring-1 ring-white/10 animate-in zoom-in-95 duration-500 flex flex-col">
      
      {/* 1. LAYER TAMPILAN KAMERA ATAU GAMBAR HASIL JEPRETAN */}
      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        
        {/* State 1: Awal (Belum nyalakan kamera) */}
        {status === "idle" && (
          <div className="text-center p-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Orchi-AI Vision</h3>
            <p className="text-sm text-zinc-400 mb-8 max-w-[250px]">
              Pindai tanaman anggrek Anda secara real-time untuk mendeteksi penyakit dan mengetahui status kesehatannya.
            </p>
            
            {cameraError ? (
              <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200 text-xs mb-4">
                {cameraError}
              </div>
            ) : null}

            <Button 
              onClick={startCamera} 
              disabled={isCameraStarting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-full w-full max-w-[200px]"
            >
              {isCameraStarting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Buka Kamera"}
            </Button>
          </div>
        )}

        {/* State 2: Kamera Aktif (Menunggu di-jepret) */}
        <video 
          ref={videoRef}
          className={cn(
            "w-full h-full object-cover",
            status === "camera-active" ? "block" : "hidden" // Sembunyikan video jika tidak aktif
          )}
          autoPlay 
          playsInline // Sangat penting untuk iOS Safari agar tidak fullscreen otomatis
          muted
        />
        
        {/* Canvas tersembunyi untuk mengambil gambar */}
        <canvas ref={canvasRef} className="hidden" />

        {/* State 3 & 4: Gambar Statis (Sedang di-scan atau menampilkan Hasil) */}
        {(status === "scanning" || status === "result") && capturedImage && (
          <img 
            src={capturedImage} 
            className={cn(
              "w-full h-full object-cover transition-all duration-1000", 
              status === "scanning" ? "brightness-50 grayscale contrast-125" : "brightness-100"
            )}
            alt="Captured Orchid"
          />
        )}

        {/* Shadow gradient agar teks/ikon UI di atasnya mudah dibaca (Hanya muncul jika kamera nyala atau ada gambar) */}
        {status !== "idle" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>
        )}
      </div>

      {/* 2. LAYER EFEK SCANNING (Aktif saat mode 'scanning') */}
      {status === "scanning" && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan-line"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 border-2 border-emerald-500/50 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-100"></div>
          </div>
        </div>
      )}

      {/* 3. LAYER ATAS: UI KONTROL OVERLAY (Gaya IG/TikTok) */}
      {status !== "idle" && (
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
          
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between pointer-events-auto">
            <button onClick={resetScanner} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <Badge className="bg-black/50 backdrop-blur-md text-emerald-400 border-emerald-500/30 px-3 py-1.5 gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Live Scan
            </Badge>

            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition">
              <Zap className="w-5 h-5" />
            </button>
          </div>

          {/* Status Scanning Text (Muncul di tengah) */}
          {status === "scanning" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
               <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 mb-4">
                 <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                 <span className="text-white text-xs font-bold tracking-widest uppercase">Menganalisis Pola...</span>
               </div>
               <div className="text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tabular-nums">
                 {progress}%
               </div>
            </div>
          )}

          {/* Bottom Controls (Shutter Area) */}
          {status === "camera-active" && (
            <div className="pointer-events-auto flex flex-col items-center gap-6">
              <p className="text-white/80 text-xs font-medium text-center max-w-[250px] bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                Posisikan anggrek di tengah, lalu tekan tombol untuk scan.
              </p>
              
              <div className="flex items-center justify-center gap-8 w-full">
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-black/60 transition">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Unggah</span>
                </button>

                {/* TOMBOL SHUTTER KAMERA ASLI */}
                <button 
                  onClick={takePhotoAndScan}
                  className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group hover:scale-105 transition-transform active:scale-95"
                >
                  <div className="w-16 h-16 rounded-full bg-white transition-all group-hover:bg-emerald-500 flex items-center justify-center">
                     <Maximize className="w-6 h-6 text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>

                <button onClick={startCamera} className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-black/60 transition">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Balik</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. BOTTOM SHEET: Hasil Diagnosa AI */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full bg-white dark:bg-zinc-950 rounded-t-3xl transition-transform duration-500 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col",
        status === "result" ? "translate-y-0 h-[70%]" : "translate-y-full h-0"
      )}>
        <div className="w-full flex justify-center py-3">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-700 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-none">
          <div className="space-y-6">
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Hasil Identifikasi AI
                </p>
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Dendrobium Nobile</h2>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px]">Akurasi: 98.2%</Badge>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-950">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-500 leading-none">82</span>
                <span className="text-[8px] font-bold text-emerald-600/70 dark:text-emerald-500/70">SCORE</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50">
              <div className="flex gap-3">
                <div className="bg-orange-200/50 dark:bg-orange-900/50 p-2 rounded-lg shrink-0 h-fit">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Indikasi Sunburn (Terbakar)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5 font-medium">
                    Terdeteksi bercak kekuningan pada 15% area daun. AI menyimpulkan intensitas cahaya (UV) terlalu terik.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rekomendasi Tindakan</p>
              <ul className="space-y-2">
                {[
                  "Aktifkan mode Paranet (Shading 70%) di Zona terkait.",
                  "Tingkatkan intensitas Misting di siang hari.",
                  "Berikan nutrisi daun dosis rendah sore ini."
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <Button onClick={resetScanner} variant="outline" className="flex-1 py-5 border-slate-200 dark:border-zinc-800 rounded-xl font-bold">
                <Camera className="w-4 h-4 mr-2" /> Ulangi
              </Button>
              <Button className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 font-bold">
                <Zap className="w-4 h-4 mr-2" /> Terapkan AI Fix
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* CSS Animasi Garis Laser */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}