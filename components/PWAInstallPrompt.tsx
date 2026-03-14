"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show if not already installed and not dismissed recently
    const isDismissed = localStorage.getItem("pwa-prompt-dismissed");
    
    // Check if already in standalone mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                         (window.navigator as any).standalone;
                         
    if (isDismissed === "true" || isStandalone) return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait a few seconds before showing to not be too aggressive
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    // Dismiss for 7 days
    localStorage.setItem("pwa-prompt-dismissed", "true");
    setTimeout(() => {
      localStorage.removeItem("pwa-prompt-dismissed");
    }, 7 * 24 * 60 * 60 * 1000);
  };

  if (!showPrompt) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      maxWidth: "400px",
      margin: "0 auto",
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "1rem",
      padding: "1.25rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
      zIndex: 9999,
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem"
    }}>
      <div style={{
        background: "rgba(14, 165, 233, 0.1)",
        color: "#0ea5e9",
        padding: "0.75rem",
        borderRadius: "0.75rem"
      }}>
        <Download size={24} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h4 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem", color: "var(--color-text)" }}>Install Phonective</h4>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
          Tambahkan ke layar utama untuk akses cepat dan penggunaan secara offline.
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={handleInstallClick} style={{ padding: "0.375rem 1rem", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
            Install Sekarang
          </button>
          <button onClick={dismissPrompt} style={{ padding: "0.375rem 1rem", background: "transparent", color: "var(--color-text-muted)", border: "1px solid var(--color-border)", borderRadius: "0.5rem", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
            Nanti Saja
          </button>
        </div>
      </div>

      <button onClick={dismissPrompt} style={{ background: "transparent", border: "none", color: "var(--color-text-muted)", cursor: "pointer", padding: "0.25rem" }}>
        <X size={16} />
      </button>
    </div>
  );
}
