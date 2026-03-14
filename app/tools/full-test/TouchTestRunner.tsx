"use client";

import { useState } from "react";
import { TestResult } from "./page";

export default function TouchTestRunner({ onComplete }: { onComplete: (res: TestResult) => void }) {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);

  const startMode = () => {
    setActive(true);
    setScore(0);
  };

  if (active) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Usap Area Kotak</h3>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem", fontSize: "0.875rem" }}>
          Sentuh dan geser ke seluruh area ini. Target: 100%
        </p>

        <div 
          style={{ width: "100%", maxWidth: "300px", height: "300px", margin: "0 auto 1.5rem", background: "var(--color-surface-3)", borderRadius: "0.5rem", position: "relative", overflow: "hidden", border: "2px solid var(--color-border)", touchAction: "none" }}
          onPointerMove={(e) => {
            if (e.buttons > 0 || e.pointerType === "touch") {
              setScore(s => Math.min(100, s + 1));
            }
          }}
        >
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${score}%`, background: "rgba(139, 92, 246, 0.4)", transition: "height 0.1s" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "2rem", color: score === 100 ? "#8b5cf6" : "var(--color-text-muted)" }}>
            {score}%
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button onClick={() => { setActive(false); onComplete("Pass"); }} disabled={score < 80} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: score >= 80 ? "rgba(34,197,94,0.1)" : "transparent", color: score >= 80 ? "#22c55e" : "var(--color-text-muted)", fontWeight: 600, cursor: score >= 80 ? "pointer" : "not-allowed", opacity: score >= 80 ? 1 : 0.5 }}>Lanjut (Pass)</button>
          <button onClick={() => { setActive(false); onComplete("Fail"); }} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Gagal (Fail)</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Tes Touch Screen</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9375rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
        Layar akan menampilkan kotak interaktif. Usap/geser jari Anda di atasnya untuk mengecek apakah panel sentuh merespons dengan baik.
      </p>

      <button onClick={startMode} className="btn-primary" style={{ marginBottom: "2rem" }}>
        Mulai Tes Sentuh
      </button>

      <div style={{ padding: "1.5rem", background: "var(--color-surface-3)", borderRadius: "0.875rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Aksi:</p>
        <button onClick={() => onComplete("Skipped")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontWeight: 600, cursor: "pointer" }}>Lewati Tes Ini</button>
      </div>
    </div>
  );
}
