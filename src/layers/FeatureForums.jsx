import ForumPostCard from '@/components/ForumPostCard';
import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export default async function FeatureForums() {
  // Fetch posts with a brief revalidation period to keep landing data snappy
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts`, {
    next: { revalidate: 30 }
  });
  const forum = await res.json();
  
  // Reverse to put the absolute newest posts first
  const recentPosts = [...forum].reverse().slice(0, 3);

  return (
    <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">
              <FiZap className="animate-pulse" /> Intel Wire
            </div>
            <h2 
              className="text-3xl md:text-5xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Our Recent Community Posts
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              Stay ahead of the curve with elite tactics and bulletins released directly by gym staff.
            </p>
          </div>

          {/* View All Button */}
          <Link 
            href="/all-forums" 
            className="group inline-flex items-center gap-2 self-start sm:self-auto text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            <span>Explore All Transmissions</span>
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Core Post Display Grid */}
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, ind) => (
              <ForumPostCard post={post} key={post._id || post.id || ind} />
            ))}
          </div>
        ) : (
          /* Empty State Fallback */
          <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
            <p className="text-zinc-500 text-sm">No recent network broadcasts found.</p>
          </div>
        )}

      </div>
    </section>
  );
}