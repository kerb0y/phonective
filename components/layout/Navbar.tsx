"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "Tentang" },
    { href: "/privacy", label: "Privasi" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                borderBottom: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}
        >
            <div
                className="container-px"
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "3.5rem",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                        color: "var(--color-text)",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        letterSpacing: "-0.03em",
                    }}
                >
                    <div
                        style={{
                            width: "1.75rem",
                            height: "1.75rem",
                            borderRadius: "0.5rem",
                            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Smartphone size={14} color="white" strokeWidth={2.5} />
                    </div>
                    Phonective
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                padding: "0.375rem 0.75rem",
                                borderRadius: "0.5rem",
                                color: "var(--color-text-muted)",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                transition: "color 0.15s, background 0.15s",
                            }}
                            className="hidden sm:block hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)]"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-surface-2)",
                            color: "var(--color-text-muted)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s",
                            marginLeft: "0.5rem",
                        }}
                    >
                        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        style={{
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--color-border)",
                            background: "var(--color-surface-2)",
                            color: "var(--color-text-muted)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s",
                            marginLeft: "0.25rem",
                        }}
                        className="sm:hidden"
                    >
                        {mobileOpen ? <X size={15} /> : <Menu size={15} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{
                            borderTop: "1px solid var(--color-border)",
                            overflow: "hidden",
                        }}
                    >
                        <div className="container-px" style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: "block",
                                        padding: "0.625rem 0.75rem",
                                        borderRadius: "0.5rem",
                                        color: "var(--color-text-muted)",
                                        fontWeight: 500,
                                        fontSize: "0.9rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
