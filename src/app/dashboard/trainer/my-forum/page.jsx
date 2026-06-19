"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiClock, FiLayers, FiMessageSquare } from 'react-icons/fi';

export default function MyForumPosts() {
  // Mock scope data simulating targeted trainer profile query buffers
  const [posts, setPosts] = useState([
    { id: 'POST-801', title: 'The Fallacy of Static Stretching Protocol Profiles', date: '2026-06-18', reads: '241' },
    { id: 'POST-552', title: 'Macro Nutrient Partitioning Framework Implementations', date: '2026-06-12', reads: '519' },
    { id: 'POST-310', title: 'Periodization Strategy Schemas for Elite Competitors', date: '2026-05-30', reads: '112' }
  ]);

  const handleDeletePost = (id, label) => {
    const confirmation = window.confirm(`DESTRUCTIVE SYSTEM INTERACTION ALERT:\nAre you absolutely sure you want to delete the forum article titled:\n"${label}"?\n\nThis completely breaks URL routing structures pointing to this node.`);
    if (confirmation) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Your Published Articles
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Review, evaluate, or wipe community domain data blocks attributed to your coach authentication profile.
        </p>
      </div>

      {/* Grid Component Node Render Array */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {posts.length > 0 ? (
            posts.map(post => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-purple-500/20 transition-all group relative overflow-hidden"
              >
                <div className="space-y-2">
                  {/* Card Metadata Meta */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-purple-400 font-bold tracking-wider uppercase bg-purple-500/5 px-2 py-0.5 rounded-md border border-purple-500/10">
                      <FiLayers size={10} /> {post.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
                      <FiClock size={11} /> {post.date}
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-sm font-bold text-white tracking-wide leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                {/* Operations Base Section Line */}
                <div className="flex items-center justify-between pt-3 border-t border-purple-500/5">
                  <div className="text-[10px] text-white/40 tracking-wider flex items-center gap-1 font-mono">
                    <FiMessageSquare size={11} /> {post.reads} system reads logged
                  </div>
                  
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="p-2 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all group/btn"
                    title="Purge Node Entry"
                  >
                    <FiTrash2 size={13} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            /* Void State Render Template Block */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 py-16 text-center border border-dashed border-purple-500/10 rounded-2xl bg-white/5 space-y-2"
            >
              <div className="text-white/20 text-xs font-bold uppercase tracking-widest">No Forum Deployments Found</div>
              <p className="text-[11px] text-white/30 max-w-xs mx-auto">Your system database index shows zero article entries mapped under this verified profile token.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}