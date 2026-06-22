// import ClassCard from '@/components/ClassCard';
// import ClassCard from '@/components/ClassCard';
import FeatureCard from '@/components/FeatureCard';
import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from 'react-icons/fi';

export default async function FeatureClasses() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}all-classes`)
    const cls = await res.json()
    console.log(cls[0], 'from new ');

    return (
           <section className="bg-[#050816] py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
 
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,#1e0b3a_0%,transparent_70%)] pointer-events-none" />
 
      <div className="relative z-10 max-w-7xl mx-auto">
 
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="uppercase tracking-[5px] text-purple-400 text-[11px] font-semibold mb-3">
              What We Offer
            </p>
            <h2
              className="text-white font-extrabold leading-[0.92] tracking-tight"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl">FEATURED</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                CLASSES
              </span>
            </h2>
          </div>
 
          <Link
            href="/all-classess"
            className="flex items-center gap-2 text-purple-400 hover:text-white text-[12px] font-bold tracking-[.09em] uppercase border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 px-5 py-2.5 rounded-xl transition-all duration-200 self-start sm:self-auto flex-shrink-0"
          >
            View All <FiArrowRight size={13} />
          </Link>
        </div>
 
        {/* Grid */}
        {cls?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cls.slice(0, 6).map((c) => (
              <FeatureCard key={c._id} c={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/30 text-sm">
            No classes available right now.
          </div>
        )}
 
      </div>
    </section>

    )
}
