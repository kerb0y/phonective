"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  CircleDot,
  Hand,
  Volume2,
  Camera,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Shield,
  Zap,
} from "lucide-react";

const featuredTools = [
  {
    icon: Monitor,
    name: "Screen Test",
    desc: "Dead pixel & warna",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.1)",
    href: "/tools/screen-test",
  },
  {
    icon: Volume2,
    name: "Audio Test",
    desc: "Speaker & mikrofon",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    href: "/tools/speaker-test",
  },
  {
    icon: Camera,
    name: "Camera Test",
    desc: "Kamera depan & belakang",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.1)",
    href: "/tools/camera-test",
  },
  {
    icon: Hand,
    name: "Touch Test",
    desc: "Responsivitas layar",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    href: "/tools/touch-test",
  },
  {
    icon: CircleDot,
    name: "Dead Pixel",
    desc: "Pixel mati & rusak",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.1)",
    href: "/tools/dead-pixel",
  },
];

const features = [
  {
    icon: Zap,
    title: "Langsung di Browser",
    desc: "Tidak perlu install aplikasi. Semua tools berjalan langsung dari browser smartphone kamu.",
  },
  {
    icon: Shield,
    title: "Privasi Terjaga",
    desc: "Tidak ada data yang dikirim ke server. Semua proses terjadi sepenuhnya di perangkat kamu.",
  },
  {
    icon: CheckCircle2,
    title: "10+ Diagnostic Tools",
    desc: "Dari cek layar hingga sensor, semua yang kamu butuhkan ada dalam satu platform.",
  },
];

const steps = [
  { num: "01", title: "Buka Phonective", desc: "Akses phonective.app di browser smartphone." },
  { num: "02", title: "Pilih Tool", desc: "Pilih jenis tes yang ingin kamu lakukan." },
  { num: "03", title: "Lihat Hasilnya", desc: "Ikuti panduan dan dapatkan hasil diagnostik instan." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-center px-5 pt-24 pb-20 min-h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", maxWidth: "680px" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.08)] text-[var(--color-brand-500)] text-[0.8125rem] font-semibold mb-6 tracking-wide">
            <Smartphone size={12} />
            Gratis · Tanpa Install · Langsung di Browser
          </div>

          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] text-[var(--color-text)] mb-5">
            Cek Kesehatan HP Anda{" "}
            <span className="gradient-text">dengan Mudah</span>
          </h1>

          <p className="text-[clamp(1rem,2.5vw,1.1875rem)] text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-[560px] mx-auto">
            Gunakan Phonective untuk memastikan kondisi smartphone sebelum membeli
            atau menjual HP bekas. Diagnostik lengkap layaknya profesional, langsung dari browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tools/full-test" className="btn-primary w-full sm:w-auto min-w-[200px]">
              Mulai Cek HP
              <ArrowRight size={18} />
            </Link>
            <Link href="/tools" className="btn-secondary w-full sm:w-auto min-w-[200px]">
              Lihat Semua Tools
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-8 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <div className="container-px max-w-[1280px] mx-auto flex items-center justify-center text-center opacity-80">
          <Shield size={16} className="text-[var(--color-text-muted)] mr-2" />
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Privasi 100% Terjaga: Semua tes berjalan langsung di browser tanpa mengirim data ke server.
          </p>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="section bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container-px max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-2">
              Tools Diagnostik Terpopuler
            </h2>
            <p className="text-[var(--color-text-muted)] text-[0.9375rem]">
              Klik untuk langsung memulai tes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {featuredTools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link href={tool.href} className="flex h-full">
                    <div className="card w-full flex flex-col items-center justify-center text-center p-5 group hover:border-[var(--color-brand-500)] hover:-translate-y-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                        style={{ background: tool.bg }}
                      >
                        <Icon size={22} color={tool.color} strokeWidth={2} />
                      </div>
                      <p className="font-bold text-[0.9375rem] text-[var(--color-text)] tracking-tight mb-1">
                        {tool.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-subtle)] px-2">
                        {tool.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/tools" className="btn-secondary">
              Lihat Semua Tools
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-[var(--color-surface-2)]">
        <div className="container-px max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-2">
              Cara Menggunakan
            </h2>
            <p className="text-[var(--color-text-muted)] text-[0.9375rem]">
              Cukup 3 langkah sederhana layaknya dashboard profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="text-[2.5rem] font-black text-[var(--color-brand-500)] opacity-20 tracking-tighter mb-4 tabular-nums block">
                  {step.num}
                </div>
                <h3 className="font-bold text-[1.125rem] text-[var(--color-text)] mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-[0.875rem] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Phonective */}
      <section className="section bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container-px max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-2">
              Platform Kelas Profesional
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-6 flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.1)] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[var(--color-brand-500)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[1.0625rem] text-[var(--color-text)] mb-1.5 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-[0.875rem] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[560px] mx-auto px-5"
        >
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-4">
            Siap Cek HP Kamu?
          </h2>
          <p className="text-[var(--color-text-muted)] text-[1rem] leading-relaxed mb-8">
            Mulai diagnostik sekarang — pantau kondisi device dari satu dashboard intuitif.
          </p>
          <Link href="/tools/full-test" className="btn-primary w-full sm:w-auto">
            Mulai Full Diagnostic
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
