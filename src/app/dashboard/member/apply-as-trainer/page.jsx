"use client"

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion as motionElement } from 'framer-motion';
import { FiUserCheck, FiBriefcase, FiAward, FiClock, FiSend } from 'react-icons/fi';
import { authClient, useSession } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast'; // ✅ add this
import { getToken } from '@/lib/verifyToken';

export default function ApplyAsTrainer() {
  const [isRequested, setIsRequested] = useState(null)
  const [yearsExperience, setYearsExperience] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [biography, setBiography] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const { data: session } = useSession()
  const user = session?.user
  const role = user?.role


  useEffect(() => {
    const requestCheck = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}apply-as-trainer/${user?.email}`)
      const data = await res.json()
      setIsRequested(data)
    }
    requestCheck()
  }, [user?.email])

  const handleSubmit = async (e) => {
    const token = await getToken()
    console.log(token);

    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      yearsExperience,
      specialty,
      biography,
      userName: user?.name,
      userEmail: user?.email,
      userRole: role,
      status: 'pending'
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}apply-as-trainer`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data?.insertedId) {
        toast.success('Application submitted successfully! 🎉'); // ✅ toast here
        setIsRequested({ status: 'pending' }); // ✅ update UI without reload
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false); // ✅ always reset
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Toaster position="top-right" /> {/* ✅ add this */}

      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Join the Elite Fleet
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Submit your professional coaching metrics to cross-verify your application pipeline.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isRequested?.status === 'pending' ? (
          <motionElement.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0e0b1f]/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
              <FiClock size={22} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-wide text-white">Application Matrix Under Review</h2>
              <p className="text-white/50 text-xs max-w-md mx-auto leading-relaxed">
                Your credentials have been logged under status <span className="text-amber-400 font-bold uppercase tracking-wider">Pending</span>. Platform administrators will audit your domain metrics shortly.
              </p>
            </div>
            <div className="inline-block px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-white/40">
              Reference Token: TRN-PENDING-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </motionElement.div>
        ) : (
          <motionElement.form
            layout
            onSubmit={handleSubmit}
            className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                <FiBriefcase className="text-purple-400" /> Professional Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                placeholder="e.g., 5"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                <FiAward className="text-purple-400" /> Core Coaching Discipline
              </label>
              <div className="relative">
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#120f26] text-white/30">Select absolute focus zone...</option>
                  <option value="Yoga & Mindfulness" className="bg-[#120f26] text-white">Yoga & Flexibility Alignment</option>
                  <option value="Weight Training & Powerlifting" className="bg-[#120f26] text-white">Weight Training & Powerlifting</option>
                  <option value="Cardio & High-Intensity HIIT" className="bg-[#120f26] text-white">Cardio & High-Intensity HIIT</option>
                  <option value="Calisthenics & Gymnastic Agility" className="bg-[#120f26] text-white">Calisthenics & Gymnastic Agility</option>
                  <option value="Combat Athletics & Conditioning" className="bg-[#120f26] text-white">Combat Athletics & Conditioning</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                Professional Bio & Strategy Credentials
              </label>
              <textarea
                rows={5}
                placeholder="Detail your operational background certifications (NASM, ACE, etc.), program style mechanics, or custom workout transformations..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_20px_rgba(123,92,240,0.25)]"
            >
              <FiSend size={14} />
              {isSubmitting ? "Transmitting Profile Metrics..." : "Transmit Application Profile"}
            </button>
          </motionElement.form>
        )}
      </AnimatePresence>
    </div>
  );
}