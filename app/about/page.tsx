import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Phonective",
    description:
        "Phonective adalah platform diagnostik smartphone gratis yang berjalan langsung di browser. Cek kondisi HP tanpa install aplikasi.",
};

export default function AboutPage() {
    return (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.25rem" }}>
            <h1
                style={{
                    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "var(--color-text)",
                    marginBottom: "0.625rem",
                }}
            >
                Tentang Phonective
            </h1>
            <p
                style={{
                    color: "var(--color-text-muted)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                }}
            >
                Phonective hadir sebagai solusi modern untuk mendiagnosis kondisi smartphone
                langsung dari browser — tanpa perlu mengunduh aplikasi tambahan.
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                }}
            >
                {[
                    {
                        title: "Misi Kami",
                        content:
                            "Phonective ingin membantu setiap orang — terutama pembeli HP bekas — untuk mendapatkan informasi yang akurat tentang kondisi perangkat mereka sebelum bertransaksi. Dengan tools diagnostik berbasis browser, siapa pun bisa melakukan pengecekan secara mandiri dalam hitungan menit.",
                    },
                    {
                        title: "Cara Kerja",
                        content:
                            "Phonective menggunakan Web APIs modern yang telah tersedia di browser smartphone (Web Audio API, MediaDevices API, Device Orientation API, Vibration API, dan lainnya) untuk mengakses dan menguji berbagai komponen perangkat keras smartphone secara langsung — tanpa server, tanpa database.",
                    },
                    {
                        title: "Privasi & Keamanan",
                        content:
                            "Semua proses diagnostik terjadi sepenuhnya di sisi perangkat (client-side). Phonective tidak mengirim, menyimpan, atau menganalisis data apapun dari perangkat Anda. Data kamera, mikrofon, dan sensor tidak meninggalkan browser Anda.",
                    },
                    {
                        title: "Open & Gratis",
                        content:
                            "Phonective sepenuhnya gratis dan akan selalu gratis. Tidak ada pendaftaran, tidak ada biaya berlangganan, tidak ada iklan yang mengganggu. Cukup buka, pilih tool, dan mulai tes.",
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
