import Link from "next/link";
import { Smartphone } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                padding: "2.5rem 0",
                marginTop: "auto",
            }}
        >
            <div
                className="container-px"
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: "0.375rem",
                            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Smartphone size={11} color="white" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em" }}>
                        Phonective
                    </span>
                </div>

                <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                    {[
                        { href: "/tools", label: "Tools" },
                        { href: "/about", label: "Tentang" },
                        { href: "/privacy", label: "Privasi" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--color-text-subtle)",
                                fontSize: "0.875rem",
                                textDecoration: "none",
                                transition: "color 0.15s",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <p style={{ color: "var(--color-text-subtle)", fontSize: "0.8125rem", textAlign: "center" }}>
                    © {year} Phonective. Platform diagnostik smartphone gratis.
                </p>
            </div>
        </footer>
    );
}
