"use client";

import { useState, useEffect } from "react";

export type SupportStatus = "supported" | "limited" | "unsupported" | "unknown";

export function useDeviceSupport(toolSlug: string): SupportStatus {
  const [status, setStatus] = useState<SupportStatus>("unknown");

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    let res: SupportStatus = "supported";

    switch (toolSlug) {
      case "vibration-test":
        res = ("vibrate" in navigator) ? "supported" : "unsupported";
        break;
      case "battery":
        res = ("getBattery" in navigator) ? "supported" : "unsupported";
        break;
      case "sensor-test":
        res = ("DeviceOrientationEvent" in window) ? "supported" : "unsupported";
        break;
      case "touch-test":
        res = ("ontouchstart" in window || navigator.maxTouchPoints > 0) ? "supported" : "limited";
        // Limited because mouse drag works, but it's meant for touch.
        break;
      case "microphone-test":
      case "camera-test":
      case "flashlight-test":
      case "speaker-test":
        res = (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") ? "supported" : "unsupported";
        // Flashlight specifically needs Torch constraint, which is hard to detect synchronously
        // So we default to supported if getUserMedia exists.
        break;
      case "screen-test":
      case "dead-pixel":
      case "device-info":
      case "full-test":
        res = "supported";
        break;
    }

    setStatus(res);
  }, [toolSlug]);

  return status;
}
