"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiTrash2, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function ManageClasses() {
  const [classes, setClasses] = useState([
    { id: 'c1', title: 'Elite Powerlifting Max', trainer: 'Marcus Aurelius', schedule: 'Mon/Wed/Fri - 6:00 AM', status: 'pending' },
    { id: 'c2', title: 'Hypertrophy Conditioning', trainer: 'Arnold S.', schedule: 'Tue/Thu - 4:00 PM', status: 'approved' },
    { id: 'c3', title: 'Tactical Agility & HIIT', trainer: 'Bruce Wayne', schedule: 'Sat/Sun - 11:00 PM', status: 'pending' },
  ]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleStatus = (id, newStatus) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    showToast(`Class pipeline updated to: ${newStatus.toUpperCase()}`, 'success');
  };

  const handleDelete = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    showToast(`Class entry permanently expunged from system matrix.`, 'danger');
  };

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm font-semibold tracking-wide ${toast.type === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-300'}`}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>Manage Classes</h1>
        <p className="text-white/40 text-sm mt-1">Authorize, defer, or expunge user training schedules.</p>
      </div>

      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Class Program</th>
                <th className="py-4 px-6">Trainer</th>
                <th className="py-4 px-6">Schedule Window</th>
                <th className="py-4 px-6">Status Flag</th>
                <th className="py-4 px-6 text-right">Operations Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
              {classes.map(c => (
                <tr key={c.id} className="hover:bg-purple-500/5 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white/90">{c.title}</td>
                  <td className="py-4 px-6 text-purple-300 font-medium">{c.trainer}</td>
                  <td className="py-4 px-6 text-white/50 text-xs font-mono">{c.schedule}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : c.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {c.status === 'approved' ? <FiCheckCircle size={10} /> : c.status === 'rejected' ? <FiAlertCircle size={10} /> : <FiClock size={10} />}
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {c.status !== 'approved' && (
                        <button onClick={() => handleStatus(c.id, 'approved')} className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Approve Program"><FiCheck size={14} /></button>
                      )}
                      {c.status === 'pending' && (
                        <button onClick={() => handleStatus(c.id, 'rejected')} className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors" title="Reject Program"><FiX size={14} /></button>
                      )}
                      <button onClick={() => handleDelete(c.id)} className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all" title="Delete Permanent Entry"><FiTrash2 size={14} /></button>
                    </div>
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