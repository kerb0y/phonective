"use client";

import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

const colors = [
    { name: "Putih", value: "#ffffff", text: "#000000" },
    { name: "Merah", value: "#ff0000", text: "#ffffff" },
    { name: "Hijau", value: "#00ff00", text: "#000000" },
    { name: "Biru", value: "#0000ff", text: "#ffffff" },
    { name: "Hitam", value: "#000000", text: "#ffffff" },
];

const INTERVAL_MS = 2500;

export default function DeadPixelPage() {
    const [running, setRunning] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const [elapsed, setElapsed] = useState(0);

    const next = useCallback(() => {
        setColorIndex((prev) => (prev + 1) % colors.length);
    }, []);

    const prev = useCallback(() => {
        setColorIndex((prev) => (prev - 1 + colors.length) % colors.length);
    }, []);

    const handleStart = () => {
        setRunning(true);
        setStatus("running");
        setColorIndex(0);
        setElapsed(0);
    };

    const handleReset = () => {
        setRunning(false);
        setStatus("idle");
        setColorIndex(0);
        setElapsed(0);
    };

    useEffect(() => {
        if (!running) return;
        const timer = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
            setElapsed((prev) => prev + 1);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, [running]);

    const current = colors[colorIndex];
    const progress = ((elapsed % colors.length) / colors.length) * 100;

    return (
        <ToolLayout
            title="Dead Pixel Checker"
            description="Layar fullscreen dengan siklus warna otomatis untuk mendeteksi pixel mati atau stuck pixel."
            accentColor="#f43f5e"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={running}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Gunakan mode fullscreen untuk hasil terbaik</li>
                        <li>Dead pixel = titik yang warnanya tidak berubah mengikuti layar</li>
                        <li>Stuck pixel = titik yang selalu merah, hijau, atau biru</li>
                        <li>Perhatikan layar dari berbagai sudut pandang</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {/* Progress bar */}
                {running && (
                    <div style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.375rem" }}>
                            <span>Warna saat ini: <strong style={{ color: current.text === "#fff" ? "#f43f5e" : "#f43f5e" }}>{current.name}</strong></span>
                            <span>{colorIndex + 1} / {colors.length}</span>
                        </div>
                        <div style={{ height: "4px", background: "var(--color-border)", borderRadius: "2px", overflow: "hidden" }}>
                            <div
                                style={{
                                    height: "100%",
                                    width: `${((colorIndex + 1) / colors.length) * 100}%`,
                                    background: "linear-gradient(90deg, #f43f5e, #fb7185)",
                                    transition: "width 0.4s ease",
                                    borderRadius: "2px",
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Color panel */}
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "0.75rem",
                        background: running ? current.value : "var(--color-surface-3)",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "0.5rem",
                        transition: "background 0.3s ease",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        if (running) {
                            const el = document.documentElement;
                            if (el.requestFullscreen) el.requestFullscreen();
                        }
                    }}
                >
                    {!running ? (
                        <span style={{ color: "var(--color-text-subtle)", fontSize: "0.875rem" }}>
                            Tekan &quot;Mulai Tes&quot; untuk memulai
                        </span>
                    ) : (
                        <span style={{ color: current.text, fontSize: "0.75rem", opacity: 0.5 }}>
                            Klik untuk fullscreen
                        </span>
                    )}
                </div>

                {/* Manual navigation */}
                {running && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={prev} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>← Sebelumnya</button>
                        <button onClick={next} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Berikutnya →</button>
                    </div>
                )}

                {/* Color palette quick select */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                    {colors.map((c, i) => (
                        <button
                            key={c.name}
                            onClick={() => { setColorIndex(i); if (!running) { setRunning(true); setStatus("running"); } }}
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                borderRadius: "0.5rem",
                                background: c.value,
                                border: colorIndex === i ? "2px solid #f43f5e" : "2px solid transparent",
                                cursor: "pointer",
                                outline: colorIndex === i ? "2px solid #f43f5e" : "none",
                                outlineOffset: "2px",
                                transition: "all 0.15s",
                            }}
                            title={c.name}
                        />
                    ))}
                </div>

                {/* Pass/Fail */}
                {running && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>
                            ✓ Tidak Ada Dead Pixel
                        </button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>
                            ✗ Ada Dead Pixel
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
