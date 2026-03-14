"use client";

import { useState, useRef, useEffect } from "react";
import { TestResult } from "./page";

export default function HardwareTestRunner({ onComplete }: { onComplete: (res: TestResult) => void }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [vibrating, setVibrating] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      // ignore
    }
  };

  const testVibration = () => {
    if ("vibrate" in navigator) {
      setVibrating(true);
      navigator.vibrate([200, 100, 200]);
      setTimeout(() => setVibrating(false), 500);
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const endTest = (result: TestResult) => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    onComplete(result);
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Tes Kamera & Getar</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9375rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
        Cek apakah kamera belakang bisa menangkap gambar dan coba tes getaran (khusus Android).
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "var(--color-surface-3)", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid var(--color-border)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {cameraActive ? (
            <video ref={videoRef} playsInline muted autoPlay style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <button onClick={startCamera} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--color-border)", color: "var(--color-text)", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>Mulai Kamera</button>
          )}
        </div>
        
        <div style={{ background: "var(--color-surface-3)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2rem", animation: vibrating ? "vibAnim 0.1s infinite alternate" : "none" }}>📳</div>
          <button onClick={testVibration} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--color-border)", color: "var(--color-text)", border: "none", cursor: ("vibrate" in navigator) ? "pointer" : "not-allowed", fontSize: "0.875rem" }}>
            {("vibrate" in navigator) ? "Tes Motor Getar" : "Bukan Android / Tidak Didukung"}
          </button>
        </div>
      </div>

      <div style={{ padding: "1.5rem", background: "var(--color-surface-3)", borderRadius: "0.875rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Kondisi Hardware:</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button onClick={() => endTest("Pass")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)", color: "#22c55e", fontWeight: 600, cursor: "pointer" }}>Normal</button>
          <button onClick={() => endTest("Fail")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Bermasalah</button>
          <button onClick={() => endTest("Skipped")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontWeight: 600, cursor: "pointer" }}>Lewati</button>
        </div>
      </div>
      <style>{`@keyframes vibAnim { from { transform: translateX(-3px); } to { transform: translateX(3px); } }`}</style>
    </div>
  );
}
