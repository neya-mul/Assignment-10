'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiActivity } from 'react-icons/fi';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* 🔮 Cyberpunk Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            {/* 📡 Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10 space-y-8">
                
                {/* 🛑 Animated 404 Core Glitch */}
                <div className="relative inline-block">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-purple-600 to-indigo-900 select-none filter drop-shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                    >
                        404
                    </motion.h1>
                    
                    {/* Floating Pulse Line */}
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_#a855f7]"
                    />
                </div>

                {/* 📟 Error Transmission Text */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-3"
                >
                    <h2 className="text-xl font-bold uppercase tracking-[.2em] text-purple-400 flex items-center justify-center gap-2">
                        <FiActivity className="animate-pulse" /> Signal Lost / Grid Outage
                    </h2>
                    <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
                        You have wandered outside the secure sector of <span className="text-white font-semibold">Fitness Cafe</span>. The coordinates you transmitted do not exist in our mainframe.
                    </p>
                </motion.div>

                {/* 🎮 Navigation Actions Matrix */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    {/* Back Button */}
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-purple-500/20 bg-[#0e0b1f]/40 backdrop-blur-md text-white/70 hover:text-white hover:border-purple-500/50 transition-all text-xs font-bold uppercase tracking-wider"
                    >
                        <FiArrowLeft size={14} />
                        Go Back
                    </button>

                    {/* Home Button */}
                    <Link 
                        href="/" 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_25px_rgba(123,92,240,0.2)] hover:shadow-[0_0_35px_rgba(123,92,240,0.4)] transition-all text-xs font-bold uppercase tracking-wider hover:brightness-110"
                    >
                        <FiHome size={14} />
                        Return to Base
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}