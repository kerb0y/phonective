"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

interface SensorData {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
    accelX: number | null;
    accelY: number | null;
    accelZ: number | null;
}

export default function SensorTestPage() {
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail" | "unsupported">("idle");
    const [active, setActive] = useState(false);
    const [data, setData] = useState<SensorData>({ alpha: null, beta: null, gamma: null, accelX: null, accelY: null, accelZ: null });
    const [supported, setSupported] = useState(true);

    const orientHandler = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
    const motionHandler = useRef<((e: DeviceMotionEvent) => void) | null>(null);

    const handleStart = async () => {
        setActive(true);
        setStatus("running");

        // iOS 13+ permission
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const DeviceOrientationEventTyped = DeviceOrientationEvent as any;
        if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
            try {
                const res = await DeviceOrientationEventTyped.requestPermission();
                if (res !== "granted") {
                    setStatus("fail");
                    setActive(false);
                    return;
                }
            } catch {
                setStatus("fail");
                setActive(false);
                return;
            }
        }

        orientHandler.current = (e: DeviceOrientationEvent) => {
            setData((prev) => ({ ...prev, alpha: e.alpha, beta: e.beta, gamma: e.gamma }));
        };

        motionHandler.current = (e: DeviceMotionEvent) => {
            const a = e.accelerationIncludingGravity;
            if (a) {
                setData((prev) => ({ ...prev, accelX: a.x, accelY: a.y, accelZ: a.z }));
            }
        };

        if (!("DeviceOrientationEvent" in window)) {
            setSupported(false);
            setStatus("unsupported");
            setActive(false);
            return;
        }

        window.addEventListener("deviceorientation", orientHandler.current);
        window.addEventListener("devicemotion", motionHandler.current);
    };

    const handleReset = () => {
        if (orientHandler.current) window.removeEventListener("deviceorientation", orientHandler.current);
        if (motionHandler.current) window.removeEventListener("devicemotion", motionHandler.current);
        setActive(false);
        setStatus("idle");
        setData({ alpha: null, beta: null, gamma: null, accelX: null, accelY: null, accelZ: null });
    };

    useEffect(() => () => { handleReset(); }, []);

    const fmt = (v: number | null) => v !== null ? v.toFixed(2) : "—";
    const hasData = data.alpha !== null || data.accelX !== null;

    const sensors = [
        { label: "Orientasi — Alpha (Z)", value: fmt(data.alpha), unit: "°", color: "#06b6d4", desc: "Rotasi kompas" },
        { label: "Orientasi — Beta (X)", value: fmt(data.beta), unit: "°", color: "#06b6d4", desc: "Tilt maju/mundur" },
        { label: "Orientasi — Gamma (Y)", value: fmt(data.gamma), unit: "°", color: "#06b6d4", desc: "Tilt kiri/kanan" },
        { label: "Akselerometer X", value: fmt(data.accelX), unit: "m/s²", color: "#f59e0b", desc: "Gerakan horizontal" },
        { label: "Akselerometer Y", value: fmt(data.accelY), unit: "m/s²", color: "#f59e0b", desc: "Gerakan vertikal" },
        { label: "Akselerometer Z", value: fmt(data.accelZ), unit: "m/s²", color: "#f59e0b", desc: "Kedalaman / gravitasi" },
    ];

    return (
        <ToolLayout
            title="Sensor Test"
            description="Monitor gyroscope, accelerometer, dan orientasi perangkat secara realtime."
            accentColor="#06b6d4"
            status={status}
            onStart={handleStart}
            onReset={handleReset}
            isRunning={active}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Gerakkan HP ke berbagai arah untuk melihat respons sensor</li>
                        <li>Di iOS, browser akan meminta izin akses sensor</li>
                        <li>Sensor tidak respons = gyroscope mungkin rusak</li>
                        <li>Data yang tidak berubah sama sekali = sensor tidak berfungsi</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {!supported && (
                    <div style={{ padding: "0.875rem 1rem", borderRadius: "0.625rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        Perangkat ini tidak mendukung Device Orientation API.
                    </div>
                )}

                {/* Sensor grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                    {sensors.map((s) => (
                        <div
                            key={s.label}
                            style={{
                                background: "var(--color-surface-3)",
                                borderRadius: "0.75rem",
                                padding: "0.875rem 1rem",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div style={{ fontSize: "0.6875rem", color: "var(--color-text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: "0.25rem" }}>
                                {s.desc}
                            </div>
                            <div style={{ fontWeight: 800, fontSize: "1.25rem", color: s.color, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                                {s.value}
                                <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--color-text-muted)", marginLeft: "0.25rem" }}>{s.unit}</span>
                            </div>
                            <div style={{ fontSize: "0.7rem", color: "var(--color-text-subtle)", marginTop: "0.125rem" }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Visual orientation indicator */}
                {active && data.beta !== null && data.gamma !== null && (
                    <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center" }}>
                        <div
                            style={{
                                width: "6rem",
                                height: "10rem",
                                border: "3px solid #06b6d4",
                                borderRadius: "1rem",
                                position: "relative",
                                transform: `rotateX(${-(data.beta ?? 0) * 0.3}deg) rotateZ(${(data.gamma ?? 0) * 0.5}deg)`,
                                transition: "transform 0.1s ease",
                                background: "rgba(6,182,212,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#06b6d4",
                                fontSize: "1.5rem",
                            }}
                        >
                            📱
                        </div>
                    </div>
                )}

                {hasData && (
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={() => setStatus("pass")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Sensor Normal</button>
                        <button onClick={() => setStatus("fail")} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Sensor Error</button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
