import React from 'react';
import Link from 'next/link';
import { FiClock, FiBarChart2, FiUser, FiArrowRight } from 'react-icons/fi';

export default function FeatureCard({ c }) {
  const difficultyColor =
    c.difficulty === 'Beginner'     ? 'text-green-400 bg-green-400/10 border-green-400/25' :
    c.difficulty === 'Intermediate' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' :
                                      'text-red-400 bg-red-400/10 border-red-400/25';

  return (
    <div className="group relative bg-[#0e0b1f]/60 backdrop-blur border border-purple-500/15 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(109,40,217,0.18)] hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {c.image ? (
          <img
            src={c.image}
            alt={c.className}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-purple-500/10 flex items-center justify-center">
            <span className="text-purple-400/40 text-sm">No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b1f] via-[#0e0b1f]/20 to-transparent" />

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
            {c.category}
          </span>
        </div>

        {/* Difficulty pill */}
        <div className="absolute top-3 right-3">
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${difficultyColor}`}>
            <FiBarChart2 size={9} />
            {c.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-white font-bold text-[15px] leading-snug mb-2 group-hover:text-purple-200 transition-colors duration-200">
          {c.className}
        </h3>

        <p className="text-white/40 text-[12px] leading-relaxed line-clamp-2 mb-4">
          {c.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
            <FiClock size={11} className="text-purple-400/60" />
            {c.duration} min
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
            <FiUser size={11} className="text-purple-400/60" />
            {c.trainerName}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-wider">Fee</p>
            <p className="text-white font-black text-lg leading-none mt-0.5">
              ৳ {c.price}
            </p>
          </div>

          <Link
            href={`/details/${c._id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-[11px] tracking-wide uppercase hover:shadow-[0_0_18px_rgba(123,92,240,0.5)] hover:scale-[1.03] transition-all duration-200"
          >
            Details <FiArrowRight size={11} />
          </Link>
        </div>

      </div>
    </div>
  );
}