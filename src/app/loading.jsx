"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* 🔮 Deep Dynamic Ambient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#16092e_0%,#050816_80%)] pointer-events-none" />
      
      {/* 🌐 Abstract Moving Tech Grid (Subtle overlay) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* 🎯 Main HUD Container */}
      <div className="relative p-12 flex flex-col items-center max-w-md w-full">
        
        {/* 📐 Cyberpunk Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500/40 rounded-tl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/40 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500/40 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500/40 rounded-br" />

        {/* ⚡ High-Intensity Backlight Glow */}
        <div className="absolute w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* 🔄 Advanced Interlocking Spinner */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          
          {/* Outer Ring (Counter-Clockwise) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/20 border-t-purple-400 border-b-violet-400"
          />

          {/* Inner Ring (Clockwise & Faster) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-fuchsia-500 border-l-purple-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
          />

          {/* Core Power Icon */}
          <motion.div
            animate={{ scale: [0.92, 1.05, 0.92] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] z-10"
          >
            <svg 
              className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
        </div>

        {/* ── Text Layout ── */}
        <div className="text-center w-full space-y-4">
          <div className="space-y-1">
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white font-black text-2xl tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Loading Sandbox
            </motion.h2>
            
            <p className="text-purple-400/50 text-[9px] font-mono tracking-[4px] uppercase block">
              INITIALIZING SECURE PROTOCOLS
            </p>
          </div>

          {/* 📊 Sleek Tech Progress Bar */}
          <div className="w-40 h-[3px] bg-purple-950/60 rounded-full mx-auto overflow-hidden relative border border-purple-900/30">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_8px_#f59e0b]"
            />
          </div>
          
          {/* Real-time Status Code */}
          <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-white/30 tracking-wider">
            <span className="w-1 h-1 rounded-full bg-fuchsia-500 animate-ping" />
            <span>PORT_CONNECT // OK</span>
          </div>
        </div>

      </div>

      {/* 📐 Decorative Technical Peripheral Sub-text */}
      <div className="absolute bottom-6 left-8 text-white/10 font-mono text-[9px] tracking-[3px] uppercase hidden md:block">
        SYS.LOC // BD_2026
      </div>
      <div className="absolute bottom-6 right-8 text-white/10 font-mono text-[9px] tracking-[3px] uppercase hidden md:block">
        SECURE_LINK // ACTIVE
      </div>
    </div>
  );
}