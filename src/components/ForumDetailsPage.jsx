'use client';

import { useSession } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiTrash2, FiEdit3, FiSend } from 'react-icons/fi';

export default function ForumDetailsPage({ forum }) {
    const { data: session } = useSession();
    const user = session?.user;

    // 🎯 Likes এবং Dislikes স্টেট (ধরে নেওয়া হচ্ছে ব্যাকএন্ডে দুটিই অ্যারে)
    const [likes, setLikes] = useState(forum?.likes || []);
    const [dislikes, setDislikes] = useState(forum?.dislikes || []);
    const comments = forum?.comments || [];

    const isLikedByMe = user?.id ? likes.includes(user.id) : false;
    const isDislikedByMe = user?.id ? dislikes.includes(user.id) : false;

    // ── লাইক টগল ফাংশন (Like & Unlike) ──
    const likeButton = async () => {
        if (!user?.id) {
            alert("Please log in to like this post!");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/toggle-like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });

            const data = await res.json();
            if (res.ok) {
                setLikes(data.updatedLikes);
                // যদি ইউজার ডিসলাইক করে থাকে, তবে লাইক দেওয়ার সময় ডিসলাইক রিমুভ করতে চাইলে ব্যাকএন্ডের সাথে সিঙ্ক করতে পারেন
                if (data.updatedDislikes) setDislikes(data.updatedDislikes);
            }
        } catch (error) {
            console.error("Error toggling like status:", error);
        }
    };

    // ── ডিসলাইক টগল ফাংশন (Dislike & Un-dislike) ──
    const dislikeButton = async () => {
        if (!user?.id) {
            alert("Please log in to dislike this post!");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/toggle-dislike`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });

            const data = await res.json();
            if (res.ok) {
                setDislikes(data.updatedDislikes);
                if (data.updatedLikes) setLikes(data.updatedLikes);
            }
        } catch (error) {
            console.error("Error toggling dislike status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white py-30 px-4 sm:px-6 lg:px-8 relative">
            {/* 🔮 Ambient Background Radial Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">

                {/* ── Main Forum Post Header Block ── */}
                <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
                            {forum?.category || "Community"}
                        </span>
                        <span className="text-xs text-white/30 font-mono">Posted by {forum?.authorName || "Anonymous"}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-white uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
                        {forum?.title}
                    </h1>

                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                        {forum?.description || "No description provided."}
                    </p>

                    {/* 📸 Post Image Layout */}
                    {forum?.image && (
                        <div className="relative w-full rounded-xl overflow-hidden border border-purple-500/10 bg-[#050816] max-h-[450px] shadow-[0_0_30px_rgba(147,51,234,0.05)] group">
                            <img
                                src={forum.image}
                                alt={forum.title || "Forum transmission"}
                                className="w-full h-full max-h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* ── Vote UI Section ── */}
                    <div className="flex items-center gap-4 pt-4 border-t border-purple-500/5">
                        {/* 👍 Dynamic Like/Unlike Button */}
                        <button 
                            onClick={likeButton} 
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm ${
                                isLikedByMe
                                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                    : 'bg-purple-500/5 border-purple-500/10 text-white/60 hover:border-purple-500/30 hover:text-white'
                            }`}
                        >
                            <FiThumbsUp size={16} />
                            <span className="font-bold">{likes.length}</span>
                        </button>

                        {/* 👎 Dynamic Dislike/Un-dislike Button */}
                        <button 
                            onClick={dislikeButton} 
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm ${
                                isDislikedByMe
                                    ? 'bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                                    : 'bg-purple-500/5 border-purple-500/10 text-white/60 hover:border-red-500/30 hover:text-white'
                            }`}
                        >
                            <FiThumbsDown size={16} />
                            <span className="font-bold">{dislikes.length}</span>
                        </button>
                    </div>
                </div>

                {/* ── Comments Feed Layout ── */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                        <FiMessageSquare /> Comments ({comments.length})
                    </h3>

                    {/* Comment Submission Form Box */}
                    <div className="flex items-center gap-3 bg-[#0e0b1f]/40 p-2 rounded-2xl border border-purple-500/10">
                        <input
                            type="text"
                            placeholder="Join the architecture discussion..."
                            className="flex-1 bg-transparent border-0 outline-none text-sm text-white px-3 placeholder:text-white/20"
                        />
                        <button className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-colors">
                            <FiSend size={14} />
                        </button>
                    </div>

                    {/* Loop Render Comments */}
                    <div className="space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={comment._id || index} className="bg-[#0e0b1f]/30 border border-purple-500/5 rounded-2xl p-4 flex gap-3 transition-all hover:border-purple-500/10">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-purple-400">
                                        {comment.userName?.charAt(0).toUpperCase() || "U"}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-xs font-bold text-white/80">{comment.userName || "Anonymous User"}</h5>
                                            <span className="text-[10px] text-white/20 font-mono">
                                                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "00/00/0000"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-white/60">{comment.text}</p>

                                        <div className="flex items-center gap-3 pt-2 text-[11px] text-white/30 font-semibold">
                                            <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                                                <FiEdit3 size={11} /> Edit
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                                <FiTrash2 size={11} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 border border-dashed border-purple-500/5 rounded-2xl text-white/20 text-xs tracking-wider">
                                NO SIGNALS TRANSMITTED YET. FEED IS EMPTY.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}