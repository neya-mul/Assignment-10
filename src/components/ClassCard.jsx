'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ClassCard = ({ cls }) => {

  // if(cls.status.toLowerCase() !== 'approved'){
  //   return null
  // }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 0px 25px rgba(168, 85, 247, 0.25)',
      }}
      className="relative group rounded-2xl border border-purple-500/10 bg-[#0c091f]/40 backdrop-blur-xl p-5 overflow-hidden"
    >
      {/* Image */}
      {cls?.image && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={cls.image}
            alt={cls?.className || 'class image'}
            className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition duration-500"
          />
        </div>
      )}

      {/* Glow effect layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent" />

      {/* Top accent line */}
      <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-transparent mb-4" />

      {/* Title */}
      <h2 className="text-lg font-bold text-white tracking-wide uppercase">
        {cls?.className || 'Untitled Class'}
      </h2>

      {/* Description */}
      <p className="text-xs text-white/40 mt-2 leading-relaxed">
        {cls?.description || 'No description available for this training module.'}
      </p>

      {/* Meta info */}
      <div className="mt-5 flex items-center justify-between text-[11px] text-white/30 font-mono uppercase tracking-widest">
        {/* <span>ID: {cls?._id?.slice?.(-6) || cls?.id || 'N/A'}</span> */}
        <span className="text-purple-400/70">
          {cls?.difficulty || 'BEGINNER'}
        </span>
      </div>

      {/* Bottom glow bar */}
      <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </motion.div>
  );
};

export default ClassCard;