"use client";

import { useEffect, useState } from "react";

const SCAN_STEPS = [
  "Mendeteksi spesies anggrek...",
  "Menganalisis kondisi daun...",
  "Memeriksa tanda penyakit...",
  "Menyusun rekomendasi AI...",
];

export default function ScannerAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((p) => (p + 1) % SCAN_STEPS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none bg-black/30">

      {/* ── Kotak scan — center murni pakai flexbox ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* geser sedikit ke atas agar tidak tertimpa status chip di bawah */
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "68%",
            maxWidth: "260px",
            aspectRatio: "1 / 1",
            borderRadius: "28px",
            border: "2px solid rgba(52,211,153,0.4)",
            animation: "pulse-frame 3s ease-in-out infinite",
          }}
        >
          {/* Sudut TL */}
          <span style={{ position:"absolute", top:-3, left:-3, width:28, height:28,
            borderTop:"4px solid #34d399", borderLeft:"4px solid #34d399", borderRadius:"28px 0 0 0" }} />
          {/* Sudut TR */}
          <span style={{ position:"absolute", top:-3, right:-3, width:28, height:28,
            borderTop:"4px solid #34d399", borderRight:"4px solid #34d399", borderRadius:"0 28px 0 0" }} />
          {/* Sudut BL */}
          <span style={{ position:"absolute", bottom:-3, left:-3, width:28, height:28,
            borderBottom:"4px solid #34d399", borderLeft:"4px solid #34d399", borderRadius:"0 0 0 28px" }} />
          {/* Sudut BR */}
          <span style={{ position:"absolute", bottom:-3, right:-3, width:28, height:28,
            borderBottom:"4px solid #34d399", borderRight:"4px solid #34d399", borderRadius:"0 0 28px 0" }} />

          {/* Garis scan bergerak */}
          <div
            style={{
              position: "absolute",
              left: 8,
              right: 8,
              height: 2,
              background: "linear-gradient(to right, transparent, #34d399, transparent)",
              borderRadius: 4,
              animation: "scan-sweep 2s ease-in-out infinite",
            }}
          />

          {/* Dot-dot analisis */}
          <div style={{ position:"absolute", top:"28%", left:"22%", width:10, height:10,
            borderRadius:"50%", background:"#34d399", boxShadow:"0 0 12px #34d399",
            animation:"bounce 1s infinite" }} />
          <div style={{ position:"absolute", top:"58%", right:"22%", width:8, height:8,
            borderRadius:"50%", background:"#6ee7b7", boxShadow:"0 0 8px #6ee7b7",
            animation:"bounce 1s 0.2s infinite" }} />
          <div style={{ position:"absolute", top:"42%", left:"58%", width:8, height:8,
            borderRadius:"50%", background:"rgba(255,255,255,0.7)", boxShadow:"0 0 8px white",
            animation:"pulse 1.5s 0.5s infinite" }} />
        </div>
      </div>

      {/* ── Status chip — selalu di bawah, center ── */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            padding: "10px 20px",
            borderRadius: 999,
            border: "1px solid rgba(52,211,153,0.35)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 16, height: 16, borderRadius: "50%",
              border: "2px solid #34d399",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ color:"#6ee7b7", fontSize:12, fontWeight:600, letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
            {SCAN_STEPS[step]}
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-sweep {
          0%   { top: 8px; }
          50%  { top: calc(100% - 8px); }
          100% { top: 8px; }
        }
        @keyframes pulse-frame {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}