<div align="center">

<img src="public/icon.svg" alt="Phonective Logo" width="64" height="64" />

# Phonective

**Phone Diagnostic Tools — langsung dari browser**

[![Build CI](https://github.com/kerb0y/phonective/actions/workflows/build.yml/badge.svg)](https://github.com/kerb0y/phonective/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kerb0y/phonective)

Website tools diagnostik smartphone yang berjalan 100% di browser — tanpa install, tanpa kirim data ke server.

[**Live Demo →**](https://phonective.vercel.app)

</div>

---

## 📖 Deskripsi

Phonective membantu pengguna mengecek kondisi smartphone sebelum membeli atau menjual HP bekas. Semua tool berjalan sepenuhnya di browser menggunakan Web APIs modern — tidak ada data yang dikirim ke server.

## ✨ Fitur

| Tool | Deskripsi |
|------|-----------|
| 🖥️ **Screen Test** | Cek kualitas layar & akurasi warna |
| 🔴 **Dead Pixel Checker** | Deteksi pixel mati / stuck pixel |
| 👆 **Touch Screen Test** | Verifikasi responsivitas touch |
| 🔊 **Speaker Test** | Tes kualitas audio multi-frekuensi |
| 🎤 **Microphone Test** | Rekam & putar ulang via browser |
| 📷 **Camera Test** | Preview kamera depan & belakang |
| 📡 **Sensor Test** | Giroskop, akselerometer, orientasi |
| 🔦 **Flashlight Test** | Kontrol torch via Camera API |
| 📳 **Vibration Test** | Uji motor vibrator dengan berbagai pola |
| 🔋 **Battery Info** | Level baterai & status pengisian |
| 📱 **Device Info** | OS, browser, resolusi, hardware support |
| 🧪 **Full Diagnostic Mode** | Jalankan semua test sekaligus |
| 📊 **JSON Report Export** | Export hasil diagnostik |
| 📲 **PWA Install Support** | Bisa diinstal ke home screen |
| 📶 **Offline Mode** | Berfungsi tanpa koneksi internet |

## 🛠 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Validation | Zod |
| Analytics | [Plausible](https://plausible.io) (privacy-friendly) |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

### Instalasi

```bash
# 1. Clone repository
git clone https://github.com/kerb0y/phonective.git
cd phonective

# 2. Install dependencies
npm install

# 3. Copy env example
cp .env.example .env.local

# 4. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Production Build

```bash
npm run build
npm start
```

### Scripts

```bash
npm run dev        # Development server (Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
npm run typecheck  # TypeScript type check (no emit)
```

## 🌐 Deploy ke Vercel

Cara tercepat — klik tombol di bawah:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kerb0y/phonective)

Atau manual via CLI:

```bash
npx vercel --prod
```

Atau sambungkan repository GitHub ke [vercel.com](https://vercel.com) untuk auto-deploy setiap push ke branch `main`.

### Environment Variables

Buat file `.env.local` berdasarkan `.env.example`:

| Variable | Keterangan |
|----------|------------|
| `NEXT_PUBLIC_SITE_URL` | URL publik aplikasi (e.g. `https://phonective.app`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domain Plausible Analytics (opsional) |

## 📁 Struktur Proyek

```
phonective/
├── .github/
│   └── workflows/
│       └── build.yml          # CI: lint + typecheck + build
├── app/
│   ├── layout.tsx             # Root layout (SEO, fonts, ThemeProvider)
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Design system & CSS tokens
│   ├── about/                 # Halaman Tentang
│   ├── privacy/               # Privacy Policy
│   └── tools/
│       ├── page.tsx           # Daftar tools + search & filter
│       ├── screen-test/
│       ├── dead-pixel/
│       ├── touch-test/
│       ├── speaker-test/
│       ├── microphone-test/
│       ├── camera-test/
│       ├── sensor-test/
│       ├── flashlight-test/
│       ├── vibration-test/
│       ├── battery/
│       ├── device-info/
│       └── full-test/
├── components/
│   ├── ThemeProvider.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── tools/
│       ├── ToolCard.tsx
│       └── ToolLayout.tsx
├── hooks/
│   └── useDeviceSupport.ts
├── lib/
│   ├── tools.ts               # Tool metadata
│   └── utils.ts               # cn() helper
├── middleware.ts              # Security: CSP, rate limit, CSRF
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icon.svg
├── .editorconfig
├── .env.example               # Template env vars (safe to commit)
├── .gitattributes
├── .gitignore
├── vercel.json
└── LICENSE
```

## 🔐 Keamanan

- **Content Security Policy (CSP)** — mencegah XSS
- **X-Frame-Options: DENY** — mencegah clickjacking
- **CSRF Protection** — validasi origin header
- **Rate Limiting** — 100 req/menit per IP
- **Input Validation** — Zod pada semua API routes
- **No Data Collection** — semua proses terjadi lokal di browser

## 🔒 Privasi

Phonective **tidak mengumpulkan data apapun**. Semua diagnostik terjadi sepenuhnya di sisi klien. Tidak ada data sensor, audio, video, atau identitas yang dikirim ke server kami.

## 🤝 Contributing

Pull requests welcome! Untuk perubahan besar, harap buka issue terlebih dahulu.

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buka Pull Request

## 📄 License

[MIT](LICENSE) © 2026 Phonective