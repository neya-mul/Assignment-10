"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * WelcomeNotification
 *
 * Implements the signature Google Play Games login "Welcome back" animation:
 * 1. Drops from the top as a compressed pill.
 * 2. Horizontally stretches / expands into full width with spring physics upon landing.
 * 3. Text smoothly reveals during the expansion.
 * 4. Stays for ~3.5 seconds.
 * 5. Contracts horizontally and glides smoothly straight back up off the top upon exit.
 *
 * Styled with the transparent Banner dark-violet glassmorphic aesthetics.
 *
 * @param {Object} props
 * @param {string} props.userName - Display name of the authenticated user.
 * @param {() => void} props.onClose - Callback triggered when dismissed or timer finishes.
 * @param {number} [props.duration=3500] - Duration in ms before auto-dismissing.
 */
export default function WelcomeNotification({
  userName,
  onClose,
  duration = 3500,
}) {
  const shouldReduceMotion = useReducedMotion();

  // Auto-dismiss timer
  useEffect(() => {
    if (!duration || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const displayName = userName?.trim() || "Member";

  // Google Games signature pill spring physics
  const pillVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0, y: 0 }
      : {
          opacity: 0,
          y: -75,
          scaleX: 0.55,
          scaleY: 0.85,
        },
    animate: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      transition: shouldReduceMotion
        ? { duration: 0.2 }
        : {
            type: "spring",
            stiffness: 420,
            damping: 24,
            mass: 0.85,
          },
    },
    exit: shouldReduceMotion
      ? { opacity: 0, transition: { duration: 0.2 } }
      : {
          opacity: 0,
          y: -75,
          scaleX: 0.55,
          scaleY: 0.85,
          transition: {
            duration: 0.35,
            ease: [0.32, 0.72, 0, 1],
          },
        },
  };

  // Staggered text unroll effect inside the expanding pill
  const textVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.92 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.1,
        duration: 0.25,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <div
      className="fixed top-4 sm:top-5 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <motion.div
        variants={pillVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ originY: 0 }}
        className="pointer-events-auto relative inline-flex items-center justify-center max-w-[92vw] select-none"
      >
        {/* Ambient violet glow matching the Banner background */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-600/35 via-purple-500/30 to-violet-600/35 blur-md opacity-80 pointer-events-none" />

        {/* Thin transparent Banner-themed pill */}
        <div className="relative flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#050816]/80 backdrop-blur-xl border border-purple-500/35 shadow-[0_10px_35px_rgba(5,8,22,0.85),0_0_24px_rgba(124,58,237,0.28)]">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />

          {/* Smoothly revealed message */}
          <motion.p
            variants={textVariants}
            className="text-xs sm:text-sm font-medium text-white/95 tracking-wide text-center truncate"
          >
            Welcome back,{" "}
            <span className="font-bold bg-gradient-to-r from-violet-300 via-purple-200 to-white bg-clip-text text-transparent">
              {displayName}
            </span>{" "}
            
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
