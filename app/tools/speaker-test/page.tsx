"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

interface FreqBand {
    label: string;
    freq: number;
    color: string;
    bg: string;
    desc: string;
}

const bands: FreqBand[] = [
    { label: "Low", freq: 80, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Bass — 80 Hz" },
    { label: "Mid", freq: 1000, color: "#0ea5e9", bg: "rgba(14,165,233,0.1)", desc: "Mid — 1 kHz" },
    { label: "High", freq: 8000, color: "#a855f7", bg: "rgba(168,85,247,0.1)", desc: "Treble — 8 kHz" },
];

function playTone(
    ctx: AudioContext,
    freq: number,
    gainNode: GainNode
): OscillatorNode {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    return osc;
}

export default function SpeakerTestPage() {
    const [playing, setPlaying] = useState<number | null>(null);
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const [bars, setBars] = useState([0.2, 0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8]);

    const ctxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const animRef = useRef<number | null>(null);

    const stopCurrent = () => {
        if (oscRef.current) {
            try { oscRef.current.stop(); } catch { }
            oscRef.current = null;
        }
        if (animRef.current) {
            cancelAnimationFrame(animRef.current);
            animRef.current = null;
        }
        setBars([0.2, 0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8]);
    };

    const animate = () => {
        setBars((prev) => prev.map(() => 0.15 + Math.random() * 0.75));
        animRef.current = requestAnimationFrame(animate);
    };

    const toggleBand = (idx: number, freq: number) => {
        if (playing === idx) {
            stopCurrent();
            setPlaying(null);
            setBars([0.2, 0.5, 0.3, 0.7, 0.4, 0.6, 0.2, 0.8]);
            return;
        }

        stopCurrent();
        setStatus("running");

        if (!ctxRef.current) {
            ctxRef.current = new AudioContext();
        }
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") ctx.resume();

        gainRef.current = ctx.createGain();
        gainRef.current.gain.value = 0.3;
        oscRef.current = playTone(ctx, freq, gainRef.current);
        setPlaying(idx);
        animRef.current = requestAnimationFrame(animate);
    };

    const handleReset = () => {
        stopCurrent();
        setPlaying(null);
        setStatus("idle");
    };

    useEffect(() => () => stopCurrent(), []);

    const activeBand = playing !== null ? bands[playing] : null;

    return (
        <ToolLayout
            title="Speaker Test"
            description="Putar nada low, mid, dan high frequency untuk mengecek kualitas speaker."
            accentColor="#f59e0b"
            status={status}
            onStart={() => { toggleBand(0, bands[0].freq); }}
            onReset={handleReset}
            isRunning={playing !== null}
            showStartButton={playing === null}
            showResetButton={true}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Coba setiap frekuensi satu per satu</li>
                        <li>Speaker rusak: suara tidak keluar pada frekuensi tertentu</li>
                        <li>Distorsi: suara pecah, berbunyi aneh</li>
                        <li>Naikkan volume HP sebelum tes</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {/* Visualizer */}
                <div
                    style={{
                        background: "var(--color-surface-3)",
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        marginBottom: "1.25rem",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "4px",
                        height: "80px",
                    }}
                >
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                maxWidth: "20px",
                                height: `${h * 100}%`,
                                background: activeBand
                                    ? `linear-gradient(to top, ${activeBand.color}, ${activeBand.color}88)`
                                    : "var(--color-border)",
                                borderRadius: "2px",
                                transition: playing !== null ? "height 0.1s" : "height 0.3s",
                            }}
                        />
                    ))}
                </div>

                {/* Frequency bands */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {bands.map((band, i) => (
                        <button
                            key={band.label}
                            onClick={() => toggleBand(i, band.freq)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "1rem 1.25rem",
                                borderRadius: "0.75rem",
                                border: playing === i ? `2px solid ${band.color}` : "2px solid var(--color-border)",
                                background: playing === i ? band.bg : "var(--color-surface-3)",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 700, fontSize: "1rem", color: playing === i ? band.color : "var(--color-text)", letterSpacing: "-0.02em" }}>
                                    {band.label} Frequency
                                </div>
                                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>{band.desc}</div>
                            </div>
                            <div
                                style={{
                                    width: "2.25rem",
                                    height: "2.25rem",
                                    borderRadius: "50%",
                                    background: playing === i ? band.color : "var(--color-border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    flexShrink: 0,
                                }}
                            >
                                {playing === i ? "■" : "▶"}
                            </div>
                        </button>
                    ))}
                </div>

                {status === "running" && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Speaker Normal</button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Ada Masalah</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
