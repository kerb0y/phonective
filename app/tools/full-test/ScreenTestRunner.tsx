"use client";

import { useState } from "react";
import { TestResult } from "./page";

export default function ScreenTestRunner({ onComplete }: { onComplete: (res: TestResult) => void }) {
  const [active, setActive] = useState(false);
  const colors = ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff"];
  const [colorIdx, setColorIdx] = useState(0);

  const startMode = () => {
    setActive(true);
    setColorIdx(0);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const nextColor = () => {
    if (colorIdx < colors.length - 1) {
      setColorIdx(colorIdx + 1);
    } else {
      endMode();
    }
  };

  const endMode = () => {
    setActive(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (active) {
    return (
      <div 
        onClick={nextColor}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: colors[colorIdx], zIndex: 9999, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        <span style={{ 
          background: "rgba(0,0,0,0.5)", color: "white", padding: "0.5rem 1rem", 
          borderRadius: "999px", fontSize: "0.875rem", pointerEvents: "none" 
        }}>
          Ketuk layar untuk lanjut ({colorIdx + 1}/{colors.length})
        </span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Tes Layar & Warna</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9375rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
        Layar akan menampilkan beberapa warna dasar (Putih, Hitam, Merah, Hijau, Biru). 
        Perhatikan apakah ada bintik aneh (dead/stuck pixel) atau warna yang tidak merata.
      </p>

      <button onClick={startMode} className="btn-primary" style={{ marginBottom: "2rem" }}>
        Tampilkan Warna
      </button>

      <div style={{ padding: "1.5rem", background: "var(--color-surface-3)", borderRadius: "0.875rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Hasil Tes Layar:</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button onClick={() => onComplete("Pass")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)", color: "#22c55e", fontWeight: 600, cursor: "pointer" }}>Normal (Pass)</button>
          <button onClick={() => onComplete("Fail")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Ada Masalah (Fail)</button>
          <button onClick={() => onComplete("Skipped")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontWeight: 600, cursor: "pointer" }}>Lewati</button>
        </div>
      </div>
    </div>
  );
}
