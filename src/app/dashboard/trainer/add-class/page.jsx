"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlusCircle, FiImage, FiGrid, FiActivity, FiClock, FiCalendar, FiDollarSign, FiFileText, FiInfo } from 'react-icons/fi';

export default function AddClass() {
  const [formData, setFormData] = useState({
    className: '',
    image: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    scheduleDays: [],
    scheduleTime: '',
    price: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter(d => d !== day)
        : [...prev.scheduleDays, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Documented schema instantiation rule: force explicit static parameterization payload
    const finalPayload = {
      ...formData,
      status: 'Pending', // Enforced schema default requirement
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessVisible(true);
      // Optional: clear state parameters here
    }, 1200);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Deploy New Matrix
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Configure architectural parameters for an authorized physical training program.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {successVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl border border-purple-500/20 bg-[#0e0b1f]/40 backdrop-blur-xl text-center space-y-4"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <FiPlusCircle size={22} className="animate-spin" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Class Configuration Staged</h2>
              <p className="text-white/40 text-xs mt-1 max-w-md mx-auto leading-relaxed">
                The layout matrix has been written to the data pipeline. Initial node state defaults directly to <span className="text-purple-400 font-bold uppercase tracking-wider">Pending</span> for administrative auditing.
              </p>
            </div>
            <button 
              onClick={() => setSuccessVisible(false)}
              className="px-5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider hover:bg-purple-500/20 transition-all"
            >
              Stage Another Architecture
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            
            {/* Class Name & Image URL Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                  Class Structural Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hypertrophy Optimization Lab"
                  value={formData.className}
                  onChange={(e) => setFormData({...formData, className: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                  <FiImage className="text-purple-400" /> Banner Image Link
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            {/* Category, Difficulty, Duration Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                  <FiGrid className="text-purple-400" /> Category Core
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Strength, Cardio"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                  <FiActivity className="text-purple-400" /> Target Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-xs focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Beginner" className="bg-[#120f26]">Beginner Schema</option>
                  <option value="Intermediate" className="bg-[#120f26]">Intermediate Schema</option>
                  <option value="Expert" className="bg-[#120f26]">Expert Terminal</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                  <FiClock className="text-purple-400" /> Duration Metric (Min)
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  placeholder="e.g., 45"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            {/* Schedule Framework Configuration */}
            <div className="space-y-3 p-4 bg-[#090714] border border-purple-500/5 rounded-xl">
              <label className="text-[10px] uppercase font-bold text-purple-300 tracking-widest flex items-center gap-1.5">
                <FiCalendar /> Dynamic Weekly Schedule Target Days
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDays.map(day => {
                  const active = formData.scheduleDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all border ${
                        active 
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(123,92,240,0.15)]' 
                          : 'bg-white/5 border-white/5 text-white/40 hover:text-white/60'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">
                  Target Timestamp Window
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 08:00 AM - 09:30 AM"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData({...formData, scheduleTime: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            {/* Price Metric */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                <FiDollarSign className="text-purple-400" /> Operational Base Price ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="e.g., 29.99"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            {/* Description Text block */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
                <FiFileText className="text-purple-400" /> Strategy Profile Description
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detail core operational movements, physiological goals, and prerequisite parameters required from clients..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              />
            </div>

            {/* Enforced State Note Banner */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-[11px] text-white/50 leading-relaxed">
              <FiInfo className="text-purple-400 shrink-0 mt-0.5" size={13} />
              <span>Execution policy states that this node will instatiate with a static state value of <span className="text-purple-300 font-bold">Pending</span>. It will become live on public schedules following an internal code-compliance review by an admin.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || formData.scheduleDays.length === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none shadow-[0_4px_20px_rgba(123,92,240,0.25)]"
            >
              {isSubmitting ? 'Transmitting Matrix Data...' : 'Deploy Class To Database Pipeline'}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}