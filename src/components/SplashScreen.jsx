"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen({ onFinish }) {
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);
  const [counts, setCounts] = useState({ classes: 0, trainers: 0, members: 0 });

  const statuses = [
    "Initializing...",
    "Loading classes...",
    "Fetching trainers...",
    "Almost ready...",
    "Welcome!",
  ];

  // Cycle status text
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < statuses.length) setStatusIndex(i);
      else clearInterval(iv);
    }, 480);
    return () => clearInterval(iv);
  }, []);

  // Count up animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const targets = { classes: 50, trainers: 24, members: 500 };
      const duration = 1400;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;
      const iv = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        setCounts({
          classes: Math.floor(targets.classes * progress),
          trainers: Math.floor(targets.trainers * progress),
          members: Math.floor(targets.members * progress),
        });
        if (step >= steps) clearInterval(iv);
      }, interval);
      return () => clearInterval(iv);
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center overflow-hidden px-5">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,92,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,240,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-700 blur-[80px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[50px] right-[-50px] w-[250px] h-[250px] rounded-full bg-purple-500 blur-[80px] opacity-15 animate-pulse" />
      <div className="absolute bottom-[80px] left-[-30px] w-[200px] h-[200px] rounded-full bg-violet-700 blur-[80px] opacity-15 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo Ring */}
        <div className="w-[90px] h-[90px] rounded-full border-2 border-purple-500/50 flex items-center justify-center mb-7 shadow-[0_0_24px_rgba(139,92,246,0.2)] animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <rect x="2" y="13" width="4" height="6" rx="2" fill="white" opacity="0.9" />
              <rect x="26" y="13" width="4" height="6" rx="2" fill="white" opacity="0.9" />
              <rect x="6" y="10" width="4" height="12" rx="2" fill="white" />
              <rect x="22" y="10" width="4" height="12" rx="2" fill="white" />
              <rect x="10" y="14" width="12" height="4" rx="2" fill="white" />
            </svg>
          </div>
        </div>

        {/* Brand */}
        <h1
          className="text-white text-6xl leading-none mb-1"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.12em" }}
        >
          Fitness
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
            Cafe
          </span>
        </h1>
        <p className="text-white/40 text-[11px] tracking-[0.3em] uppercase mb-12">
          Train harder · Live better
        </p>

        {/* Loader */}
        <div className="w-[200px] flex flex-col items-center gap-3">
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-purple-300"
              style={{ animation: "loadBar 2.4s ease-in-out forwards" }}
            />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[5px] h-[5px] rounded-full bg-purple-500/50"
                style={{ animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
          <p className="text-[11px] text-white/25 tracking-[0.15em] uppercase">
            {statuses[statusIndex]}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-14">
          {[
            { num: counts.classes + "+", label: "Classes" },
            { num: counts.trainers, label: "Trainers" },
            { num: counts.members + "+", label: "Members" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-10 bg-purple-500/20" />}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-white text-3xl leading-none"
                  style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}
                >
                  {s.num}
                </span>
                <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enter Button */}
        <button
          onClick={() => onFinish?.()}
          className="mt-10 px-10 py-3.5 rounded-xl text-white text-sm font-semibold tracking-[0.15em] uppercase bg-gradient-to-r from-violet-600 to-purple-500 shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_36px_rgba(168,85,247,0.65)] hover:scale-[1.03] transition-all duration-200"
        >
          Enter the gym
        </button>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes loadBar {
          0%   { width: 0% }
          30%  { width: 40% }
          60%  { width: 70% }
          85%  { width: 88% }
          100% { width: 100% }
        }
        @keyframes dotBounce {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.5); opacity: 1; background: #a855f7; }
        }
      `}</style>
    </div>
  );
}