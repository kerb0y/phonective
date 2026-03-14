"use client";

import { useState, useRef, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

const COLS = 10;
const ROWS = 18;
const TOTAL = COLS * ROWS;

export default function TouchTestPage() {
    const [touched, setTouched] = useState<Set<number>>(new Set());
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const gridRef = useRef<HTMLDivElement>(null);

    const markCell = useCallback((clientX: number, clientY: number) => {
        const grid = gridRef.current;
        if (!grid) return;
        const rect = grid.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const col = Math.floor((x / rect.width) * COLS);
        const row = Math.floor((y / rect.height) * ROWS);
        if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
            const idx = row * COLS + col;
            setTouched((prev) => new Set([...prev, idx]));
        }
    }, []);

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            e.preventDefault();
            Array.from(e.touches).forEach((t) => markCell(t.clientX, t.clientY));
        },
        [markCell]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (e.buttons === 1) markCell(e.clientX, e.clientY);
        },
        [markCell]
    );

    const handleStart = () => {
        setTouched(new Set());
        setStatus("running");
    };

    const handleReset = () => {
        setTouched(new Set());
        setStatus("idle");
    };

    const coverage = Math.round((touched.size / TOTAL) * 100);

    return (
        <ToolLayout
            title="Touch Screen Test"
            description="Sentuh atau seret jari di seluruh layar untuk mengecek responsivitas touch screen."
            accentColor="#8b5cf6"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={status === "running"}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Seret jari di seluruh permukaan layar secara merata</li>
                        <li>Area yang tidak berubah warna = area yang tidak merespons sentuhan</li>
                        <li>Ghost touch = sel yang berubah tanpa disentuh</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.25rem" }}>
                {/* Stats */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ flex: 1, background: "var(--color-surface-3)", borderRadius: "0.625rem", padding: "0.75rem", textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.03em" }}>{coverage}%</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Area tercakup</div>
                    </div>
                    <div style={{ flex: 1, background: "var(--color-surface-3)", borderRadius: "0.625rem", padding: "0.75rem", textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.03em" }}>{touched.size}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Sel disentuh</div>
                    </div>
                    <div style={{ flex: 1, background: "var(--color-surface-3)", borderRadius: "0.625rem", padding: "0.75rem", textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.03em" }}>{TOTAL}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Total sel</div>
                    </div>
                </div>

                {/* Grid */}
                <div
                    ref={gridRef}
                    onTouchStart={handleTouchMove}
                    onTouchMove={handleTouchMove}
                    onMouseMove={handleMouseMove}
                    onMouseDown={(e) => markCell(e.clientX, e.clientY)}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                        gap: "2px",
                        width: "100%",
                        aspectRatio: "10/18",
                        borderRadius: "0.625rem",
                        overflow: "hidden",
                        border: "1px solid var(--color-border)",
                        touchAction: "none",
                        userSelect: "none",
                        cursor: status === "running" ? "crosshair" : "default",
                    }}
                >
                    {Array.from({ length: TOTAL }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                background: touched.has(i)
                                    ? "#8b5cf6"
                                    : "var(--color-surface-3)",
                                transition: "background 0.1s",
                            }}
                        />
                    ))}
                </div>

                {/* Mark */}
                {status === "running" && coverage >= 80 && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Touch Normal</button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Ada Area Mati</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
