"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { RefreshCw, Camera } from "lucide-react";

export default function CameraTestPage() {
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
    const [error, setError] = useState<string | null>(null);
    const [active, setActive] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopStream = useCallback(() => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
        setActive(false);
    }, []);

    const startCamera = useCallback(async (facing: "user" | "environment") => {
        stopStream();
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            setActive(true);
            setStatus("running");
        } catch {
            setError("Tidak dapat mengakses kamera. Pastikan izin telah diberikan.");
            setStatus("fail");
        }
    }, [stopStream]);

    const handleStart = () => startCamera(facingMode);

    const handleReset = () => {
        stopStream();
        setStatus("idle");
        setError(null);
    };

    const switchCamera = () => {
        const next = facingMode === "user" ? "environment" : "user";
        setFacingMode(next);
        if (active) startCamera(next);
    };

    useEffect(() => () => stopStream(), [stopStream]);

    return (
        <ToolLayout
            title="Camera Test"
            description="Preview kamera depan dan belakang secara realtime untuk mengecek kualitas gambar."
            accentColor="#ec4899"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={active}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Cek gambar: buram, noisy, atau ada garis horizontal?</li>
                        <li>Fokus otomatis: ketuk layar untuk fokus</li>
                        <li>Coba kamera depan dan belakang</li>
                        <li>Lihat di tempat terang dan gelap</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.25rem" }}>
                {error && (
                    <div style={{ padding: "0.875rem 1rem", borderRadius: "0.625rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        {error}
                    </div>
                )}

                {/* Camera toggle */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    {(["environment", "user"] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => { setFacingMode(mode); if (active) startCamera(mode); }}
                            style={{
                                flex: 1,
                                padding: "0.5rem",
                                borderRadius: "0.625rem",
                                border: facingMode === mode ? "2px solid #ec4899" : "2px solid var(--color-border)",
                                background: facingMode === mode ? "rgba(236,72,153,0.08)" : "var(--color-surface-3)",
                                color: facingMode === mode ? "#ec4899" : "var(--color-text-muted)",
                                fontWeight: 600,
                                fontSize: "0.8125rem",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.375rem",
                            }}
                        >
                            <Camera size={14} />
                            {mode === "environment" ? "Kamera Belakang" : "Kamera Depan"}
                        </button>
                    ))}
                </div>

                {/* Video preview */}
                <div
                    style={{
                        position: "relative",
                        borderRadius: "0.875rem",
                        overflow: "hidden",
                        background: "#000",
                        aspectRatio: "4/3",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <video
                        ref={videoRef}
                        playsInline
                        muted
                        autoPlay
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: facingMode === "user" ? "scaleX(-1)" : "none",
                            display: active ? "block" : "none",
                        }}
                    />
                    {!active && (
                        <div style={{ textAlign: "center", color: "#64748b" }}>
                            <Camera size={40} style={{ marginBottom: "0.5rem", opacity: 0.4 }} />
                            <p style={{ fontSize: "0.875rem" }}>Tekan &quot;Mulai Tes&quot; untuk preview kamera</p>
                        </div>
                    )}

                    {/* Switch camera overlay button */}
                    {active && (
                        <button
                            onClick={switchCamera}
                            style={{
                                position: "absolute",
                                top: "0.75rem",
                                right: "0.75rem",
                                background: "rgba(0,0,0,0.5)",
                                backdropFilter: "blur(4px)",
                                border: "none",
                                borderRadius: "0.5rem",
                                padding: "0.5rem",
                                color: "#fff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                            }}
                        >
                            <RefreshCw size={13} />
                            Ganti
                        </button>
                    )}
                </div>

                {active && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Kamera Normal</button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Ada Masalah</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
