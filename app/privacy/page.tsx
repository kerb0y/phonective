import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Kebijakan privasi Phonective — platform diagnostik smartphone.",
};

export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.25rem" }}>
            <h1
                style={{
                    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "var(--color-text)",
                    marginBottom: "0.375rem",
                }}
            >
                Privacy Policy
            </h1>
            <p style={{ color: "var(--color-text-subtle)", fontSize: "0.875rem", marginBottom: "2rem" }}>
                Berlaku sejak: Maret 2026
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                    {
                        title: "1. Data yang Kami Kumpulkan",
                        content:
                            "Phonective tidak mengumpulkan, menyimpan, atau mengirimkan data pribadi apapun. Semua diagnostik berjalan sepenuhnya di sisi klien (browser Anda).",
                    },
                    {
                        title: "2. Penggunaan Kamera & Mikrofon",
                        content:
                            "Izin kamera dan mikrofon diminta hanya saat Anda menggunakan tool terkait (Camera Test, Microphone Test). Data audio/video tidak direkam ke server dan hanya diproses secara lokal di browser Anda.",
                    },
                    {
                        title: "3. Sensor Perangkat",
                        content:
                            "Data dari sensor (gyroscope, accelerometer, orientasi) ditampilkan secara realtime hanya untuk tujuan diagnostik. Data ini tidak dikirimkan ke server.",
                    },
                    {
                        title: "4. Local Storage",
                        content:
                            "Kami menyimpan preferensi tema (gelap/terang) di localStorage browser Anda. Ini adalah satu-satunya data yang disimpan secara lokal dan dapat dihapus kapan saja.",
                    },
                    {
                        title: "5. Cookie & Tracking",
                        content:
                            "Phonective tidak menggunakan cookie untuk tracking. Tidak ada analytics pihak ketiga, tidak ada iklan berbasis data.",
                    },
                    {
                        title: "6. Keamanan",
                        content:
                            "Website ini menggunakan HTTPS, Content Security Policy, dan header keamanan modern untuk melindungi Anda dari serangan XSS dan injeksi konten berbahaya.",
                    },
                    {
                        title: "7. Perubahan Kebijakan",
                        content:
                            "Jika kebijakan ini berubah, kami akan memperbarui tanggal di bagian atas halaman ini. Kami menyarankan Anda meninjau halaman ini secara berkala.",
                    },
                    {
                        title: "8. Kontak",
                        content:
                            "Pertanyaan tentang privasi? Kirim email ke: privacy@phonective.app",
                    },
                ].map((section) => (
                    <div
                        key={section.title}
                        style={{
                            background: "var(--color-surface-2)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "1rem",
                            padding: "1.375rem 1.5rem",
                        }}
                    >
                        <h2
                            style={{
                                fontWeight: 700,
                                fontSize: "1.0625rem",
                                color: "var(--color-text)",
                                marginBottom: "0.5rem",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {section.title}
                        </h2>
                        <p
                            style={{
                                color: "var(--color-text-muted)",
                                fontSize: "0.9rem",
                                lineHeight: 1.65,
                            }}
                        >
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
