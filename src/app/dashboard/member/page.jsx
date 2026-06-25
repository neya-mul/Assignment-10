"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiHeart, FiUser, FiMail, FiShield, FiAlertTriangle, FiCheckCircle, FiClock, FiCornerDownRight } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function MemberOverview() {
  const [favorites, setFavorites] = useState([]);

  const { data: session } = useSession();
  const user = session?.user;

  const [totalClasses, setTotalClasses] = useState([]);

  useEffect(() => {
    const classes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}my-booked-classes/${user?.email}`
        );

        const data = await res.json();

        setTotalClasses(data);
      } catch (err) {
        console.error(err);
      }
    };

    classes();
  }, [user?.email]);

  // console.log(typeof totalClasses);

  useEffect(() => {
    if (!user?.id) return;

    const favouriteFunction = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}favourites/${user?.id}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to load favorites stream:", err);
      }
    };
    favouriteFunction();
  }, [user?.id]); // Optimized dependency array to look at ID directly

  // Mock states reflecting the specified target parameters
  const [stats] = useState({
    totalFavorites: 12,
  });

  const [trainerApplication] = useState({
    status: 'rejected', // Change to 'pending', 'approved', or 'rejected' to test layout states
    adminFeedback: 'The profile credentials submitted lack verifiable NASM or ACE structural tracking metrics. Please amend certifications and re-transmit profile parameters.',
  });

  // Safely extract initials dynamically
  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Account Overview
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Monitor your terminal fitness analytics, profile parameters, and credential status fields.
        </p>
      </div>

      {/* Visual Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-violet-600/10 rounded-full blur-xl group-hover:bg-violet-600/20 transition-all" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Total Booked Classes</span>
            <span className="text-3xl font-black text-white font-mono tracking-tight">{totalClasses.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <FiCalendar size={20} />
          </div>
        </div>

        <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-pink-600/10 rounded-full blur-xl group-hover:bg-pink-600/20 transition-all" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Total Favorites</span>
            <span className="text-3xl font-black text-white font-mono tracking-tight">{favorites.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
            <FiHeart size={20} />
          </div>
        </div>
      </div>

      {/* Profile Metrics Console Area */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-300">Identity Profile Settings</h2>
          <p className="text-white/30 text-xs mt-0.5">Core account parameters verified across security schemas.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-purple-500/5">
          {/* Main User Block */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 bg-purple-500/10 text-purple-300 flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(123,92,240,0.2)] overflow-hidden shrink-0">
              {user?.image ? (
                <img src={user.image} alt="Avatar Frame" className="w-full h-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">{user?.name || "Stryder Account"}</h3>
                {/* Fixed Role Badge (User) */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-violet-500/10 text-purple-300 border border-purple-500/20">
                  <FiShield size={10} /> User
                </span>
              </div>
              <div className="text-xs text-white/50 flex items-center gap-1.5">
                <FiMail size={12} className="text-purple-400/60" /> {user?.email || "unknown@domain.com"}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Trainer Pipeline tracking box */}
        <div className="bg-[#090714] border border-purple-500/5 rounded-xl p-4 md:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Trainer Pipeline Tracker</span>
              <span className="text-xs text-white/70 font-medium">Verification sequence status</span>
            </div>

            {/* Conditional pipeline flag renderer */}
            <div>
              {trainerApplication.status === 'pending' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <FiClock size={11} /> Pending Approval
                </span>
              )}
              {trainerApplication.status === 'rejected' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                  <FiAlertTriangle size={11} /> Application Denied
                </span>
              )}
              {trainerApplication.status === 'approved' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiCheckCircle size={11} /> Approved
                </span>
              )}
            </div>
          </div>

          {/* Render admin feedback contextual warning card only when system state is rejected */}
          {trainerApplication.status === 'rejected' && trainerApplication.adminFeedback && (
            <div className="mt-3 bg-red-500/5 border border-red-500/10 rounded-xl p-4 space-y-2">
              <div className="text-[10px] uppercase font-extrabold text-red-400 tracking-wider flex items-center gap-1">
                <FiCornerDownRight size={12} /> Administrative Auditor Feedback
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-sans pl-4 border-l border-red-500/20">
                "{trainerApplication.adminFeedback}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}