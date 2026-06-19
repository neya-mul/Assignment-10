"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiImage, FiCpu, FiMessageSquare } from 'react-icons/fi';

export default function AddForumPost() {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setStatusMessage('Syncing binary image package to Imgbb servers...');

    // Mock pipeline execution matching actual integration layout patterns
    setTimeout(() => {
      setStatusMessage('Binary resolution success. Writing entry parameters to forum cluster...');
      setTimeout(() => {
        setIsUploading(false);
        setStatusMessage('Success! Post injected into global community cluster.');
        setTitle('');
        setDescription('');
        setImageFile(null);
        e.target.reset();
        setTimeout(() => setStatusMessage(''), 3000);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Publish Knowledge Block
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Transmit custom research metrics or strategy articles straight onto the open Community Forum stream.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiMessageSquare className="text-purple-400" /> Article Tracking Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Physiological Adaptations of Steady-State Thresholds"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* File Input Mocking dynamic Imgbb structure directly */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiImage className="text-purple-400" /> Graphic Media Capture (Imgbb Processing Node)
          </label>
          <div className="relative group border border-dashed border-purple-500/20 bg-white/5 rounded-xl p-4 transition-all hover:bg-purple-500/5 hover:border-purple-500/40">
            <input
              type="file"
              required
              accept="image/*"
              disabled={isUploading}
              onChange={(e) => setImageFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:pointer-events-none"
            />
            <div className="text-center space-y-1 pointer-events-none">
              <div className="text-xs font-medium text-white/70">
                {imageFile ? `Target Buffered: ${imageFile.name}` : 'Click or drop system image file allocation'}
              </div>
              <div className="text-[10px] text-white/30 font-mono">PNG, JPG formats accepted up to 10MB bounds</div>
            </div>
          </div>
        </div>

        {/* Markdown Description TextArea */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">
            <FiFileText className="text-purple-400" /> Primary Core Description Body
          </label>
          <textarea
            rows={6}
            required
            placeholder="Type your structured article body text here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 transition-all resize-none font-sans leading-relaxed"
          />
        </div>

        {/* Notification Feedback Overlay Engine */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-[11px] font-mono font-semibold tracking-wide text-purple-300"
            >
              <FiCpu className="animate-spin text-purple-400" size={13} />
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Execute Submission Toggle */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none shadow-[0_4px_20px_rgba(123,92,240,0.25)]"
        >
          {isUploading ? 'Compiling Media Pipeline...' : 'Transmit Knowledge Node Data'}
        </button>
      </form>
    </div>
  );
}