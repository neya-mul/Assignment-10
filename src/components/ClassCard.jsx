'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const ClassCard = ({ cls }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0px 0px 30px rgba(168, 85, 247, 0.15)',
      }}
      className="relative group rounded-2xl border border-purple-500/10 bg-[#0c091f]/40 backdrop-blur-xl p-5 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Image */}
        {cls?.image && (
          <div className="mb-4 overflow-hidden rounded-xl relative">
            <img
              src={cls.image}
              alt={cls?.className || 'class image'}
              className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c091f]/80 via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Glow effect layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-600/5 via-transparent to-transparent pointer-events-none" />

        {/* Top accent line */}
        <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-transparent mb-4" />

        {/* Title */}
        <h2 className="text-base font-extrabold text-white tracking-wide uppercase line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
          {cls?.className || 'Untitled Class'}
        </h2>

        {/* Description */}
        <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">
          {cls?.description || 'No description available for this training module.'}
        </p>

        {/* Meta info */}
        <div className="mt-5 flex items-center justify-between text-[11px] text-white/40 font-mono uppercase tracking-widest">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/20 tracking-normal font-sans mb-0.5">Access Fee</span>
            <span className="text-white font-bold font-mono text-sm">${cls?.price || '0.00'}</span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-[9px]">
            {cls?.difficulty || 'BEGINNER'}
          </span>
        </div>
      </div>

      {/* Footer / Dynamic Interactive Action Panel */}
      <div className="mt-5 pt-4 border-t border-purple-500/5 flex items-center justify-end">
        {/* Adjusted route slug pattern cleanly for browser URL resolutions */}
        <Link href={`/details/${cls?.id || cls?._id}`} className="w-full"> 
          <button className="w-full relative group/btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold text-[11px] tracking-widest uppercase cursor-pointer overflow-hidden transition-all duration-300 hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            {/* Slide background effect layer */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-purple-500 scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 -z-10" />
            
            <span>View Matrix Details</span> 
            <FiArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ClassCard;