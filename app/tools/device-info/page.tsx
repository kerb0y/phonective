"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

export default function DeviceInfoPage() {
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    // Basic User Agent detection
    const ua = navigator.userAgent;
    let os = "Unknown OS";
    if (/android/i.test(ua)) os = "Android";
    else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) os = "iOS";
    else if (/windows/i.test(ua)) os = "Windows";
    else if (/mac/i.test(ua)) os = "macOS";
    else if (/linux/i.test(ua)) os = "Linux";

    let browser = "Unknown Browser";
    if (ua.indexOf("Chrome") > -1) browser = "Chrome";
    else if (ua.indexOf("Safari") > -1) browser = "Safari";
    else if (ua.indexOf("Firefox") > -1) browser = "Firefox";
    else if (ua.indexOf("Edge") > -1) browser = "Edge";
    if (ua.indexOf("Edg") > -1) browser = "Edge"; // New Edge

    setInfo({
      "Operating System": os,
      "Browser": browser,
      "Screen Resolution": `${window.screen.width} x ${window.screen.height}`,
      "Device Pixel Ratio": window.devicePixelRatio.toString(),
      "Color Depth": `${window.screen.colorDepth}-bit`,
      "Max Touch Points": navigator.maxTouchPoints.toString(),
      "Touch Support": ("ontouchstart" in window || navigator.maxTouchPoints > 0) ? "Yes" : "No",
      "Vibration Support": ("vibrate" in navigator) ? "Yes" : "No",
      "Device Orientation API": ("DeviceOrientationEvent" in window) ? "Yes" : "No",
      "Battery Status API": ("getBattery" in navigator) ? "Yes" : "No",
      "Media Devices API (Mic/Cam)": (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") ? "Yes" : "No",
    });
  }, []);

  return (
    <ToolLayout
      title="Device Information"
      description="Menampilkan detail sistem operasi, browser, spesifikasi layar, dan dukungan hardware perangkat."
      accentColor="#6366f1"
      showStartButton={false}
      showResetButton={false}
      footer={
        <div>
          <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tentang Fitur Device Info</p>
          <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
            <li>Informasi dibaca langsung dari User-Agent dan Web APIs browser.</li>
            <li>Beberapa dukungan hardware seperti kamera atau mikrofon mungkin tetap memerlukan izin pengguna saat digunakan perdana.</li>
            <li>OS iOS terkadang membatasi API tertentu (contoh: Vibration API, Battery API).</li>
          </ul>
        </div>
      }
    >
      <div style={{ padding: "1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem"
        }}>
          {Object.entries(info).map(([key, value]) => (
            <div key={key} style={{
              background: "var(--color-surface-3)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.875rem",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem"
            }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {key}
              </span>
              <span style={{ fontSize: "1.0625rem", color: "var(--color-text)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        {Object.keys(info).length === 0 && (
          <p style={{ color: "var(--color-text-muted)", textAlign: "center" }}>Mengambil data informasi perangkat...</p>
        )}
      </div>
    </ToolLayout>
  );
}
