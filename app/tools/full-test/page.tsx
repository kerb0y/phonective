"use client";

import { useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";

// Individual components for the full test (loaded inline for seamless sequential testing)
import ScreenTestRunner from "./ScreenTestRunner";
import TouchTestRunner from "./TouchTestRunner";
import AudioTestRunner from "./AudioTestRunner";
import HardwareTestRunner from "./HardwareTestRunner";
import DiagnosticReport from "./DiagnosticReport";

export type TestResult = "Pending" | "Pass" | "Fail" | "Skipped" | "Unsupported";

export interface DiagnosticState {
  screen: TestResult;
  touch: TestResult;
  audio: TestResult; // speaker/mic combination
  hardware: TestResult; // camera/sensor/vibration combination
}

const steps = ["Intro", "Screen", "Touch", "Audio", "Hardware", "Report"];

export default function FullDiagnosticTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<DiagnosticState>({
    screen: "Pending",
    touch: "Pending",
    audio: "Pending",
    hardware: "Pending"
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const updateResult = (key: keyof DiagnosticState, res: TestResult) => {
    setResults(prev => ({ ...prev, [key]: res }));
    nextStep();
  };

  const resetTest = () => {
    setCurrentStep(0);
    setResults({ screen: "Pending", touch: "Pending", audio: "Pending", hardware: "Pending" });
  };

  return (
    <ToolLayout
      title="Full Diagnostic Mode"
      description="Jalankan seluruh tes utama secara berurutan untuk mendapatkan laporan akhir kondisi perangkat Anda."
      accentColor="#14b8a6"
      showStartButton={false}
      showResetButton={currentStep > 0}
      onReset={resetTest}
    >
      <div style={{ padding: "1.5rem" }}>
        {/* Progress Step Indicator */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: "var(--color-border)",
            zIndex: 0,
            transform: "translateY(-50%)"
          }} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            height: "2px",
            background: "#14b8a6",
            zIndex: 0,
            transform: "translateY(-50%)",
            transition: "width 0.3s ease"
          }} />

          {steps.map((s, i) => (
            <div key={s} style={{
              position: "relative",
              zIndex: 1,
              background: i <= currentStep ? "#14b8a6" : "var(--color-surface-3)",
              color: i <= currentStep ? "#fff" : "var(--color-text-muted)",
              border: `2px solid ${i <= currentStep ? "#14b8a6" : "var(--color-border)"}`,
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 700,
              transition: "all 0.3s"
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ minHeight: "350px" }}>
          {currentStep === 0 && (
            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.75rem" }}>Siap Memulai Diagnostik Lengkap?</h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
                Tes ini akan memandu Anda melalui pengecekan layar, sentuhan, audio (speaker/mic), dan hardware (kamera/sensor).
                Harap ikuti instruksi di setiap layar.
              </p>
              <button 
                onClick={nextStep}
                style={{
                  padding: "0.875rem 2.5rem",
                  background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Mulai Evaluasi
              </button>
            </div>
          )}

          {currentStep === 1 && <ScreenTestRunner onComplete={(res) => updateResult("screen", res)} />}
          {currentStep === 2 && <TouchTestRunner onComplete={(res) => updateResult("touch", res)} />}
          {currentStep === 3 && <AudioTestRunner onComplete={(res) => updateResult("audio", res)} />}
          {currentStep === 4 && <HardwareTestRunner onComplete={(res) => updateResult("hardware", res)} />}
          {currentStep === 5 && <DiagnosticReport results={results} onRestart={resetTest} />}
        </div>
      </div>
    </ToolLayout>
  );
}
