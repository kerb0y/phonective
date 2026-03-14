import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 100;
const RATE_WINDOW_MS = 60 * 1000;

function getClientIp(req: NextRequest): string {
    return (
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        req.headers.get("x-real-ip") ??
        "unknown"
    );
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true;
    }

    if (entry.count >= RATE_LIMIT) return false;

    entry.count++;
    return true;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Rate limit API routes
    if (pathname.startsWith("/api/")) {
        const ip = getClientIp(req);
        if (!checkRateLimit(ip)) {
            return new NextResponse(
                JSON.stringify({ error: "Too many requests" }),
                {
                    status: 429,
                    headers: {
                        "Content-Type": "application/json",
                        "Retry-After": "60",
                    },
                }
            );
        }

        // CSRF: verify Origin for mutating methods
        const method = req.method.toUpperCase();
        if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
            const origin = req.headers.get("origin");
            const host = req.headers.get("host");
            if (origin && host && !origin.includes(host)) {
                return new NextResponse(
                    JSON.stringify({ error: "Forbidden" }),
                    { status: 403, headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    const response = NextResponse.next();

    // Content Security Policy
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "media-src 'self' blob:",
        "connect-src 'self'",
        "worker-src 'self' blob:",
        "frame-ancestors 'none'",
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
