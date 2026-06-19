"use client"

import React, { useState } from 'react';
import { FiCalendar, FiUser, FiArrowRight, FiSliders, FiClock } from 'react-icons/fi';

export default function BookedClasses() {
  // Mock data representing classes the user has registered and paid for
  const [bookedClasses] = useState([
    {
      id: 'bk-102',
      className: 'Elite Powerlifting Max',
      trainerName: 'Marcus Aurelius',
      schedule: 'Mon / Wed / Fri',
      timeSlot: '06:00 AM - 07:30 AM',
      paymentStatus: 'Paid via Stripe',
    },
    {
      id: 'bk-205',
      className: 'Hypertrophy Conditioning',
      trainerName: 'Arnold S.',
      schedule: 'Tue / Thu',
      timeSlot: '04:00 PM - 05:30 PM',
      paymentStatus: 'Paid via Stripe',
    },
    {
      id: 'bk-409',
      className: 'Tactical Agility & HIIT',
      trainerName: 'Bruce Wayne',
      schedule: 'Saturday Only',
      timeSlot: '11:00 PM - 12:30 AM',
      paymentStatus: 'Paid via Stripe',
    },
  ]);

  const handleViewDetails = (classId) => {
    // Integrate routing or modal toggle details logic here
    alert(`Accessing parameters, stream assets, and locker assignments for Class ID: ${classId}`);
  };

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
              {bookedClasses.map((item) => (
                <tr key={item.id} className="hover:bg-purple-500/5 transition-colors group">
                  {/* Class Name */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white/90 group-hover:text-purple-300 transition-colors">
                      {item.className}
                    </div>
                    <span className="text-[10px] text-white/20 font-mono tracking-wider block mt-0.5">ID: {item.id}</span>
                  </td>

                  {/* Trainer Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-white/70">
                      <FiUser className="text-purple-400 shrink-0" size={14} />
                      <span className="font-medium">{item.trainerName}</span>
                    </div>
                  </td>

                  {/* Schedule Details */}
                  <td className="py-4 px-6">
                    <div className="space-y-0.5">
                      <div className="text-white/80 font-medium text-xs flex items-center gap-1.5">
                        <FiCalendar className="text-purple-400/60" size={12} />
                        {item.schedule}
                      </div>
                      <div className="text-white/40 text-xs font-mono flex items-center gap-1.5">
                        <FiClock className="text-purple-400/40" size={12} />
                        {item.timeSlot}
                      </div>
                    </div>
                  </td>

                  {/* Verified Settlement */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ● {item.paymentStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleViewDetails(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent transition-all text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Details</span>
                      <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}