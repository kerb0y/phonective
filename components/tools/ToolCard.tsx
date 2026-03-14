"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Info as InfoIcon } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useDeviceSupport } from "@/hooks/useDeviceSupport";

interface ToolCardProps {
    tool: Tool;
    index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
    const Icon = tool.icon;
    const support = useDeviceSupport(tool.slug);

    const getBadge = () => {
        if (support === "unsupported") return { text: "Tidak Didukung", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: <AlertTriangle size={12} /> };
        if (support === "limited") return { text: "Terbatas", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <InfoIcon size={12} /> };
        if (support === "supported") return { text: "Dioptimalkan", color: "#10b981", bg: "rgba(16,185,129,0.1)" };
        return null;
    };
    const badge = getBadge();

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="h-full"
        >
            <Link
                href={`/tools/${tool.slug}`}
                className="block h-full outline-none"
            >
                <div
                    className="card h-full p-5 lg:p-6 group relative overflow-hidden flex flex-col cursor-pointer"
                >
                    {/* Glow effect on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at top left, ${tool.bgColor}, transparent 70%)`
                        }}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div
                            className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-sm"
                            style={{ background: tool.bgColor }}
                        >
                            <Icon size={20} color={tool.color} strokeWidth={2.5} />
                        </div>

                        {/* Title & Support Badge */}
                        <div className="flex justify-between items-start mb-1.5 gap-2">
                            <h3 className="font-bold text-[1.0625rem] text-[var(--color-text)] tracking-tight leading-snug">
                                {tool.name}
                            </h3>
                            {badge && (
                                <span 
                                  className="inline-flex items-center gap-1 text-[0.6rem] sm:text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap"
                                  style={{ background: badge.bg, color: badge.color }}
                                >
                                    {badge.icon}
                                    <span className="hidden sm:inline">{badge.text}</span>
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[var(--color-text-muted)] text-[0.8125rem] sm:text-[0.875rem] leading-relaxed mb-5 flex-1">
                            {tool.description}
                        </p>

                        {/* Arrow */}
                        <div className="flex items-center gap-1.5 text-[0.8125rem] font-bold mt-auto" style={{ color: tool.color }}>
                            Mulai Tes
                            <ArrowRight
                                size={14}
                                strokeWidth={2.5}
                                className="transition-transform duration-300 group-hover:translate-x-1.5"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
