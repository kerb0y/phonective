"use client";

import { useState, useRef, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Zap, AlertTriangle, XCircle } from "lucide-react";

export default function FlashlightTestPage() {
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail" | "unsupported">("idle");
    const [torchOn, setTorchOn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const trackRef = useRef<MediaStreamTrack | null>(null);

    const startTorch = useCallback(async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            streamRef.current = stream;
            const track = stream.getVideoTracks()[0];
            trackRef.current = track;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const capabilities = (track as any).getCapabilities?.();
            if (!capabilities?.torch) {
                setError("Perangkat ini tidak mendukung kontrol flashlight dari browser.");
                setStatus("unsupported");
                stream.getTracks().forEach((t) => t.stop());
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (track as any).applyConstraints({ advanced: [{ torch: true }] });
            setTorchOn(true);
            setStatus("running");
        } catch {
            setError("Tidak dapat mengakses kamera atau flashlight. Pastikan izin telah diberikan.");
            setStatus("fail");
        }
    }, []);

    const stopTorch = useCallback(async () => {
        if (trackRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            try { await (trackRef.current as any).applyConstraints({ advanced: [{ torch: false }] }); } catch { }
        }
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        trackRef.current = null;
        setTorchOn(false);
    }, []);

    const handleStart = () => startTorch();

    const handleReset = async () => {
        await stopTorch();
        setStatus("idle");
        setError(null);
    };

    const toggleTorch = async () => {
        if (!trackRef.current) return;
        const next = !torchOn;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        try { await (trackRef.current as any).applyConstraints({ advanced: [{ torch: next }] }); } catch { }
        setTorchOn(next);
    };

    return (
        <ToolLayout
            title="Flashlight Test"
            description="Aktifkan flashlight langsung dari browser menggunakan Camera API."
            accentColor="#eab308"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={torchOn}
            showStartButton={!torchOn && status !== "running"}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Informasi</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Fitur ini membutuhkan izin kamera</li>
                        <li>Hanya tersedia di browser yang mendukung Torch API (Android Chrome)</li>
                        <li>iOS Safari belum mendukung kontrol torch dari browser</li>
                        <li>Jika tidak berfungsi, gunakan aplikasi flashlight bawaan HP</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {error && (
                    <div className={`card p-5 mb-6 flex items-start gap-4 ${status === "unsupported" ? "border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.03)]" : "border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.03)]"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${status === "unsupported" ? "bg-[rgba(245,158,11,0.1)]" : "bg-[rgba(239,68,68,0.1)]"}`}>
                            {status === "unsupported" ? <AlertTriangle size={18} className="text-[#f59e0b]" /> : <XCircle size={18} className="text-[#ef4444]" />}
                        </div>
                        <div>
                            <h3 className={`font-bold text-[1rem] mb-1 tracking-tight ${status === "unsupported" ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                                {status === "unsupported" ? "Tidak Didukung" : "Terjadi Kesalahan"}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-[0.9375rem] leading-relaxed">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Visual indicator */}
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        maxWidth: "280px",
                        margin: "0 auto 1.5rem",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "0.75rem",
                        background: torchOn
                            ? "radial-gradient(circle, rgba(234,179,8,0.25), rgba(234,179,8,0.05))"
                            : "var(--color-surface-3)",
                        border: torchOn ? "2px solid #eab308" : "2px solid var(--color-border)",
                        transition: "all 0.4s ease",
                        boxShadow: torchOn ? "0 0 60px rgba(234,179,8,0.3)" : "none",
                    }}
                >
                    <Zap
                        size={60}
                        color={torchOn ? "#eab308" : "var(--color-border)"}
                        style={{ transition: "color 0.3s, filter 0.3s", filter: torchOn ? "drop-shadow(0 0 12px #eab308)" : "none" }}
                    />
                    <span style={{ fontWeight: 700, color: torchOn ? "#eab308" : "var(--color-text-muted)", fontSize: "0.9rem" }}>
                        {torchOn ? "MENYALA" : "MATI"}
                    </span>
                </div>

                {/* Toggle button */}
                {status === "running" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <button
                            onClick={toggleTorch}
                            style={{
                                width: "100%",
                                padding: "0.875rem",
                                borderRadius: "0.75rem",
                                border: "none",
                                background: torchOn
                                    ? "rgba(234,179,8,0.15)"
                                    : "linear-gradient(135deg, #eab308, #ca8a04)",
                                color: torchOn ? "#eab308" : "#000",
                                fontWeight: 700,
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            {torchOn ? "⚫ Matikan Flashlight" : "🔦 Nyalakan Flashlight"}
                        </button>

                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Flashlight Normal</button>
                            <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Tidak Berfungsi</button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
