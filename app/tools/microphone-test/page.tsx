"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

export default function MicrophoneTestPage() {
    const [status, setStatus] = useState<"idle" | "running" | "pass" | "fail">("idle");
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [volume, setVolume] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const streamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animRef = useRef<number | null>(null);
    const ctxRef = useRef<AudioContext | null>(null);

    const stopAll = () => {
        if (recorderRef.current && recorderRef.current.state !== "inactive") {
            recorderRef.current.stop();
        }
        streamRef.current?.getTracks().forEach((t) => t.stop());
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setVolume(0);
        setRecording(false);
    };

    const startRecording = async () => {
        setError(null);
        setAudioUrl(null);
        chunksRef.current = [];
        setCountdown(5);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Volume analyser
            ctxRef.current = new AudioContext();
            const source = ctxRef.current.createMediaStreamSource(stream);
            const analyser = ctxRef.current.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;

            const tick = () => {
                const buf = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(buf);
                const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
                setVolume(Math.min(100, avg * 2));
                animRef.current = requestAnimationFrame(tick);
            };
            tick();

            const recorder = new MediaRecorder(stream);
            recorderRef.current = recorder;

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                setStatus("running");
                if (animRef.current) cancelAnimationFrame(animRef.current);
                setVolume(0);
            };

            recorder.start();
            setRecording(true);

            // Countdown
            let secs = 5;
            const countInterval = setInterval(() => {
                secs -= 1;
                setCountdown(secs);
                if (secs <= 0) {
                    clearInterval(countInterval);
                    stopAll();
                }
            }, 1000);
        } catch (err) {
            setError("Tidak dapat mengakses mikrofon. Pastikan izin telah diberikan.");
            setStatus("fail");
        }
    };

    const handleReset = () => {
        stopAll();
        setAudioUrl(null);
        setStatus("idle");
        setError(null);
        setCountdown(0);
    };

    useEffect(() => () => stopAll(), []);

    return (
        <ToolLayout
            title="Microphone Test"
            description="Rekam suara selama 5 detik lalu putar ulang untuk memastikan mikrofon berfungsi."
            accentColor="#10b981"
            status={status}
            onStart={startRecording}
            onReset={handleReset}
            isRunning={recording}
            showStartButton={!recording && !audioUrl}
            footer={
                <div>
                    <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem", fontSize: "0.875rem" }}>Tips</p>
                    <ul style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", lineHeight: 1.6, paddingLeft: "1.25rem" }}>
                        <li>Izinkan akses mikrofon saat browser meminta</li>
                        <li>Ucapkan sesuatu saat rekaman berlangsung</li>
                        <li>Putar ulang dan dengarkan apakah suara terdengar jelas</li>
                        <li>Volume bar harus bergerak saat kamu berbicara</li>
                    </ul>
                </div>
            }
        >
            <div style={{ padding: "1.5rem" }}>
                {error && (
                    <div style={{ padding: "0.875rem 1rem", borderRadius: "0.625rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>
                        {error}
                    </div>
                )}

                {/* Volume meter */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.375rem" }}>
                        <span>Level mikrofon</span>
                        <span>{Math.round(volume)}%</span>
                    </div>
                    <div style={{ height: "8px", background: "var(--color-border)", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                            style={{
                                height: "100%",
                                width: `${volume}%`,
                                background: volume > 70 ? "#ef4444" : volume > 40 ? "#f59e0b" : "#10b981",
                                borderRadius: "4px",
                                transition: "width 0.05s, background 0.2s",
                            }}
                        />
                    </div>
                </div>

                {/* Status display */}
                <div
                    style={{
                        background: "var(--color-surface-3)",
                        borderRadius: "0.875rem",
                        padding: "2.5rem 1.5rem",
                        textAlign: "center",
                        marginBottom: "1rem",
                    }}
                >
                    {!recording && !audioUrl && !error && (
                        <div>
                            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎤</div>
                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Tekan &quot;Mulai Tes&quot; untuk merekam 5 detik</p>
                        </div>
                    )}
                    {recording && (
                        <div>
                            <div style={{ fontSize: "3rem", fontWeight: 900, color: "#10b981", letterSpacing: "-0.04em", marginBottom: "0.25rem" }}>{countdown}</div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#ef4444", fontSize: "0.875rem", fontWeight: 600 }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 0.8s ease infinite" }} />
                                Merekam…
                            </div>
                        </div>
                    )}
                    {audioUrl && (
                        <div>
                            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "0.875rem" }}>Rekaman selesai. Putar ulang:</p>
                            <audio controls src={audioUrl} style={{ width: "100%", borderRadius: "0.5rem" }} />
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
                                <button onClick={() => setStatus("pass")} style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✓ Mic Normal</button>
                                <button onClick={() => setStatus("fail")} style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer" }}>✗ Ada Masalah</button>
                            </div>
                            <button onClick={startRecording} className="btn-secondary" style={{ marginTop: "0.75rem", width: "100%", justifyContent: "center" }}>
                                Rekam Ulang
                            </button>
                        </div>
                    )}
                </div>

                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
            </div>
        </ToolLayout>
    );
}
