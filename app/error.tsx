"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "50vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div style={{
        background: "rgba(239, 68, 68, 0.1)",
        padding: "1rem",
        borderRadius: "50%",
        display: "inline-flex",
        marginBottom: "1.5rem"
      }}>
        <AlertCircle size={48} color="#ef4444" />
      </div>
      
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: 800,
        color: "var(--color-text)",
        marginBottom: "0.75rem",
        letterSpacing: "-0.03em"
      }}>
        Ups, Terjadi Kesalahan!
      </h2>
      
      <p style={{
        color: "var(--color-text-muted)",
        maxWidth: "400px",
        marginBottom: "2rem",
        lineHeight: "1.6"
      }}>
        Kami tidak dapat memuat fitur ini. Mungkin API tidak didukung atau terjadi kesalahan sistem.
        Silakan coba muat ulang halaman.
      </p>

      <button
        onClick={() => reset()}
        className="btn-primary"
      >
        Muat Ulang Halaman
      </button>
    </div>
  );
}
