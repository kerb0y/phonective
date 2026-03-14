"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Minimize2 } from "lucide-react";

type ColorMode =
    | "red"
    | "green"
    | "blue"
    | "white"
    | "black"
    | "gradient";

const colorModes: { key: ColorMode; label: string; bg: string; text: string }[] = [
    { key: "red", label: "Merah", bg: "#ef4444", text: "#fff" },
    { key: "green", label: "Hijau", bg: "#22c55e", text: "#fff" },
    { key: "blue", label: "Biru", bg: "#3b82f6", text: "#fff" },
    { key: "white", label: "Putih", bg: "#ffffff", text: "#000" },
    { key: "black", label: "Hitam", bg: "#000000", text: "#fff" },
    { key: "gradient", label: "Gradien", bg: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6)", text: "#fff" },
];

function getColorStyle(mode: ColorMode) {
    if (mode === "gradient") {
        return "linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #22c55e 50%, #3b82f6 75%, #8b5cf6 100%)";
    }
    const found = colorModes.find((c) => c.key === mode);
    return found?.bg ?? "#fff";
}

export default function ScreenTestPage() {
    const [activeColor, setActiveColor] = useState<ColorMode | null>(null);
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            if (isFull) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        };
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", onFullscreenChange);
            document.body.style.overflow = "";
        };
    }, []);

    const handleStart = () => {
        setActiveColor("white");
        setStatus("running");
    };

    const handleReset = () => {
        setActiveColor(null);
        setStatus("idle");
    };

    return (
        <ToolLayout
            title="Screen Test"
            description="Cek kualitas layar, brightness, dan akurasi warna dengan berbagai mode warna."
            accentColor="#0ea5e9"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={status === "running"}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                        Panduan
                    </p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Pergi ke ruangan gelap untuk hasil terbaik</li>
                        <li>Pastikan brightness layar di level maksimum</li>
                        <li>Cari area yang tidak seharusnya ada — titik gelap, terang, atau warna berbeda</li>
                        <li>Coba setiap mode warna secara bergantian</li>
                    </ul>
                </div>
            }
        >
            {/* Color selector */}
            <div style={{ padding: "1.5rem" }}>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1rem", fontWeight: 500 }}>
                    Pilih mode warna:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {colorModes.map((mode) => (
                        <button
                            key={mode.key}
                            onClick={() => {
                                setActiveColor(mode.key);
                                setStatus("running");
                            }}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.5rem",
                                border: activeColor === mode.key ? "2px solid #0ea5e9" : "2px solid transparent",
                                background: mode.key === "gradient"
                                    ? "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6)"
                                    : mode.bg,
                                color: mode.text,
                                fontWeight: 600,
                                fontSize: "0.8125rem",
                                cursor: "pointer",
                                transition: "all 0.15s",
                                outline: activeColor === mode.key ? "2px solid #0ea5e9" : "none",
                                outlineOffset: "2px",
                            }}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>

                {/* Color preview */}
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "0.75rem",
                        background: activeColor ? getColorStyle(activeColor) : "var(--color-surface-3)",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.3s ease",
                        cursor: "pointer",
                        touchAction: "none",
                        ...(isFullscreen ? {
                            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999, borderRadius: 0, border: "none"
                        } : {})
                    }}
                    onClick={() => {
                        if (activeColor && !isFullscreen) {
                            const el = document.documentElement;
                            if (el.requestFullscreen) el.requestFullscreen();
                        }
                    }}
                    title="Klik untuk fullscreen"
                >
                    {isFullscreen && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (document.exitFullscreen) document.exitFullscreen();
                            }}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/20 hover:bg-black/40 text-white rounded-full p-2.5 backdrop-blur-md transition-all z-[10000]"
                            title="Keluar Fullscreen"
                        >
                            <Minimize2 size={24} />
                        </button>
                    )}
                    
                    {!activeColor && (
                        <span style={{ color: "var(--color-text-subtle)", fontSize: "0.875rem" }}>
                            Pilih warna untuk memulai preview
                        </span>
                    )}
                    {activeColor && (
                        <span style={{ fontSize: "0.75rem", opacity: 0.5, color: activeColor === "black" ? "#fff" : "#000" }}>
                            Klik untuk fullscreen
                        </span>
                    )}
                </div>

                {/* Mark pass/fail */}
                {activeColor && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button
                            onClick={() => setStatus("pass")}
                            style={{
                                flex: 1,
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(34,197,94,0.3)",
                                background: "rgba(34,197,94,0.08)",
                                color: "#22c55e",
                                fontWeight: 600,
                                fontSize: "0.8125rem",
                                cursor: "pointer",
                            }}
                        >
                            ✓ Layar Normal
                        </button>
                        <button
                            onClick={() => setStatus("fail")}
                            style={{
                                flex: 1,
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(239,68,68,0.3)",
                                background: "rgba(239,68,68,0.08)",
                                color: "#ef4444",
                                fontWeight: 600,
                                fontSize: "0.8125rem",
                                cursor: "pointer",
                            }}
                        >
                            ✗ Ada Masalah
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
