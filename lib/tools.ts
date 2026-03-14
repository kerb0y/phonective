import {
    Monitor,
    CircleDot,
    Hand,
    Volume2,
    Mic,
    Camera,
    Activity,
    Zap,
    Battery,
    LucideIcon,
    Info,
    ListChecks,
} from "lucide-react";

export interface Tool {
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    category: string;
    tags: string[];
}

export const tools: Tool[] = [
    {
        slug: "screen-test",
        name: "Screen Test",
        description: "Cek kualitas layar, brightness, dan akurasi warna.",
        longDescription:
            "Tampilkan berbagai warna solid dan gradien pada layar untuk mendeteksi area yang terlalu gelap/terang, bintik warna, atau ketidakseragaman layar.",
        icon: Monitor,
        color: "#0ea5e9",
        bgColor: "rgba(14, 165, 233, 0.1)",
        category: "Layar",
        tags: ["layar", "warna", "brightness"],
    },
    {
        slug: "dead-pixel",
        name: "Dead Pixel Checker",
        description: "Deteksi pixel mati atau stuck pixel pada layar.",
        longDescription:
            "Mode fullscreen dengan siklus warna otomatis untuk memudahkan identifikasi dead pixel, stuck pixel, atau bintik hitam/white pada panel layar.",
        icon: CircleDot,
        color: "#f43f5e",
        bgColor: "rgba(244, 63, 94, 0.1)",
        category: "Layar",
        tags: ["dead pixel", "stuck pixel", "layar"],
    },
    {
        slug: "touch-test",
        name: "Touch Screen Test",
        description: "Verifikasi responsivitas dan akurasi touch screen.",
        longDescription:
            "Grid interaktif yang merespons setiap sentuhan. Ideal untuk mendeteksi area yang tidak merespons atau ghost touch pada layar sentuh.",
        icon: Hand,
        color: "#8b5cf6",
        bgColor: "rgba(139, 92, 246, 0.1)",
        category: "Layar",
        tags: ["touch", "sentuhan", "layar"],
    },
    {
        slug: "speaker-test",
        name: "Speaker Test",
        description: "Tes kualitas speaker dengan berbagai rentang frekuensi.",
        longDescription:
            "Putar nada low, mid, dan high frequency untuk mendeteksi speaker yang lemah, tidak keluar suara, atau suara distorsi.",
        icon: Volume2,
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)",
        category: "Audio",
        tags: ["speaker", "audio", "suara"],
    },
    {
        slug: "microphone-test",
        name: "Microphone Test",
        description: "Rekam dan putar ulang suara untuk mengecek mikrofon.",
        longDescription:
            "Gunakan mikrofon untuk merekam suara, lalu putar ulang rekaman untuk memastikan mikrofon berfungsi dengan baik dan suara terdengar jelas.",
        icon: Mic,
        color: "#10b981",
        bgColor: "rgba(16, 185, 129, 0.1)",
        category: "Audio",
        tags: ["mikrofon", "audio", "rekam"],
    },
    {
        slug: "camera-test",
        name: "Camera Test",
        description: "Preview kamera depan dan belakang secara realtime.",
        longDescription:
            "Tampilkan live preview kamera untuk mengecek kualitas gambar, fokus, dan kejernihan kamera depan maupun belakang.",
        icon: Camera,
        color: "#ec4899",
        bgColor: "rgba(236, 72, 153, 0.1)",
        category: "Kamera",
        tags: ["kamera", "foto", "video"],
    },
    {
        slug: "sensor-test",
        name: "Sensor Test",
        description: "Monitor gyroscope, accelerometer, dan sensor orientasi.",
        longDescription:
            "Tampilkan data realtime dari semua sensor gerak perangkat: gyroscope, accelerometer, dan orientasi 3D. Cocok untuk mengecek sensor yang bermasalah.",
        icon: Activity,
        color: "#06b6d4",
        bgColor: "rgba(6, 182, 212, 0.1)",
        category: "Sensor",
        tags: ["gyroscope", "accelerometer", "sensor"],
    },
    {
        slug: "flashlight-test",
        name: "Flashlight Test",
        description: "Aktifkan dan matikan flashlight langsung dari browser.",
        longDescription:
            "Gunakan Camera API untuk mengaktifkan torch/flashlight perangkat. Tes apakah lampu flash belakang berfungsi normal.",
        icon: Zap,
        color: "#eab308",
        bgColor: "rgba(234, 179, 8, 0.1)",
        category: "Hardware",
        tags: ["flashlight", "torch", "lampu"],
    },
    {
        slug: "vibration-test",
        name: "Vibration Test",
        description: "Tes motor getar dengan berbagai pola getaran.",
        longDescription:
            "Jalankan berbagai pola getaran menggunakan Vibration API untuk memastikan motor vibrator perangkat berfungsi normal.",
        icon: Zap,
        color: "#a855f7",
        bgColor: "rgba(168, 85, 247, 0.1)",
        category: "Hardware",
        tags: ["vibrate", "getar", "haptic"],
    },
    {
        slug: "battery",
        name: "Battery Check",
        description: "Cek status baterai dan panduan kesehatan baterai.",
        longDescription:
            "Lihat level baterai saat ini, status pengisian, dan baca panduan lengkap cara mengecek kesehatan baterai smartphone secara manual.",
        icon: Battery,
        color: "#22c55e",
        bgColor: "rgba(34, 197, 94, 0.1)",
        category: "Hardware",
        tags: ["baterai", "battery", "charging"],
    },
    {
        slug: "device-info",
        name: "Device Information",
        description: "Tampilkan rincian spesifikasi OS, layar, browser, dan dukungan hardware.",
        longDescription:
            "Alat ini membaca spesifikasi perangkat yang disediakan oleh browser, termasuk jenis sistem operasi, resolusi layar, tipe sentuhan, dan status ketersediaan API perangkat keras.",
        icon: Info,
        color: "#6366f1", // indigo-500
        bgColor: "rgba(99, 102, 241, 0.1)",
        category: "Semua",
        tags: ["info", "spesifikasi", "hardware"],
    },
    {
        slug: "full-test",
        name: "Full Diagnostic Mode",
        description: "Jalankan semua tes secara berurutan untuk hasil menyeluruh.",
        longDescription:
            "Jalankan serangkaian tes diagnostik utama secara berurutan. Setelah selesai, Anda dapat mengunduh laporan lengkap dalam format JSON.",
        icon: ListChecks,
        color: "#14b8a6", // teal-500
        bgColor: "rgba(20, 184, 166, 0.1)",
        category: "Semua",
        tags: ["full", "test", "diagnostic", "report"],
    },
];

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((t) => t.slug === slug);
}
