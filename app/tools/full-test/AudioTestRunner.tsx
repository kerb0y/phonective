"use client";

import { useState, useRef, useEffect } from "react";
import { TestResult } from "./page";

export default function AudioTestRunner({ onComplete }: { onComplete: (res: TestResult) => void }) {
  const [micLevel, setMicLevel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animRef = useRef<number | null>(null);
  
  const playSound = () => {
    if (playing) {
      oscillator.current?.stop();
      oscillator.current = null;
      audioCtx.current?.close();
      audioCtx.current = null;
      setPlaying(false);
      return;
    }
    const ctx = new window.AudioContext();
    audioCtx.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 1000;
    gain.gain.value = 0.5;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscillator.current = osc;
    setPlaying(true);
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const tick = () => {
        const buf = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(buf);
        const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
        setMicLevel(Math.min(100, avg * 2));
        animRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Ignore mic error gracefully
    }
  };

  useEffect(() => {
    startMic();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (playing) {
        oscillator.current?.stop();
        audioCtx.current?.close();
      }
    };
  }, [playing]);

  const endTest = (result: TestResult) => {
    if (playing) {
      oscillator.current?.stop();
      audioCtx.current?.close();
    }
    if (animRef.current) cancelAnimationFrame(animRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    onComplete(result);
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Tes Speaker & Mic</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9375rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
        Pastikan volume terangkat. Putar nada untuk mengetes speaker, lalu bicaralah untuk mengetes indikator mikrofon.
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", justifyContent: "center" }}>
        <button onClick={playSound} style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", border: "none", background: playing ? "#ef4444" : "#f59e0b", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
          {playing ? "⏹ Hentikan Suara" : "▶️ Putar Suara 1kHz"}
        </button>
      </div>

      <div style={{ marginBottom: "2rem", maxWidth: "300px", margin: "0 auto 2.5rem" }}>
        <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Indikator Mikrofon</div>
        <div style={{ height: "12px", background: "var(--color-surface-3)", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
          <div style={{ height: "100%", width: `${micLevel}%`, background: micLevel > 10 ? "#10b981" : "var(--color-border)", transition: "width 0.1s" }} />
        </div>
      </div>

      <div style={{ padding: "1.5rem", background: "var(--color-surface-3)", borderRadius: "0.875rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Kondisi Audio:</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button onClick={() => endTest("Pass")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)", color: "#22c55e", fontWeight: 600, cursor: "pointer" }}>Keduanya Normal</button>
          <button onClick={() => endTest("Fail")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Ada Masalah</button>
          <button onClick={() => endTest("Skipped")} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-muted)", fontWeight: 600, cursor: "pointer" }}>Lewati</button>
        </div>
      </div>
    </div>
  );
}
