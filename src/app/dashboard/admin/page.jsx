"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/lib/auth-client';
import { FiUsers, FiLayers, FiCheckSquare, FiUser, FiMail, FiShield, FiActivity, FiClock } from 'react-icons/fi';

const AdminHomePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Static Metrics - easily swap with server actions / fetch hooks later
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12% this week",
      icon: <FiUsers size={22} className="text-violet-400" />,
    },
    {
      title: "Total Classes",
      value: "42",
      change: "Active schedules",
      icon: <FiLayers size={22} className="text-purple-400" />,
    },
    {
      title: "Total Booked Classes",
      value: "812",
      change: "88% occupancy rate",
      icon: <FiCheckSquare size={22} className="text-fuchsia-400" />,
    }
  ];

  // Dynamically uses session data if available, falls back to static defaults
  const adminProfile = {
    name: user?.name || "Alex Stryder",
    email: user?.email || "admin@stryde.com",
    role: user?.role || "Admin",
    joinedDate: "January 2026",
    avatar: user?.image || null
  };

  const userInitials = adminProfile.name
    ? adminProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'A';

  return (
    <div className="space-y-10">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
        <div>
          <h1 
            className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            System Overview
          </h1>
          <p className="text-white/40 text-sm mt-1">Platform operations and account overview.</p>
        </div>
        <div className="flex items-center gap-2 self-start bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl text-xs font-bold tracking-wider text-purple-300 uppercase">
          <FiActivity className="animate-pulse text-purple-400" size={14} /> System Operational
        </div>
      </div>

      {/* Stats Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-3xl font-black tracking-tight text-white mt-2 group-hover:text-purple-300 transition-colors">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
                {stat.icon}
              </div>
            </div>
            <div className="text-[11px] font-medium text-purple-400/70 mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile Card Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-2xl"
      >
        <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 block">
          Administrator Identity
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          {/* Avatar frame */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-purple-500/30 flex items-center justify-center bg-purple-500/10 shadow-[0_0_20px_rgba(123,92,240,0.15)] overflow-hidden">
              {adminProfile.avatar ? (
                <img src={adminProfile.avatar} alt="Admin profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-purple-300">{userInitials}</span>
              )}
            </div>
            {/* Shield overlay indicator */}
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-violet-600 to-purple-500 p-1.5 rounded-full border-2 border-[#0e0b1f] shadow-lg">
              <FiShield size={12} className="text-white" />
            </div>
          </div>

          {/* Profile Details information */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-3">
              <h3 className="text-2xl font-black tracking-wide text-white">{adminProfile.name}</h3>
              
              {/* Glowing Admin Badge */}
              <span className="inline-block mx-auto sm:mx-0 px-3 py-1 text-[10px] font-extrabold tracking-[0.15em] uppercase rounded-full bg-gradient-to-r from-violet-600/20 to-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(123,92,240,0.2)]">
                {adminProfile.role}
              </span>
            </div>

            {/* Field Rows */}
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <FiMail className="text-purple-400/60" size={14} />
                <span>{adminProfile.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-white/30 pt-1">
                <FiClock className="text-purple-400/40" size={13} />
                <span>System Authorization Root: <span className="text-white/50 font-semibold">{adminProfile.joinedDate}</span></span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default AdminHomePage;