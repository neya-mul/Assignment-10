'use client';

import ClassCard from '@/components/ClassCard';
import React, { useState, useEffect } from 'react';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates', 'Boxing', 'Dance', 'Other'];

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/';
    const cleanUrl = baseUrl.endsWith('/') ? `${baseUrl}all-classes` : `${baseUrl}/all-classes`;

    fetch(cleanUrl, { next: { revalidate: 60 } })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setClasses(data);
        setFiltered(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Single filter function — uses cls.className (matches ClassCard exactly)
  const applyFilters = (searchVal, categoryVal, source) => {
    let result = [...source];

    if (categoryVal !== 'All') {
      result = result.filter(
        (cls) => cls.difficulty?.toLowerCase() === categoryVal.toLowerCase()
      );
    }

    if (searchVal.trim()) {
      const q = searchVal.trim().toLowerCase();
      result = result.filter(
        (cls) =>
          cls.className?.toLowerCase().includes(q) ||
          cls.description?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    applyFilters(val, category, classes);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    applyFilters(search, cat, classes);
  };

  const handleClear = () => {
    setSearch('');
    setCategory('All');
    setFiltered(classes);
  };

  const isFiltering = search.trim() !== '' || category !== 'All';

  return (
    <div className="min-h-screen bg-[#05020a] pt-30 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1
            className="text-5xl md:text-6xl font-black tracking-[.15em] bg-gradient-to-r from-white via-purple-100 to-purple-500 bg-clip-text text-transparent uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            Available Training Matrices
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest font-mono max-w-md mx-auto">
            Fetched live via background server pipelines. Ready for interaction.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by class name or description…"
              className="w-full bg-[#0c091f] border border-purple-500/20 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition"
            />
            {search && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white/60 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition ${
                  category === cat
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-transparent border-purple-500/20 text-white/50 hover:border-purple-500/50 hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
            {isFiltering && (
              <button
                onClick={handleClear}
                className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border border-red-500/30 text-red-400/70 hover:border-red-500/60 hover:text-red-400 transition"
              >
                Clear All
              </button>
            )}
          </div>

          {!loading && (
            <p className="text-center text-white/30 text-xs font-mono tracking-widest">
              {isFiltering
                ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`
                : `${classes.length} class${classes.length !== 1 ? 'es' : ''} available`}
            </p>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-gradient-to-b from-[#0c091f] to-[#05020a] border border-purple-500/10 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="py-24 text-center border border-red-500/10 rounded-3xl bg-gradient-to-b from-[#0c091f] to-[#05020a]">
            <p className="text-red-400 text-xs tracking-[0.4em] uppercase mb-4">Connection Error</p>
            <h2 className="text-4xl font-black tracking-wider text-white">PIPELINE FAILURE</h2>
            <p className="mt-4 text-white/40 max-w-lg mx-auto">
              Unable to reach the server. Check your connection and try refreshing.
            </p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cls, ind) => (
              <ClassCard key={cls._id || cls.id || ind} cls={cls} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-purple-500/10 rounded-3xl bg-gradient-to-b from-[#0c091f] to-[#05020a]">
            <p className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-4">
              {isFiltering ? 'No Matches' : 'System Status'}
            </p>
            <h2 className="text-4xl font-black tracking-wider text-white">
              {isFiltering ? 'NO RESULTS FOUND' : 'NO APPROVED CLASSES'}
            </h2>
            <p className="mt-4 text-white/40 max-w-lg mx-auto">
              {isFiltering
                ? 'Try adjusting your search or selecting a different category.'
                : 'The training matrix is currently empty. Once instructors publish approved programs, they will appear here automatically.'}
            </p>
            {isFiltering ? (
              <button
                onClick={handleClear}
                className="mt-8 px-6 py-2.5 rounded-full border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest hover:border-purple-500/60 hover:text-purple-300 transition"
              >
                Clear Filters
              </button>
            ) : (
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs text-white/60">Awaiting New Class Deployments</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllClasses;