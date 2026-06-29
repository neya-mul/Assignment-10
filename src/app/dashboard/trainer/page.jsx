"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSliders, FiUsers, FiAward, FiMail, FiZap, FiTarget, FiLoader } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function TrainerOverview() {
  const { data: session } = useSession();
  const user = session?.user;

  const [myClasses, setMyClasses] = useState([]);
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);

  const userInitials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) 
    : 'T';

  // Fetch trainer's classes
  useEffect(() => {
    if (!user?.id) return;

    const fetchTrainerClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}my-classes/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setMyClasses(data);
        }
      } catch (error) {
        toast.error("Failed to synchronize deployed training matrices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainerClasses();
  }, [user?.id]);

  // Fetch enrolled student count based on this trainer's class IDs
  useEffect(() => {
    if (!user?.id || myClasses.length === 0) {
      // If classes loaded but empty, stop spinner
      if (!isLoading) setIsLoadingStudents(false);
      return;
    }

    const fetchStudentsEnrolled = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}booked-classes`);
        if (res.ok) {
          const bookings = await res.json();

          // Build a Set of this trainer's class IDs for fast lookup
          const myClassIds = new Set(myClasses.map(cls => cls._id?.toString()));

          // Count unique students enrolled in any of the trainer's classes
          const enrolledStudentEmails = new Set(
            bookings
              .filter(booking => myClassIds.has(booking.classId?.toString()))
              .map(booking => booking.userEmail)
          );

          setStudentsEnrolled(enrolledStudentEmails.size);
        }
      } catch (error) {
        toast.error("Failed to load student enrollment data.");
      } finally {
        setIsLoadingStudents(false);
      }
    };

    fetchStudentsEnrolled();
  }, [myClasses, isLoading, user?.id]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Trainer Console
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Monitor your deployed training matrices, track student enrollment volumes, and view account parameters.
        </p>
      </div>

      {/* Visual Statistics Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Metric Card: Classes Created (Dynamic) */}
        <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-violet-600/10 rounded-full blur-xl group-hover:bg-violet-600/20 transition-all" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Total Classes Deployed</span>
            <span className="text-3xl font-black text-white font-mono tracking-tight flex items-center gap-2">
              {isLoading ? (
                <FiLoader className="animate-spin text-purple-400 text-xl" />
              ) : (
                myClasses.length
              )}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <FiTarget size={20} />
          </div>
        </div>

        {/* Metric Card: Students Enrolled (Now Dynamic) */}
        <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-emerald-600/10 rounded-full blur-xl group-hover:bg-emerald-600/20 transition-all" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Students Enrolled</span>
            <span className="text-3xl font-black text-white font-mono tracking-tight flex items-center gap-2">
              {isLoadingStudents ? (
                <FiLoader className="animate-spin text-emerald-400 text-xl" />
              ) : (
                studentsEnrolled
              )}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <FiUsers size={20} />
          </div>
        </div>
      </div>

      {/* Identity Profile Section — unchanged */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-300">Identity Profile Settings</h2>
          <p className="text-white/30 text-xs mt-0.5">Verified trainer profile data fields mapped to public schedules.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 bg-purple-500/10 text-purple-300 flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(123,92,240,0.2)] overflow-hidden shrink-0">
              {user?.image ? (
                <img src={user.image} alt="Instructor Frame" className="w-full h-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">{user?.name || "Stryder Coach"}</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  <FiAward size={10} /> Trainer
                </span>
              </div>
              <div className="text-xs text-white/50 flex items-center gap-1.5">
                <FiMail size={12} className="text-purple-400/60" /> {user?.email || "coach@fitnesscafe.com"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/40">
            <FiZap className="text-purple-400 animate-pulse" size={12} /> Sync Status: Active Live
          </div>
        </div>
      </div>
    </div>
  );
}