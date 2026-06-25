"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiTrash2, FiUser, FiInfo, FiChevronRight } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function FavoriteClasses() {
  // Initial array tracking favorite classes marked by the user
  const [favorites, setFavorites] = useState([]);
  const {data:session} = useSession()
  const user = session?.user
  // console.log(user);
  


  useEffect(() => {
    const favouriteFunction = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}favourites/${user?.id}`)
      const data = await res.json()
      setFavorites(data)
    }
    favouriteFunction()
  }, [user?.email])


  console.log(favorites);
  
  const [toastMessage, setToastMessage] = useState('');

  const handleRemoveFavorite = (id, className) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
    setToastMessage(`Removed "${className}" from favorites array.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Dynamic Activity Toast Alerts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-purple-500/30 bg-[#0e0b1f] backdrop-blur-xl shadow-2xl text-purple-300 text-sm font-semibold tracking-wide"
          >
            <FiInfo size={16} className="text-purple-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Favorite Programs
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Manage your bookmark array of preferred training architectures.
        </p>
      </div>

      {/* Favorites Stream Container */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {favorites.length > 0 ? (
            favorites.map((item,ind) => (
              <motion.div
                layout
                key={ind}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-500/20 transition-all group"
              >
                {/* Information Layout Left */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      {item.discipline}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono tracking-wider">REF: {item.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {item.className}
                  </h3>

                  <div className="text-xs text-white/50 flex items-center gap-1.5">
                    <FiUser size={13} className="text-purple-400/60" />
                    <span>Lead Coach: <span className="text-white/70 font-semibold">{item.trainerName}</span></span>
                  </div>
                </div>

                {/* Operations Layer Right */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleRemoveFavorite(item.id, item.className)}
                    className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all group/btn"
                    title="Remove Bookmark"
                  >
                    <FiTrash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            /* Layout Fallback Fallback State Frame */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center border border-dashed border-purple-500/10 rounded-2xl bg-white/5 space-y-3"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-purple-500/5 text-white/20 flex items-center justify-center">
                <FiHeart size={18} />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold text-white/20">
                Your bookmarks array is currently clean.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}