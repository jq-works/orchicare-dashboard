"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, Maximize, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraInterfaceProps {
  status: string;
  setStatus: (val: any) => void;
  setCapturedImage: (val: string | null) => void;
}

export default function CameraInterface({ status, setStatus, setCapturedImage }: CameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    setIsStarting(true);
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: "environment" } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStatus("camera-active"); // Kamera berhasil nyala
      }
    } catch (err) {
      setError("Izin kamera ditolak atau perangkat tidak ditemukan.");
      setStatus("idle"); // Gagal, kembalikan ke awal
    } finally {
      setIsStarting(false);
    }
  };

  // PERBAIKAN: Auto-start kamera jika status disuruh "request-camera" dari tombol Scan Ulang
  useEffect(() => {
    if (status === "request-camera") {
      startCamera();
    }
  }, [status]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      const MAX_WIDTH = 512;
      const scale = MAX_WIDTH / video.videoWidth;
      
      canvas.width = MAX_WIDTH;
      canvas.height = video.videoHeight * scale;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/jpeg', 0.5);
        setCapturedImage(imgData);
        stopCamera();
        setStatus("scanning");
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <>
      {status === "idle" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
            <Camera className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Orchi-AI Vision</h3>
          <p className="text-sm text-zinc-400 mb-8 max-w-[250px]">
            Pindai tanaman anggrek Anda secara real-time untuk mendeteksi penyakit.
          </p>
          
          {error && <div className="bg-red-500/20 p-3 rounded-lg text-red-300 text-xs mb-4">{error}</div>}

          {/* PERBAIKAN: Tombol ini sekarang hanya mengubah status, memicu useEffect di atas */}
          <Button onClick={() => setStatus("request-camera")} disabled={isStarting || status === "request-camera"} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-full w-full max-w-[200px]">
            {isStarting || status === "request-camera" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Buka Kamera"}
          </Button>
        </div>
      )}

      {/* Tampilkan video saat kamera aktif atau sedang proses menyala */}
      <video 
        ref={videoRef}
        className={cn("absolute inset-0 w-full h-full object-cover", status === "camera-active" || status === "request-camera" ? "block" : "hidden")}
        autoPlay playsInline muted
      />
      <canvas ref={canvasRef} className="hidden" />

      {status === "camera-active" && (
        <div className="absolute bottom-8 left-0 w-full z-30 flex flex-col items-center gap-6 pointer-events-none">
          <p className="text-white/80 text-xs font-medium text-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-auto">
            Posisikan daun di tengah layar.
          </p>
          
          <div className="flex items-center justify-center gap-8 w-full pointer-events-auto">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:bg-black/60">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Galeri</span>
            </button>

            <button onClick={takePhoto} className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group hover:scale-105 transition-transform active:scale-95">
              <div className="w-16 h-16 rounded-full bg-white transition-all group-hover:bg-emerald-500 flex items-center justify-center">
                 <Maximize className="w-6 h-6 text-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            <button onClick={() => { stopCamera(); setStatus("request-camera"); }} className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:bg-black/60">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">Balik</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}