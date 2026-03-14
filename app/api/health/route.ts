import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
    detail: z.enum(["basic", "full"]).optional().default("basic"),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const parsed = querySchema.safeParse({
        detail: searchParams.get("detail") ?? "basic",
    });

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid query parameters", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const response = {
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        ...(parsed.data.detail === "full" && {
            tools: [
                "screen-test",
                "dead-pixel",
                "touch-test",
                "speaker-test",
                "microphone-test",
                "camera-test",
                "sensor-test",
                "flashlight-test",
                "vibration-test",
                "battery",
            ],
            uptime: process.uptime(),
        }),
    };

    return NextResponse.json(response, {
        headers: {
            "Cache-Control": "no-store",
        },
    });
}
