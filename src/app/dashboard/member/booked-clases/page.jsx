"use client"

import React, { useState } from 'react';
import { FiCalendar, FiUser, FiArrowRight, FiSliders, FiClock } from 'react-icons/fi';

export default function BookedClasses() {
  // Mock data representing classes the user has registered and paid for
 

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Your Booked Sessions
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Review, track, and access your active, fully settled training registrations.
        </p>
      </div>

      {/* Main Schedule Ledger */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Class Program</th>
                <th className="py-4 px-6">Assigned Instructor</th>
                <th className="py-4 px-6">Schedule Window</th>
                <th className="py-4 px-6">Verification</th>
                <th className="py-4 px-6 text-right">Action Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}