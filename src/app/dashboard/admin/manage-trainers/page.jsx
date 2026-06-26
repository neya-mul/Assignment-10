"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUserMinus, FiAlertTriangle, FiX, FiCheckCircle } from 'react-icons/fi';

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [confirmDemoteTarget, setConfirmDemoteTarget] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const getBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000/';
    return url.endsWith('/') ? url : `${url}/`;
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}users`);
        const allUsers = await res.json();
        
        const onlyTrainers = allUsers.filter(user => user.role === 'trainer');
        setTrainers(onlyTrainers);
      } catch (error) {
        console.error("Failed to load trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  const handleDemoteTrainer = async (id, name) => {
    try {
      const res = await fetch(`${getBaseUrl()}users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'member'
        }),
      });

      if (res.ok) {
        setTrainers(prev => prev.filter(t => t._id !== id));
        setConfirmDemoteTarget(null);
        triggerToast(`Privileges revoked: ${name} demoted to standard member status.`);
      } else {
        triggerToast("Failed to demote trainer due to a server error.");
      }
    } catch (error) {
      console.error("Demotion error:", error);
      triggerToast("Network communication fault during demotion.");
    }
  };

  return (
    <div className="space-y-6 relative">

      {/* Action Notification Alert Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/30 bg-[#0e0b1f]/95 backdrop-blur-xl shadow-2xl text-red-400 text-sm font-semibold tracking-wide"
          >
            <FiCheckCircle size={16} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Head Section Title */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 
          className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Manage Certified Trainers
        </h1>
        <p className="text-white/40 text-sm mt-1">Audit active fitness leaders, monitor current schedule footprints, and manage role authority.</p>
      </div>

      {/* Active Rosters Table Frame */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Trainer Profile</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Status Profile</th>
                <th className="py-4 px-6 text-right">System Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
              {trainers.length > 0 ? (
                trainers.map((trainer, ind) => (
                  <tr key={trainer._id || ind} className="hover:bg-purple-500/5 transition-colors duration-150">
                    <td className="py-4 px-6 font-semibold text-white/90">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs uppercase">
                          {(trainer.userName || 'TR').slice(0, 2)}
                        </div>
                        <span>{trainer.name || 'Anonymous'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/50 font-mono text-xs">{trainer.userEmail || trainer.email}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        {trainer.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setConfirmDemoteTarget(trainer)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                      >
                        <FiUserMinus size={13} />
                        Demote to User
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-white/30 text-sm font-semibold tracking-wide">
                    No active certified trainers registered on the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CONFIRMATION DIALOG MODAL --- */}
      <AnimatePresence>
        {confirmDemoteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass backdrop overlay wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDemoteTarget(null)}
              className="absolute inset-0 bg-[#06040a]/80 backdrop-blur-md" 
            />

            {/* Confirmation Container Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0e0b1f] border border-red-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shrink-0">
                  <FiAlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">Confirm Rank Demotion</h3>
                  <p className="text-xs text-white/40 mt-1">You are modifying system authority access rules.</p>
                </div>
                <button 
                  onClick={() => setConfirmDemoteTarget(null)}
                  className="ml-auto text-white/40 hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Warning Context */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6 text-sm text-white/70 leading-relaxed">
                Are you certain you want to revoke <span className="text-red-400 font-bold">{confirmDemoteTarget.userName}</span>'s certified trainer permissions? 
                This will strip their access to schedule updates, class configurations, and dashboard pipelines immediately.
              </div>

              {/* Buttons Actions Matrix Layout */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setConfirmDemoteTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDemoteTrainer(confirmDemoteTarget._id, confirmDemoteTarget.userName)}
                  className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                >
                  Confirm Revocation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}