"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiAlertTriangle, FiX } from 'react-icons/fi';
import ForumPostCard from '@/components/ForumPostCard';

export default function MyForumPostsClient({ initialPosts, baseUrl }) {
  const [posts, setPosts] = useState(initialPosts);
  const [confirmTarget, setConfirmTarget] = useState(null); // post pending deletion
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`${baseUrl}forum-posts/${confirmTarget._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Optimistic removal from local state
        setPosts(prev => prev.filter(p => p._id !== confirmTarget._id));
        triggerToast(`"${confirmTarget.title || 'Post'}" was permanently deleted.`);
      } else {
        triggerToast('Failed to delete post. Please try again.');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during deletion.');
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  return (
    <>
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border border-purple-500/30 bg-[#0e0b1f]/90 backdrop-blur-xl shadow-2xl text-purple-300 text-sm font-semibold tracking-wide pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Post Grid ── */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, ind) => (
            <div key={post._id || post.id || ind} className="relative group flex flex-col">

              {/* Original card — unchanged */}
              <ForumPostCard post={post} />

              {/* Delete button — fades in on hover, sits in bottom-right corner */}
              <button
                onClick={() => setConfirmTarget(post)}
                className="
                  absolute bottom-3 right-3
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                  bg-[#0e0b1f]/90 border border-red-500/30
                  text-red-400 hover:bg-red-500/20 hover:border-red-500/50
                  text-[10px] font-bold uppercase tracking-wider
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 backdrop-blur-sm
                  z-10
                "
              >
                <FiTrash2 size={11} />
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-white/30 text-sm tracking-wide">You haven't written any articles yet.</p>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {confirmTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deleting && setConfirmTarget(null)}
              className="absolute inset-0 bg-[#06040a]/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-sm bg-[#0e0b1f] border border-red-500/25 rounded-2xl p-7 shadow-[0_0_60px_rgba(239,68,68,0.08)] text-white overflow-hidden"
            >
              {/* Subtle red glow top-right */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => !deleting && setConfirmTarget(null)}
                disabled={deleting}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors disabled:opacity-30"
              >
                <FiX size={18} />
              </button>

              {/* Warning icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 mb-5 mx-auto">
                <FiAlertTriangle className="text-red-400" size={20} />
              </div>

              {/* Copy */}
              <h3 className="text-base font-black uppercase tracking-widest text-white text-center mb-2">
                Delete This Post?
              </h3>
              <p className="text-white/45 text-xs text-center leading-relaxed px-2">
                You're about to permanently delete{' '}
                <span className="text-white/75 font-semibold">
                  "{confirmTarget.title || 'this post'}"
                </span>
                . This cannot be undone — it will be wiped from the community forum entirely.
              </p>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-7">
                <button
                  onClick={() => setConfirmTarget(null)}
                  disabled={deleting}
                  className="py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:bg-white/10 hover:text-white/70 text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider              bg-red-500/80 hover:bg-red-500 border border-red-500/40 text-white rounded-lg group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300 ease-in-out"
                >
                  {deleting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    <>
                      <FiTrash2 size={11} />
                      Confirm Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}






