"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiUsers, FiX, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

export default function MyClasses() {
  // Mock tracking array state matching target dashboard specification context
  const [classes, setClasses] = useState([
    { id: 'CLS-101', className: 'Tactical Striking Core', category: 'Combat', status: 'Pending', price: 45.00, attendees: [{ name: 'Alex Mercer', email: 'alex@mercer.io' }, { name: 'Sarah Connor', email: 's.connor@cyber.net' }] },
    { id: 'CLS-204', className: 'Olympic Clean Technique', category: 'Weights', status: 'Approved', price: 60.00, attendees: [{ name: 'Tony Stark', email: 'tony@stark.com' }] },
    { id: 'CLS-409', className: 'Vinyasa Structural Flow', category: 'Yoga', status: 'Approved', price: 30.00, attendees: [] }
  ]);

  const [activeModal, setActiveModal] = useState(null); // null, 'edit', 'students'
  const [selectedClass, setSelectedClass] = useState(null);
  const [editName, setEditName] = useState('');

  const handleDeleteTrigger = (id, title) => {
    const confirmation = window.confirm(`CRITICAL SECURITY ACTION:\nAre you sure you want to permanently delete "${title}" (${id}) from active rosters?`);
    if (confirmation) {
      setClasses(prev => prev.filter(c => c.id !== id));
    }
  };

  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setEditName(cls.className);
    setActiveModal('edit');
  };

  const openStudentsModal = (cls) => {
    setSelectedClass(cls);
    setActiveModal('students');
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setClasses(prev => prev.map(c => c.id === selectedClass.id ? { ...c, className: editName } : c));
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Managed Classes
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Audit, modify structural parameters, or read localized participant logs across deployed instances.
        </p>
      </div>

      {/* Main Responsive Layout Table Wrapper */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-white/[0.02]">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Class Context</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Pipeline Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Financial Tier</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-xs">
              {classes.map(cls => (
                <tr key={cls.id} className="hover:bg-white/[0.01] transition-all">
                  <td className="p-4 space-y-0.5">
                    <div className="text-white font-bold tracking-wide">{cls.className}</div>
                    <div className="text-[10px] text-white/30 font-mono">{cls.category} • {cls.id}</div>
                  </td>
                  <td className="p-4">
                    {cls.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/10">
                        <FiClock size={10} /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                        <FiCheckCircle size={10} /> Live
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold text-white/70">${cls.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openStudentsModal(cls)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/30 text-purple-300 font-bold text-[10px] uppercase tracking-wider transition-all"
                      >
                        <FiUsers size={12} /> ({cls.attendees.length}) Students
                      </button>
                      <button 
                        onClick={() => openEditModal(cls)}
                        className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 text-white/60 hover:text-white transition-all"
                        title="Update Field Matrix"
                      >
                        <FiEdit2 size={12} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTrigger(cls.id, cls.className)}
                        className="p-2 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white text-red-400 transition-all"
                        title="Wipe Node Instance"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Contextual Modals Portals Wrapper */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#0e0b1f] border border-purple-500/20 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-purple-500/10 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-300">
                  {activeModal === 'edit' ? 'Update Instance Matrix' : 'Registered Attendees'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="text-white/40 hover:text-white">
                  <FiX size={16} />
                </button>
              </div>

              {/* Branch Render Model: Edit Field Parameters */}
              {activeModal === 'edit' && (
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Class Identity String</label>
                    <input 
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-purple-500 transition-all">
                    Commit Schema Edits
                  </button>
                </form>
              )}

              {/* Branch Render Model: Read Student Object Buffers */}
              {activeModal === 'students' && (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedClass?.attendees.length > 0 ? (
                    selectedClass.attendees.map((student, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                        <div className="text-xs font-bold text-white tracking-wide">{student.name}</div>
                        <div className="text-[10px] text-white/40 font-mono">{student.email}</div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-white/30 text-[11px] uppercase tracking-wider font-bold border border-dashed border-white/5 rounded-xl">
                      Zero Client Bookings Logged.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}