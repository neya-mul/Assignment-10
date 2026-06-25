"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiCheck, FiX, FiMessageSquare, FiBriefcase, FiAward, FiClock } from 'react-icons/fi';

export default function AppliedTrainers() {
  // Mock State - Easily swap with dynamic fetch operations & server actions later
  const [applicants, setApplicants] = useState([
    {
      id: 'app_1',
      name: 'Marcus Aurelius',
      email: 'marcus@gladiatorfit.com',
      experience: '8 Years Competitive Bodybuilding & Strength Conditioning',
      specialty: 'Hypertrophy, Powerlifting & Contest Prep',
      availableTime: 'Mon - Fri (6:00 AM - 12:00 PM)',
    },
    {
      id: 'app_2',
      name: 'Serena Williams',
      email: 'serena@vibeandflow.com',
      experience: '5 Years Certified Yoga & Pilates Practitioner',
      specialty: 'Flexibility Mobility, Mindfulness, and Core Alignment',
      availableTime: 'Tue - Thu - Sat (4:00 PM - 9:00 PM)',
    },
    {
      id: 'app_3',
      name: 'Bruce Wayne',
      email: 'bruce@gothamdefense.com',
      experience: '12 Years Martial Arts, Calisthenics, Tactical Endurance Training',
      specialty: 'High-Intensity Interval Training (HIIT) & Functional Agility',
      availableTime: 'Everyday (11:00 PM - 4:00 AM)',
    }
  ]);

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  // Action: Approve Applicant (Role upgrades to Trainer)
  const handleApprove = (id, name) => {
    setApplicants(prev => prev.filter(app => app.id !== id));
    setSelectedApplicant(null);
    setFeedback('');
    triggerToast(`Application Approved: ${name} is now upgraded to Trainer.`);
  };

  // Action: Reject Applicant (Status demoted, feedback recorded)
  const handleReject = (id, name) => {
    // Log submission data block simulation
    toast(`Rejected ${name}. Internal Application Feedback Saved: "${feedback}"`);
    
    setApplicants(prev => prev.filter(app => app.id !== id));
    setSelectedApplicant(null);
    setFeedback('');
    triggerToast(`Application Rejected. Feedback sent securely to ${name}.`);
  };

  return (
    <div className="space-y-6 relative">

      {/* Dynamic Action Success Notification Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-purple-500/30 bg-[#0e0b1f]/90 backdrop-blur-xl shadow-2xl text-purple-300 text-sm font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Header Section */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 
          className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Pending Applications
        </h1>
        <p className="text-white/40 text-sm mt-1">Review credentials, screen background profiles, and authorize system rank upgrades.</p>
      </div>

      {/* Candidates Registry Table Frame */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Applicant Profile</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Submission Status</th>
                <th className="py-4 px-6 text-right">Verification Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
              {applicants.length > 0 ? (
                applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-purple-500/5 transition-colors duration-150">
                    <td className="py-4 px-6 font-semibold text-white/90">{app.name}</td>
                    <td className="py-4 px-6 text-white/50 font-mono text-xs">{app.email}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400 animate-pulse">
                        Pending Review
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                      >
                        <FiEye size={13} />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-white/30 text-sm font-semibold tracking-wide">
                    All trainer application pipelines are fully processed.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- APPLICANT AUDIT MODAL DIALOG --- */}
      <AnimatePresence>
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedApplicant(null); setFeedback(''); }}
              className="absolute inset-0 bg-[#06040a]/80 backdrop-blur-md" 
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#0e0b1f] border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(123,92,240,0.15)] overflow-hidden text-white"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-purple-500/10 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">{selectedApplicant.name}</h3>
                  <p className="text-xs text-purple-400 font-mono mt-0.5">{selectedApplicant.email}</p>
                </div>
                <button 
                  onClick={() => { setSelectedApplicant(null); setFeedback(''); }}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Application Details Body Grid */}
              <div className="space-y-4 mb-6 text-sm">
                
                {/* Specialty */}
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/40">
                    <FiAward className="text-purple-400" size={12} /> Target Specialty Focus
                  </span>
                  <p className="text-white/80 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 font-medium">
                    {selectedApplicant.specialty}
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/40">
                    <FiBriefcase className="text-purple-400" size={12} /> Work & Track Experience
                  </span>
                  <p className="text-white/80 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 font-medium">
                    {selectedApplicant.experience}
                  </p>
                </div>

                {/* Time Availability */}
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/40">
                    <FiClock className="text-purple-400" size={12} /> Routine Availability Windows
                  </span>
                  <p className="text-white/80 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 font-medium">
                    {selectedApplicant.availableTime}
                  </p>
                </div>

                {/* Feedback Input Field */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="feedbackInput" className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/40">
                    <FiMessageSquare className="text-purple-400" size={12} /> Review Assessment Feedback (Required on rejection)
                  </label>
                  <textarea
                    id="feedbackInput"
                    rows={3}
                    placeholder="Provide specific optimization notes, credential missing parameters, or next steps context..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons Matrix */}
              <div className="grid grid-cols-2 gap-4 border-t border-purple-500/10 pt-4">
                
                {/* Reject Control button */}
                <button
                  onClick={() => handleReject(selectedApplicant.id, selectedApplicant.name)}
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <FiX size={14} />
                  Reject & Save
                </button>

                {/* Approve Control button */}
                <button
                  onClick={() => handleApprove(selectedApplicant.id, selectedApplicant.name)}
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_15px_rgba(123,92,240,0.3)] text-xs font-bold uppercase tracking-wider transition-all hover:brightness-110"
                >
                  <FiCheck size={14} />
                  Approve Promotion
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}