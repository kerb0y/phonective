"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { AlertTriangle } from "lucide-react";

interface Pattern {
    name: string;
    pattern: number[];
    icon: string;
    desc: string;
}

const patterns: Pattern[] = [
    { name: "Tunggal", pattern: [300], icon: "•", desc: "Satu getaran singkat" },
    { name: "Ganda", pattern: [200, 100, 200], icon: "••", desc: "Dua getaran pendek" },
    { name: "Panjang", pattern: [800], icon: "—", desc: "Satu getaran panjang" },
    { name: "SOS", pattern: [100, 50, 100, 50, 100, 150, 300, 150, 300, 150, 300, 150, 100, 50, 100, 50, 100], icon: "···—··", desc: "Pola morse SOS" },
    { name: "Denyut", pattern: [100, 80, 100, 80, 100, 80, 100], icon: "♡", desc: "Pola denyut jantung" },
];

export default function VibrationTestPage() {
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail" | "unsupported">("idle");
    const [activePattern, setActivePattern] = useState<string | null>(null);
    const [supported, setSupported] = useState(false);

    // Detect support client-side only — navigator is not defined on the server
    useEffect(() => {
        setSupported(typeof navigator !== "undefined" && "vibrate" in navigator);
    }, []);

    const vibrate = (pattern: Pattern) => {
        if (!supported) {
            setStatus("unsupported");
            return;
        }
        setActivePattern(pattern.name);
        setStatus("running");
        navigator.vibrate(pattern.pattern);
        setTimeout(() => setActivePattern(null), pattern.pattern.reduce((a, b) => a + b, 0) + 200);
    };

    const handleStart = () => vibrate(patterns[0]);

    const handleReset = () => {
        if (typeof navigator !== "undefined") navigator.vibrate(0); // stop any vibration
        setActivePattern(null);
        setStatus("idle");
    };

    return (
        <ToolLayout
            title="Vibration Test"
            description="Jalankan berbagai pola getaran untuk mengecek motor vibrator perangkat."
            accentColor="#a855f7"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={activePattern !== null}
            showStartButton={status !== "running"}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Informasi</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Vibration API didukung di Android Chrome</li>
                        <li>iOS Safari + Desktop browser tidak mendukung</li>
                        <li>Getaran tidak terasa = motor vibrator mungkin rusak atau iOS</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {!supported && (
                    <div className="card p-5 mb-6 border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.03)] flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                            <AlertTriangle size={18} className="text-[#f59e0b]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#f59e0b] text-[1rem] mb-1 tracking-tight">Tidak Dukung</h3>
                            <p className="text-[var(--color-text-muted)] text-[0.9375rem] leading-relaxed">
                                Vibration API tidak didukung di browser atau perangkat ini. Coba gunakan Google Chrome di Android.
                            </p>
                        </div>
                    </div>
                )}

                {/* Pattern grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                    {patterns.map((p) => (
                        <button
                            key={p.name}
                            onClick={() => vibrate(p)}
                            disabled={!supported}
                            style={{
                                padding: "1rem",
                                borderRadius: "0.875rem",
                                border: activePattern === p.name ? "2px solid #a855f7" : "2px solid var(--color-border)",
                                background: activePattern === p.name ? "rgba(168,85,247,0.1)" : "var(--color-surface-3)",
                                cursor: supported ? "pointer" : "not-allowed",
                                textAlign: "left",
                                transition: "all 0.2s",
                                opacity: supported ? 1 : 0.5,
                            }}
                        >
                            <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem", letterSpacing: "0.1em" }}>{p.icon}</div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: activePattern === p.name ? "#a855f7" : "var(--color-text)", letterSpacing: "-0.02em" }}>{p.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>{p.desc}</div>
                        </button>
                    ))}
                </div>

                {/* Visual indicator */}
                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                            color: activePattern ? "#a855f7" : "var(--color-text-muted)",
                            fontWeight: 600,
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                background: activePattern ? "#a855f7" : "var(--color-border)",
                                transition: "background 0.2s",
                                animation: activePattern ? "vibAnim 0.15s ease infinite alternate" : "none",
                            }}
                        />
                        {activePattern ? `Getaran: ${activePattern}` : "Pilih pola untuk tes getaran"}
                    </div>
                </div>

                {status === "running" && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Getar Normal</button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Tidak Bergetar</button>
                    </div>
                )}

                <style>{`@keyframes vibAnim { from { transform: translateX(-2px); } to { transform: translateX(2px); } }`}</style>
            </div>
        </ToolLayout>
    );
}
