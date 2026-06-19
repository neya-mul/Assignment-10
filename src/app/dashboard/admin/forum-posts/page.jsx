"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMessageSquare, FiUser, FiInfo } from 'react-icons/fi';

export default function ForumPostManage() {
  const [posts, setPosts] = useState([
    { id: 'p1', title: 'Ultimate Cutting Secret Protocols', author: 'Mike Tyson', excerpt: 'You need to drop total system caloric thresholds down by 15% immediately...', category: 'Nutrition' },
    { id: 'p2', title: 'Anabolic Sleep Schedules Optimization', author: 'Emma Watson', excerpt: 'Rest cycles dictate total target muscular recovery framework limits...', category: 'Recovery' },
    { id: 'p3', title: 'Click Here For Instant Magic Performance Pills', author: 'SpamAccount99', excerpt: 'Buy unregulated pharmaceuticals fast at this external domain click loop...', category: 'Spam' },
  ]);
  const [toastMessage, setToastMessage] = useState('');

  const handleDeletePost = (id, title) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setToastMessage(`Purged: "${title}" wiped out from active user feeds.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl shadow-2xl text-red-400 text-sm font-semibold tracking-wide">
            <FiInfo size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>Forum Content Moderation</h1>
        <p className="text-white/40 text-sm mt-1">Audit public articles, enforce global safety guidelines, and delete target content anomalies.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <motion.div layout key={post.id} className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-purple-500/20 transition-all">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">{post.category}</span>
                  <span className="text-xs text-white/30 flex items-center gap-1 font-medium"><FiUser size={12} /> Account handle: <span className="text-white/60 font-semibold">{post.author}</span></span>
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">{post.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-normal">{post.excerpt}</p>
              </div>

              <button onClick={() => handleDeletePost(post.id, post.title)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shrink-0 self-end md:self-center"><FiTrash2 size={13} /> Purge Post</button>
            </motion.div>
          ))
        ) : (
          <div className="py-12 text-center text-white/20 border border-dashed border-purple-500/10 rounded-2xl text-xs uppercase tracking-widest font-bold bg-white/5">Global feed logs are clean.</div>
        )}
      </div>
    </div>
  );
}