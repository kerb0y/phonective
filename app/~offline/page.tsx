import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline | Phonective",
  description: "Terputus dari internet.",
};

export default function OfflineFallback() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#0a0a0f",
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}>📡</div>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Anda Sedang Offline</h1>
      <p style={{ color: "#94a3b8", marginBottom: "2rem", maxWidth: "400px", lineHeight: 1.6 }}>
        Sepertinya Anda kehilangan koneksi internet. Beberapa tools mungkin tidak berfungsi maksimal.
        Namun, jika Anda sudah pernah membuka Phonective sebelumnya, sebagian tool tetap dapat digunakan.
      </p>
      <a 
        href="/"
        style={{
          padding: "0.875rem 2rem",
          background: "#0ea5e9",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "0.75rem",
          fontWeight: 600,
        }}
      >
        Coba Muat Ulang Halaman Utama
      </a>
    </div>
  );
}
