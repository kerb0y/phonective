"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";

interface BatteryInfo {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
}

export default function BatteryPage() {
    const [batteryInfo, setBatteryInfo] = useState<BatteryInfo | null>(null);
    const [supported, setSupported] = useState(true);
    const [status] = useState<"idle">("idle");

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nav = navigator as any;
        if (typeof nav.getBattery === "function") {
            nav.getBattery().then((b: any) => {
                const update = () => setBatteryInfo({
                    level: b.level,
                    charging: b.charging,
                    chargingTime: b.chargingTime,
                    dischargingTime: b.dischargingTime,
                });
                update();
                b.addEventListener("levelchange", update);
                b.addEventListener("chargingchange", update);
                return () => {
                    b.removeEventListener("levelchange", update);
                    b.removeEventListener("chargingchange", update);
                };
            });
        } else {
            setSupported(false);
        }
    }, []);

    const pct = batteryInfo ? Math.round(batteryInfo.level * 100) : null;
    const BatteryIcon = batteryInfo?.charging ? BatteryCharging : pct !== null && pct > 75 ? BatteryFull : pct !== null && pct > 40 ? BatteryMedium : BatteryLow;
    const battColor = batteryInfo?.charging ? "#22c55e" : pct !== null && pct > 50 ? "#22c55e" : pct !== null && pct > 20 ? "#f59e0b" : "#ef4444";

    const fmtTime = (secs: number) => {
        if (!isFinite(secs) || secs <= 0) return "—";
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        return h > 0 ? `${h}j ${m}m` : `${m}m`;
    };

    const guides = [
        { title: "Indikator Baterai Bermasalah", items: ["Kapasitas turun drastis dalam beberapa bulan", "HP mati mendadak meski persentase masih tinggi", "Panas berlebihan saat charging atau pemakaian normal", "Baterai mengembung (terlihat atau terasa)"] },
        { title: "Cara Cek di Android", items: ["Buka telepon dan ketik *#*#4636#*#* lalu pilih Battery Information", "Gunakan aplikasi seperti AccuBattery untuk monitoring kesehatan baterai", "Di menu Developer Options: Battery Status menampilkan kondisi baterai", "Charge hingga 100%, lepas charger, pantau berapa lama daya turun 1%"] },
        { title: "Cara Cek di iPhone (iOS)", items: ["Settings → Baterai → Kondisi & Pengisian Daya", "Maximum Capacity di bawah 80% = waktunya ganti baterai", "Aktifkan 'Optimized Battery Charging' untuk menjaga kesehatan jangka panjang", "Hindari charge 0-100% terus menerus, jaga di antara 20-80%"] },
        { title: "Tips Menjaga Baterai", items: ["Hindari panas berlebihan (jangan charge sambil main game berat)", "Gunakan charger original atau bersertifikat", "Aktifkan Battery Saver/Low Power Mode saat baterai <30%", "Copot charger saat sudah penuh, jangan biarkan overnight terlalu sering"] },
    ];

    return (
        <ToolLayout
            title="Battery Check"
            description="Cek status baterai realtime dan pelajari cara mengecek kesehatan baterai."
            accentColor="#22c55e"
            status={status}
            showStartButton={false}
            showResetButton={false}
        >
            <div style={{ padding: "1.5rem" }}>
                {/* Live battery status */}
                {supported && batteryInfo ? (
                    <div style={{ marginBottom: "1.5rem" }}>
                        <div
                            style={{
                                background: "var(--color-surface-3)",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1.25rem",
                                border: "1px solid var(--color-border)",
                                marginBottom: "0.75rem",
                            }}
                        >
                            <BatteryIcon size={48} color={battColor} style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem" }}>
                                    <span style={{ fontSize: "2.5rem", fontWeight: 900, color: battColor, letterSpacing: "-0.04em" }}>{pct}%</span>
                                    {batteryInfo.charging && <span style={{ fontSize: "0.875rem", color: "#22c55e", fontWeight: 600 }}>⚡ Mengisi</span>}
                                </div>
                                <div style={{ height: "8px", background: "var(--color-border)", borderRadius: "4px", overflow: "hidden", marginTop: "0.5rem" }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: battColor, borderRadius: "4px", transition: "width 0.5s" }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                            {[
                                { label: "Waktu Penuh", value: fmtTime(batteryInfo.chargingTime) },
                                { label: "Waktu Habis", value: fmtTime(batteryInfo.dischargingTime) },
                            ].map((item) => (
                                <div key={item.label} style={{ background: "var(--color-surface-3)", borderRadius: "0.625rem", padding: "0.75rem", border: "1px solid var(--color-border)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", marginBottom: "0.25rem" }}>{item.label}</div>
                                    <div style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--color-text)", letterSpacing: "-0.02em" }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !supported ? (
                    <div style={{ padding: "0.875rem 1rem", borderRadius: "0.625rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: "0.875rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Battery size={16} />
                        Battery API tidak didukung di browser ini. Gunakan panduan manual di bawah.
                    </div>
                ) : null}

                {/* Guides */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {guides.map((g) => (
                        <details
                            key={g.title}
                            style={{
                                background: "var(--color-surface-3)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "0.875rem",
                                overflow: "hidden",
                            }}
                        >
                            <summary
                                style={{
                                    padding: "1rem 1.25rem",
                                    fontWeight: 700,
                                    fontSize: "0.9375rem",
                                    color: "var(--color-text)",
                                    cursor: "pointer",
                                    letterSpacing: "-0.02em",
                                    listStyle: "none",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {g.title}
                                <span style={{ color: "#22c55e", fontSize: "1.25rem", lineHeight: 1 }}>+</span>
                            </summary>
                            <div style={{ padding: "0 1.25rem 1rem", borderTop: "1px solid var(--color-border)" }}>
                                <ul style={{ margin: "0.875rem 0 0", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                                    {g.items.map((item) => (
                                        <li key={item} style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.55 }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
}
