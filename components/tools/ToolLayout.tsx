"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Maximize2,
    Minimize2,
    RotateCcw,
    Play,
    Square,
    Info,
    CheckCircle2,
    AlertCircle,
    XCircle,
    MinusCircle
} from "lucide-react";

type TestStatus = "idle" | "running" | "pass" | "fail" | "unsupported";

interface ToolLayoutProps {
    title: string;
    description: string;
    accentColor?: string;
    status?: TestStatus;
    onStart?: () => void;
    onReset?: () => void;
    showStartButton?: boolean;
    showResetButton?: boolean;
    isRunning?: boolean;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const statusConfig: Record<
    TestStatus,
    { label: string; bg: string; color: string; icon: any }
> = {
    idle: { label: "Menunggu Input...", bg: "var(--color-surface-3)", color: "var(--color-text-muted)", icon: MinusCircle },
    running: { label: "Sedang Berjalan", bg: "rgba(6,182,212,0.1)", color: "var(--color-brand-600)", icon: AlertCircle },
    pass: { label: "Lulus (Normal)", bg: "rgba(16,185,129,0.1)", color: "#10b981", icon: CheckCircle2 },
    fail: { label: "Ditemukan Masalah", bg: "rgba(239,68,68,0.1)", color: "#ef4444", icon: XCircle },
    unsupported: { label: "Tidak Didukung Perangkat", bg: "rgba(245,158,11,0.1)", color: "#f59e0b", icon: AlertCircle },
};

function requestFullscreen(el: HTMLElement | null) {
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
}

async function exitFullscreen() {
    if (document.exitFullscreen) await document.exitFullscreen();
}

export default function ToolLayout({
    title,
    description,
    accentColor = "#0ea5e9",
    status = "idle",
    onStart,
    onReset,
    showStartButton = true,
    showResetButton = true,
    isRunning = false,
    children,
    footer,
}: ToolLayoutProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!isFullscreen) {
            requestFullscreen(document.documentElement);
            setIsFullscreen(true);
        } else {
            await exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const cfg = statusConfig[status];
    const StatusIcon = cfg.icon;

    return (
        <div className="max-w-[840px] mx-auto px-5 py-8 md:py-12">
            {/* Back link */}
            <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-[var(--color-text-subtle)] hover:text-[var(--color-text)] text-[0.875rem] font-semibold mb-6 transition-colors"
            >
                <ArrowLeft size={16} />
                Kembali ke Tools
            </Link>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-1">
                        {title}
                    </h1>
                </div>

                {/* Result Indicator (Top Right) */}
                <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[0.875rem] font-bold tracking-tight shadow-sm self-start border bg-opacity-50"
                    style={{ background: cfg.bg, color: cfg.color, borderColor: `${cfg.color}30` }}
                >
                    <StatusIcon size={18} className={status === "running" ? "animate-pulse" : ""} />
                    {cfg.label}
                </div>
            </motion.div>

            {/* Instruction Box */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="card p-5 md:p-6 mb-8 flex gap-4 items-start border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.03)]"
            >
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                    <Info size={18} className="text-[var(--color-brand-500)]" />
                </div>
                <div>
                    <h3 className="font-bold text-[var(--color-text)] text-[1rem] mb-1 tracking-tight">Cara Menggunakan</h3>
                    <p className="text-[var(--color-text-muted)] text-[0.9375rem] leading-relaxed">
                        {description}
                    </p>
                </div>
            </motion.div>

            {/* Test Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="card overflow-hidden mb-6 bg-[var(--color-surface)] shadow-md"
            >
                {children}
            </motion.div>

            {/* Action bar */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap gap-3"
            >
                {showStartButton && onStart && (
                    <button
                        onClick={onStart}
                        className="btn-primary"
                        style={{
                            background: isRunning
                                ? "rgba(239,68,68,0.1)"
                                : `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
                            color: isRunning ? "#ef4444" : "#fff",
                            boxShadow: isRunning ? "none" : `0 4px 14px ${accentColor}40`,
                        }}
                    >
                        {isRunning ? <Square size={16} /> : <Play size={16} fill="currentColor" />}
                        {isRunning ? "Stop Tes" : "Start Tes"}
                    </button>
                )}

                {showResetButton && onReset && (
                    <button
                        onClick={onReset}
                        className="btn-secondary"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                )}

                <button onClick={toggleFullscreen} className="btn-secondary ml-auto">
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    <span className="hidden sm:inline">{isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}</span>
                </button>
            </motion.div>

            {footer && (
                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    {footer}
                </div>
            )}
        </div>
    );
}
