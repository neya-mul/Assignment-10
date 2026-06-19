"use client";

import Image from "next/image";
import Link from "next/link";
import boy from "../../public/boy.png";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function AshParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    function spawnParticle(random = false) {
      const W = canvas.width;
      const H = canvas.height;
      const size = Math.random() * 2.5 + 0.5;
      const roll = Math.random();
      const color =
        roll > 0.65 ? `rgba(196,181,253,` :
        roll > 0.35 ? `rgba(167,139,250,` :
                      `rgba(255,255,255,`;
      return {
        x: Math.random() * W,
        y: random ? Math.random() * H : H + 10,
        size,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: -(Math.random() * 0.6 + 0.18),
        opacity: Math.random() * 0.8 + 0.1,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.038 + 0.008,
        color,
      };
    }

    const COUNT = 120;
    let particles = Array.from({ length: COUNT }, () => spawnParticle(true));

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.phase += p.phaseSpeed;
        const flicker = Math.sin(p.phase) * 0.28;
        const alpha = Math.max(0, Math.min(1, p.opacity + flicker));
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0,   `${p.color}${alpha})`);
        grd.addColorStop(0.4, `${p.color}${alpha * 0.45})`);
        grd.addColorStop(1,   `${p.color}0)`);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.speedX + Math.sin(p.phase * 0.5) * 0.38;
        p.y += p.speedY;
        if (p.y < H * 0.2) p.opacity -= 0.005;
        if (p.y < -15 || p.opacity <= 0 || p.x < -15 || p.x > W + 15)
          particles[i] = spawnParticle(false);
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

const Banner = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">

      {/* Dark base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_60%_50%,#1e0b3a_0%,#050816_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/effects.png')] bg-center bg-cover bg-no-repeat opacity-35 pointer-events-none" />

      {/* ── MOBILE layout: stacked, image on bottom ── */}
      {/* ── DESKTOP layout: side by side ── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row ">

        {/* ── LEFT TEXT — takes 50% on desktop ── */}
        <div className="
          flex-1 flex flex-col justify-center
          px-6 sm:px-10 lg:pl-16 xl:pl-24
          pt-24 pb-4 lg:py-0
          items-center lg:items-start
          text-center lg:text-left
          z-20 
          
        ">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[5px] text-purple-400 mb-3 text-[10px] sm:text-[11px] font-semibold"
          >
            FITNESS CAFE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold text-white leading-[0.9] tracking-tight"
          >
            {/* 
              Font scale strategy:
              mobile  → 2.2rem  (35px) — doesn't overwhelm the small image below
              sm      → 3rem    (48px)
              md      → 3.5rem  (56px)
              lg      → 3.2rem  (51px) — side-by-side, image is big so balance
              xl      → 4rem    (64px)
              2xl     → 4.75rem (76px)
            */}
            <span className="block text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[3.8rem] 2xl:text-[4.5rem]">
              BUILT TODAY.
            </span>
            <span className="block text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[3.8rem] 2xl:text-[4.5rem]">
              UNSTOPPABLE
            </span>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="block text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[3.8rem] 2xl:text-[4.5rem] bg-gradient-to-r from-violet-400 via-purple-300 to-violet-200 bg-clip-text text-transparent"
            >
              TOMORROW.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-4 sm:mt-5 text-white/40 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-sm lg:max-w-[360px] leading-relaxed"
          >
            Transform your body, boost your confidence, and unlock your full
            potential with expert coaching and customized workout plans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-7 w-full sm:w-auto"
          >
            <Link
              href="/classes"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs sm:text-sm tracking-wide text-center hover:shadow-[0_0_28px_rgba(123,92,240,0.6)] hover:scale-[1.03] transition-all duration-300"
            >
              Start Your Journey →
            </Link>
            <Link
              href="/classes"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-purple-500/40 text-white/65 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white transition-all duration-300 text-xs sm:text-sm font-semibold text-center"
            >
              Explore Programs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex gap-5 sm:gap-8 mt-6 sm:mt-8"
          >
            {[
              { value: "50K+", label: "Transformations" },
              { value: "250+", label: "Coaches" },
              { value: "98%",  label: "Success Rate" },
            ].map(({ value, label }) => (
              <div key={label}>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-black bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                  {value}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-white/35 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT IMAGE — takes 50% on desktop, full width on mobile ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="
          
            relative flex-1
            flex items-end justify-center
            w-full
            h-[55vw] sm:h-[420px] md:h-[500px] lg:h-screen
          "
        >
          {/* Wide outer halo */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[90%] pointer-events-none z-0 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse 70% 85% at 50% 95%, #7c3aed 0%, #5b21b6 28%, #3b0764 58%, transparent 78%)',
              opacity: 0.7,
            }}
          />

          {/* Bright core at feet */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[45%] pointer-events-none z-0 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 50% 100%, #8b5cf6 0%, #6d28d9 42%, transparent 75%)',
              opacity: 0.85,
            }}
          />

          {/* Ash oval — fills the right half */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[92%] rounded-t-full overflow-hidden pointer-events-none z-10">
            <AshParticles />
          </div>

          {/* Ground line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[2px] bg-gradient-to-r from-transparent via-violet-400/90 to-transparent z-20 pointer-events-none blur-[1px]" />

          {/* 
            Boy image:
            On mobile it fills ~80% of the column width.
            On desktop it fills most of the right half — 
            using h-[90%] + w-auto so it scales with the column height, 
            always touching the ground.
          */}
          <Image
            src={boy}
            alt="Fitness Hero"
            priority
            className="
              relative z-20
              w-[78%] sm:w-[72%] md:w-[68%] lg:w-auto
              lg:h-[88%] xl:h-[92%]
              max-w-none
              object-contain object-bottom
              select-none pointer-events-none
              drop-shadow-[0_0_60px_rgba(124,58,237,0.65)]
            "
          />

        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none z-30" />
    </section>
  );
};

export default Banner;