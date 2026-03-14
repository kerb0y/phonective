"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#0a0a0f",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Fatal Error</h2>
          <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Aplikasi Phonective mengalami kesalahan kritikal.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.875rem 2rem",
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
