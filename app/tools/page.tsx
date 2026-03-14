"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/lib/tools";

const categories = ["Semua", "Layar", "Audio", "Kamera", "Sensor", "Hardware"];

export default function ToolsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");

    const filtered = tools.filter((t) => {
        const matchSearch =
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === "Semua" || t.category === category;
        return matchSearch && matchCat;
    });

    return (
        <div className="max-w-[1280px] mx-auto px-5 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10"
            >
                <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-[var(--color-text)] mb-2">
                    Diagnostic Tools
                </h1>
                <p className="text-[var(--color-text-muted)] text-[0.9375rem] max-w-2xl">
                    {tools.length} alat diagnostik komprehensif untuk mengecek kondisi perangkat secara menyeluruh, berjalan 100% lokal di browser.
                </p>
            </motion.div>

            {/* Search + Filter */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-8 flex flex-col gap-4"
            >
                {/* Search */}
                <div className="relative max-w-md w-full">
                    <Search
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]"
                    />
                    <input
                        type="text"
                        placeholder="Cari tool diagnostik…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] text-[0.9375rem] outline-none transition-colors focus:border-[var(--color-brand-400)] focus:ring-2 focus:ring-[rgba(6,182,212,0.15)] shadow-sm"
                    />
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-[0.8125rem] font-semibold transition-all duration-200 outline-none
                                ${cat === category
                                    ? 'bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-600)] text-white shadow-md border-transparent'
                                    : 'bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-400)] hover:text-[var(--color-text)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Tools Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.map((tool, i) => (
                        <ToolCard key={tool.slug} tool={tool} index={i} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-5 border-2 border-dashed border-[var(--color-border)] rounded-2xl">
                    <p className="text-[1.125rem] font-bold text-[var(--color-text-muted)] mb-1">
                        Tidak ada tool ditemukan
                    </p>
                    <p className="text-[0.875rem] text-[var(--color-text-subtle)]">Coba kata kunci atau kategori lain.</p>
                </div>
            )}
        </div>
    );
}
