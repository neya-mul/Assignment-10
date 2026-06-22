"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiClock, FiUser, FiTag, FiBarChart2,
  FiCalendar, FiDollarSign, FiHeart, FiCreditCard,
  FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function Details({ cls }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ── Fix hydration: start everything false, only run checks after mount ──
  const [mounted, setMounted]         = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [isFavorite, setIsFavorite]       = useState(false);
  const [checkingBook, setCheckingBook]   = useState(false);
  const [checkingFav, setCheckingFav]     = useState(false);
  const [favLoading, setFavLoading]       = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user || !cls?._id) return;

    setCheckingBook(true);
    setCheckingFav(true);

    fetch(`/api/bookings/check?classId=${cls._id}&userId=${user.id}`)
      .then(r => r.json())
      .then(d => setAlreadyBooked(!!d.booked))
      .catch(() => {})
      .finally(() => setCheckingBook(false));

    fetch(`/api/favorites/check?classId=${cls._id}&userId=${user.id}`)
      .then(r => r.json())
      .then(d => setIsFavorite(!!d.favorited))
      .catch(() => {})
      .finally(() => setCheckingFav(false));

  }, [mounted, user, cls?._id]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please log in to book a class.");
      router.push("/login");
      return;
    }
    if (alreadyBooked) {
      toast.error("You have already booked this class.");
      return;
    }
    router.push(`/payment/${cls._id}`);
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save favourites.");
      router.push("/login");
      return;
    }
    setFavLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classId: cls._id, userId: user.id }),
        });
        setIsFavorite(false);
        toast.success("Removed from your favourites.");
      } else {
        await fetch(`/api/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classId: cls._id, userId: user.id }),
        });
        setIsFavorite(true);
        toast.success("Successfully added to your favourites!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setFavLoading(false);
    }
  };

  if (!cls) return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center">
      <p className="text-white/40">Class not found.</p>
    </div>
  );

  const badges = [
    { icon: <FiBarChart2 size={13} />, label: "Difficulty", value: cls.difficulty },
    { icon: <FiClock size={13} />,     label: "Duration",   value: `${cls.duration} min` },
    { icon: <FiTag size={13} />,       label: "Category",   value: cls.category },
    { icon: <FiUser size={13} />,      label: "Trainer",    value: cls.trainerName },
    { icon: <FiCalendar size={13} />,  label: "Schedule",   value: cls.scheduleTime },
    { icon: <FiDollarSign size={13} />,label: "Price",      value: `৳ ${cls.price}` },
  ];

  const difficultyColor =
    cls.difficulty === "Beginner"     ? "text-green-400 bg-green-400/10 border-green-400/25" :
    cls.difficulty === "Intermediate" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/25" :
                                        "text-red-400 bg-red-400/10 border-red-400/25";

  // Button disabled state — only after mount to avoid hydration mismatch
  const bookDisabled  = mounted && checkingBook;
  const favDisabled   = mounted && (checkingFav || favLoading);

  return (
    <div className="min-h-screen bg-[#050816] py-16 px-4">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0e0b1f",
            color: "#fff",
            border: "1px solid rgba(123,92,240,0.3)",
            borderRadius: "12px",
          },
        }}
      />

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Hero image ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden border border-purple-500/20 shadow-[0_0_60px_rgba(109,40,217,0.2)] mb-8"
        >
          {cls.image && (
            <img
              src={cls.image}
              alt={cls.className}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-400/15 border border-green-400/30 text-green-400">
              <FiCheckCircle size={11} /> {cls.status}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <p className="text-purple-400 text-[11px] font-semibold uppercase tracking-[4px] mb-1">
              {cls.category}
            </p>
            <h1
              className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: ".05em" }}
            >
              {cls.className}
            </h1>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Description */}
            <div className="bg-[#0e0b1f]/70 backdrop-blur border border-purple-500/15 rounded-2xl p-6">
              <h2 className="text-white font-bold text-base tracking-wide uppercase mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-violet-500 to-purple-400 inline-block" />
                About This Class
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {cls.description || "No description provided."}
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[#0e0b1f]/70 backdrop-blur border border-purple-500/15 rounded-xl p-4"
                >
                  <div className="flex items-center gap-1.5 text-purple-400/70 mb-1.5">
                    {icon}
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
                  </div>
                  <p className={`text-sm font-bold ${label === "Difficulty" ? difficultyColor.split(" ")[0] : "text-white"}`}>
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Difficulty + trainer ID */}
            <div className="bg-[#0e0b1f]/70 backdrop-blur border border-purple-500/15 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-2">Difficulty Level</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${difficultyColor}`}>
                  <FiBarChart2 size={11} /> {cls.difficulty}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Trainer ID</p>
                <p className="text-white/50 text-xs font-mono">{cls.trainerId?.slice(-8)}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-[#0e0b1f]/80 backdrop-blur border border-purple-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(109,40,217,0.12)]">

              {/* Price */}
              <p className="text-white/35 text-[11px] uppercase tracking-wider mb-1">Class Fee</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-white/50 text-lg font-semibold">৳</span>
                <span className="text-white font-black text-4xl leading-none">{cls.price}</span>
              </div>

              {/* Book Now */}
              <button
                onClick={handleBookNow}
                disabled={bookDisabled}
                className={`
                  w-full flex items-center justify-center gap-2
                  py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase
                  transition-all duration-200
                  ${mounted && alreadyBooked
                    ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                    : bookDisabled
                    ? "bg-purple-500/20 text-purple-300/50 cursor-wait"
                    : "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_24px_rgba(123,92,240,0.45)] hover:shadow-[0_0_32px_rgba(123,92,240,0.65)] hover:scale-[1.02]"
                  }
                `}
              >
                {bookDisabled ? (
                  <span className="animate-pulse">Checking...</span>
                ) : mounted && alreadyBooked ? (
                  <><FiCheckCircle size={15} /> Already Booked</>
                ) : (
                  <><FiCreditCard size={15} /> Book Now</>
                )}
              </button>

              {mounted && alreadyBooked && (
                <p className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-white/30">
                  <FiAlertCircle size={11} /> You have already booked this class
                </p>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-purple-500/10" />
                <span className="text-white/20 text-[10px]">OR</span>
                <div className="flex-1 h-px bg-purple-500/10" />
              </div>

              {/* Favourite */}
              <button
                onClick={handleFavorite}
                disabled={favDisabled}
                className={`
                  w-full flex items-center justify-center gap-2
                  py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase
                  border transition-all duration-200
                  ${mounted && isFavorite
                    ? "bg-pink-500/12 border-pink-500/35 text-pink-400 hover:bg-pink-500/20"
                    : favDisabled
                    ? "bg-white/5 border-white/10 text-white/25 cursor-wait"
                    : "bg-white/5 border-purple-500/25 text-white/65 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white hover:scale-[1.02]"
                  }
                `}
              >
                <FiHeart
                  size={15}
                  className={mounted && isFavorite ? "fill-pink-400" : ""}
                />
                {favDisabled
                  ? "Loading..."
                  : mounted && isFavorite
                  ? "Saved to Favourites"
                  : "Add to Favourites"
                }
              </button>
            </div>

            {/* Schedule card */}
            <div className="bg-[#0e0b1f]/70 backdrop-blur border border-purple-500/15 rounded-2xl p-5">
              <h3 className="text-white/40 text-[11px] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FiCalendar size={11} /> Schedule
              </h3>
              <p className="text-white font-semibold text-sm">{cls.scheduleTime || "—"}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {cls.trainerName?.charAt(0) ?? "T"}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{cls.trainerName}</p>
                  <p className="text-white/35 text-[10px]">Your Trainer</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}