import ForumPostCard from '@/components/ForumPostCard';
import React from 'react';
import { FiSearch, FiLayers, FiMessageSquare } from 'react-icons/fi';

export default async function AllForums() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts`, {
    next: { revalidate: 60 } // Keeps page fast with static regeneration every 60s
  });
  const forums = await res.json();
  // forums.reverse()

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 pt-20">
      
      {/* Header Container */}
      <div className="relative border-b border-purple-500/10 bg-zinc-900/10 py-10 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.03),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-1.5 block">
              Shared Knowledge Base
            </span>
            <h1 
              className="text-4xl md:text-5xl font-black tracking-[.10em] bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent uppercase" 
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              All Forums
            </h1>
            <p className="text-white/40 text-sm mt-1 max-w-xl">
              Browse training insights, deep-dive articles, and strategy guides published across the platform network.
            </p>
          </div>

          {/* Quick UI Search Indicator */}
          {/* <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input 
              type="text" 
              disabled
              placeholder="Search feed locked..." 
              className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white/40 cursor-not-allowed placeholder-white/20"
            />
          </div> */}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {forums && forums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forums.map((post, ind) => (
              <ForumPostCard post={post} key={post._id || post.id || ind} />
            ))}
          </div>
        ) : (
          /* Empty State if Database is Clean */
          <div className="py-20 text-center border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/5 max-w-md mx-auto mt-8">
            <FiLayers className="mx-auto text-3xl text-white/20 mb-3" />
            <h3 className="text-sm font-semibold text-white/80">No transmissions found</h3>
            <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
              The community forum wire is currently clear. Check back shortly for staff updates.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}