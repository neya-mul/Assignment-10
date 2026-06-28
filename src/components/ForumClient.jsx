'use client';

import ForumPostCard from '@/components/ForumPostCard';
import React, { useState, useMemo } from 'react';
import { FiSearch, FiLayers } from 'react-icons/fi';

const PAGE_SIZE = 9;

// ── Pagination ────────────────────────────────────────────────────
const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const base = 'min-w-[36px] h-9 px-3 rounded-lg text-xs font-mono uppercase tracking-widest border transition-all duration-200';

  return (
    <div className="flex flex-col items-center gap-3 pt-10 pb-4">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`${base} border-purple-500/20 text-white/50 hover:border-purple-500/50 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed`}
        >
          ← Prev
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`dot-${i}`} className="text-white/20 font-mono px-1 select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${base} ${
                p === page
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_14px_rgba(147,51,234,0.4)]'
                  : 'border-purple-500/20 text-white/50 hover:border-purple-500/50 hover:text-white/80'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`${base} border-purple-500/20 text-white/50 hover:border-purple-500/50 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed`}
        >
          Next →
        </button>
      </div>
      <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase">
        Page {page} of {totalPages}
      </p>
    </div>
  );
};

// ── Main Client Component ─────────────────────────────────────────
export default function ForumsClient({ initialForums }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filter by search — useMemo keeps it cheap
  const filtered = useMemo(() => {
    if (!search.trim()) return initialForums;
    const q = search.trim().toLowerCase();
    return initialForums.filter(
      (post) =>
        post.title?.toLowerCase().includes(q) ||
        post.content?.toLowerCase().includes(q) ||
        post.author?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q)
    );
  }, [search, initialForums]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // always reset to page 1 when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 pt-20">

      {/* Header */}
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

          {/* Live search */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search posts…"
              className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition"
            />
            {search && (
              <button
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        {search && (
          <p className="text-center text-white/25 text-[10px] font-mono tracking-widest uppercase mt-4">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{search}&quot;
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post, ind) => (
                <ForumPostCard post={post} key={post._id || post.id || ind} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/5 max-w-md mx-auto mt-8">
            <FiLayers className="mx-auto text-3xl text-white/20 mb-3" />
            <h3 className="text-sm font-semibold text-white/80">
              {search ? 'No posts matched' : 'No transmissions found'}
            </h3>
            <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
              {search
                ? 'Try different keywords or clear the search.'
                : 'The community forum wire is currently clear. Check back shortly for staff updates.'}
            </p>
            {search && (
              <button
                onClick={handleClear}
                className="mt-5 px-5 py-2 rounded-full border border-purple-500/25 text-purple-400 text-xs font-mono uppercase tracking-widest hover:border-purple-500/50 transition"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}