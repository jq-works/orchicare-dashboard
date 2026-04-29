"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, FlipHorizontal, Loader2, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatusType } from "@/app/ai-lab/page";

interface CameraInterfaceProps {
  status: StatusType;
  setStatus: (val: StatusType) => void;
  setCapturedImage: (val: string | null) => void;
  /** Jika true, idle state menggunakan dark background (cocok untuk mobile fullscreen overlay) */
  isFullscreen?: boolean;
}

export default function CameraInterface({ status, setStatus, setCapturedImage, isFullscreen }: CameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async (facing: "environment" | "user" = facingMode) => {
    setIsStarting(true);
    setError("");
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing } } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus("camera-active");
      }
    } catch {
      setError("Izin kamera ditolak atau perangkat tidak ditemukan.");
      setStatus("idle");
    } finally {
      setIsStarting(false);
    }
  }, [facingMode, setStatus, stopCamera]);

  useEffect(() => { if (status === "request-camera") { const t = setTimeout(() => startCamera(facingMode), 0); return () => clearTimeout(t); } }, [status, startCamera, facingMode]);
  useEffect(() => () => stopCamera(), [stopCamera]);

  const handleFlipCamera = async () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    await startCamera(next);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = 512; canvas.height = video.videoHeight * (512 / video.videoWidth);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (facingMode === "user") { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.5));
    stopCamera(); setStatus("scanning");
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ratio = Math.min(512 / img.width, 512 / img.height, 1);
        canvas.width = img.width * ratio; canvas.height = img.height * ratio;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        stopCamera(); setCapturedImage(canvas.toDataURL("image/jpeg", 0.6)); setStatus("scanning");
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <>
      {status === "idle" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center rounded-[inherit] bg-background">

          {/* Icon */}
          <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
            <ScanLine className="w-12 h-12 text-emerald-500" />
          </div>

          {/* Text */}
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Siap Memindai</span>
          <h3 className="text-2xl font-black text-foreground tracking-tight mb-2">Orchi-AI Vision</h3>
          <p className="text-sm font-medium text-muted-foreground mb-8 max-w-[260px] leading-relaxed">
            Pindai atau unggah foto anggrek untuk analisis spesies dan kesehatan secara real-time.
          </p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-2xl text-destructive text-xs mb-4 font-medium">
              {error}
            </div>
          )}

          {/* Buttons — plain <button> untuk menghindari konflik style shadcn di dalam fixed overlay */}
          <div className="flex flex-col gap-3 w-full max-w-[240px]">
            <button
              onClick={() => setStatus("request-camera")}
              disabled={isStarting}
              className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black px-8 py-[0.9rem] rounded-[1.5rem] w-full shadow-lg shadow-emerald-500/20 text-sm transition-all active:scale-95"
            >
              {isStarting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Camera className="w-4 h-4 mr-2" />Buka Kamera</>}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center font-black px-8 py-[0.9rem] rounded-[1.5rem] w-full transition-all text-sm text-foreground bg-transparent border border-border hover:bg-accent hover:border-emerald-500/30 active:scale-95"
            >
              <ImageIcon className="w-4 h-4 mr-2" /> Dari Galeri
            </button>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleGalleryUpload} />

      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          facingMode === "user" && "scale-x-[-1]",
          status === "camera-active" || status === "request-camera" ? "block" : "hidden"
        )}
        autoPlay playsInline muted
      />
      <canvas ref={canvasRef} className="hidden" />

      {status === "camera-active" && (
        <div className="absolute bottom-0 left-0 w-full z-30 pb-8 flex flex-col items-center gap-5 pointer-events-none">
          <p className="text-white/90 text-xs font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-auto border border-white/10">
            Posisikan daun di tengah layar
          </p>
          <div className="flex items-center justify-center gap-10 w-full pointer-events-auto">
            <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:bg-black/60 active:scale-90">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow-md">Galeri</span>
            </button>
            <button onClick={takePhoto} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform active:scale-90 shadow-xl">
              <div className="w-[60px] h-[60px] rounded-full bg-white/90 backdrop-blur-sm" />
            </button>
            <button onClick={handleFlipCamera} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:bg-black/60 active:scale-90">
                <FlipHorizontal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-white drop-shadow-md">Balik</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}