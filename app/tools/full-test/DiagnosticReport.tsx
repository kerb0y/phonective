"use client";

import { useEffect, useState } from "react";
import { DiagnosticState } from "./page";

export default function DiagnosticReport({ results, onRestart }: { results: DiagnosticState, onRestart: () => void }) {
  const [deviceInfo, setDeviceInfo] = useState<any>({});

  useEffect(() => {
    // Collect basic UA string and date for the report
    setDeviceInfo({
      os: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timestamp: new Date().toLocaleString("id-ID"),
    });
  }, []);

  const downloadReport = () => {
    const reportData = {
      app: "Phonective",
      version: "1.0",
      device: deviceInfo,
      results,
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `phonective_report_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (res: string) => {
    if (res === "Pass") return "#22c55e";
    if (res === "Fail") return "#ef4444";
    return "#64748b";
  };

  const tests = [
    { label: "Layar & Warna", key: "screen" as const },
    { label: "Panel Sentuh", key: "touch" as const },
    { label: "Audio (Spk/Mic)", key: "audio" as const },
    { label: "Hardware (Cam/Vib)", key: "hardware" as const },
  ];

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>✅</div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.5rem" }}>Diagnostik Selesai</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontSize: "0.9375rem" }}>
        Berikut adalah ringkasan hasil pengecekan komponen HP Anda.
      </p>

      <div style={{ maxWidth: "480px", margin: "0 auto 2rem", background: "var(--color-surface-3)", borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--color-border)", textAlign: "left" }}>
        
        <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--color-border)", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Waktu Tes</div>
          <div style={{ fontSize: "0.875rem", color: "var(--color-text)", fontWeight: 500 }}>{deviceInfo.timestamp}</div>
        </div>

        <div style={{ padding: "0 1.25rem" }}>
          {tests.map((t, idx) => (
            <div key={t.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: idx < tests.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <span style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "0.9375rem" }}>{t.label}</span>
              <span style={{ 
                background: `${getStatusColor(results[t.key])}22`,
                color: getStatusColor(results[t.key]),
                padding: "0.25rem 0.75rem",
                borderRadius: "99px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                border: `1px solid ${getStatusColor(results[t.key])}44`
              }}>
                {results[t.key] === "Pass" ? "Normal" : results[t.key] === "Fail" ? "Masalah" : "Lewati"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "480px", margin: "0 auto" }}>
        <button onClick={downloadReport} className="btn-primary" style={{ flex: "1 1 auto", minWidth: "150px" }}>
          📄 Download JSON Report
        </button>
        <button onClick={onRestart} className="btn-secondary" style={{ flex: "1 1 auto", minWidth: "150px" }}>
          🔄 Mulai Ulang
        </button>
      </div>
    </div>
  );
}
