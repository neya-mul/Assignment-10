'use client';

import { useSession } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FiThumbsUp, FiThumbsDown, FiMessageSquare, FiTrash2, FiEdit3, FiSend, FiX, FiCheck, FiCornerDownRight } from 'react-icons/fi';

export default function ForumDetailsPage({ forum }) {
    const { data: session } = useSession();
    const user = session?.user;

    const [likes, setLikes] = useState(forum?.likes || []);
    const [dislikes, setDislikes] = useState(forum?.dislikes || []);
    const [comments, setComments] = useState(forum?.comments || []);
    
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [replyText, setReplyText] = useState('');

    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    const isLikedByMe = user?.id ? likes.includes(user.id) : false;
    const isDislikedByMe = user?.id ? dislikes.includes(user.id) : false;

    const likeButton = async () => {
        if (!user?.id) return alert("Please log in to like this post!");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/toggle-like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await res.json();
            if (res.ok) {
                setLikes(data.updatedLikes);
                if (data.updatedDislikes) setDislikes(data.updatedDislikes);
            }
        } catch (error) { console.error(error); }
    };

    const dislikeButton = async () => {
        if (!user?.id) return alert("Please log in to dislike this post!");
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
        } catch (error) { console.error(error); }
    };

    const commentBox = async (e) => {
        e.preventDefault();
        if (!user?.id) return alert("Please log in to leave a comment!");

        const formData = new FormData(e.target);
        const text = formData.get("comment");
        if (!text.trim()) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, userName: user.name || "Anonymous", text }),
            });
            const data = await res.json();
            if (res.ok) {
                setComments(data.updatedComments);
                e.target.reset();
            }
        } catch (error) { console.error(error); }
    };

    const handlePostReply = async (commentId) => {
        if (!user?.id) return alert("Please log in to reply!");
        if (!replyText.trim()) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment/${commentId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, userName: user.name || "Anonymous", text: replyText }),
            });
            const data = await res.json();
            if (res.ok) {
                setComments(data.updatedComments);
                setReplyingCommentId(null);
                setReplyText('');
            }
        } catch (error) { console.error("Error replying:", error); }
    };

    const handleSaveEdit = async (commentId) => {
        if (!editText.trim()) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment/${commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, text: editText })
            });
            const data = await res.json();
            if (res.ok) {
                setComments(data.updatedComments);
                setEditingCommentId(null);
                setEditText('');
            }
        } catch (error) { console.error(error); }
    };

    const handleDeleteComment = async (commentId) => {
        if (!confirm("Delete this comment permanently?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment/${commentId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id })
            });
            const data = await res.json();
            if (res.ok) setComments(data.updatedComments);
        } catch (error) { console.error(error); }
    };

    const handleSaveReplyEdit = async (commentId, replyId) => {
        if (!editReplyText.trim()) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment/${commentId}/reply/${replyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, text: editReplyText })
            });
            const data = await res.json();
            if (res.ok) {
                setComments(data.updatedComments);
                setEditingReplyId(null);
                setEditReplyText('');
            }
        } catch (error) { console.error("Error updating reply:", error); }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        if (!confirm("Delete this reply permanently?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${forum?._id}/comment/${commentId}/reply/${replyId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id })
            });
            const data = await res.json();
            if (res.ok) setComments(data.updatedComments);
        } catch (error) { console.error("Error deleting reply:", error); }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white py-30 px-4 sm:px-6 lg:px-8 relative">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                {/* ── Main Forum Post Block ── */}
                <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
                            {forum?.category || "Community"}
                        </span>
                        <span className="text-xs text-white/30 font-mono">Posted by {forum?.userName || "Anonymous"}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-white uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
                        {forum?.title}
                    </h1>

                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">{forum?.description}</p>

                    <div className="flex items-center gap-4 pt-4 border-t border-purple-500/5">
                        <button onClick={likeButton} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm ${isLikedByMe ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-purple-500/5 border-purple-500/10 text-white/60'}`}>
                            <FiThumbsUp size={16} /><span className="font-bold">{likes.length}</span>
                        </button>
                        <button onClick={dislikeButton} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm ${isDislikedByMe ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-purple-500/5 border-purple-500/10 text-white/60'}`}>
                            <FiThumbsDown size={16} /><span className="font-bold">{dislikes.length}</span>
                        </button>
                    </div>
                </div>

                {/* ── Comments Matrix ── */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                        <FiMessageSquare /> Comments ({comments.length})
                    </h3>

                    <form onSubmit={commentBox} className="flex items-center gap-3 bg-[#0e0b1f]/40 p-2 rounded-2xl border border-purple-500/10">
                        <input type="text" name="comment" placeholder={user ? "Join the architecture discussion..." : "Log in to type a comment..."} disabled={!user} className="flex-1 bg-transparent border-0 outline-none text-sm text-white px-3 placeholder:text-white/20" />
                        <button type="submit" disabled={!user} className="p-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40"><FiSend size={14} /></button>
                    </form>

                    <div className="space-y-6">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="space-y-3">
                                    
                                    {/* ── Parent Comment ── */}
                                    <div className="bg-[#0e0b1f]/30 border border-purple-500/5 rounded-2xl p-4 flex gap-3 transition-all hover:border-purple-500/10">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 shrink-0 flex items-center justify-center text-xs font-bold text-purple-400">
                                            {comment.userName?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h5 className="text-xs font-bold text-white/80">{comment.userName}</h5>
                                                <span className="text-[10px] text-white/20 font-mono">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just Now"}</span>
                                            </div>

                                            {editingCommentId === comment._id ? (
                                                <div className="flex items-center gap-2 pt-1">
                                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1 bg-white/5 border border-purple-500/30 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none" />
                                                    <button onClick={() => handleSaveEdit(comment._id)} className="p-2 rounded-lg bg-green-500/20 text-green-400"><FiCheck size={14} /></button>
                                                    <button onClick={() => { setEditingCommentId(null); setEditText(''); }} className="p-2 rounded-lg bg-red-500/20 text-red-400"><FiX size={14} /></button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-white/60">{comment.text}</p>
                                            )}

                                            <div className="flex items-center gap-4 pt-2 text-[11px] text-white/30 font-semibold">
                                                {user && (
                                                    <button onClick={() => { setReplyingCommentId(replyingCommentId === comment._id ? null : comment._id); setReplyText(''); }} className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                                                        <FiCornerDownRight size={11} /> Reply
                                                    </button>
                                                )}
                                                {user && comment.userId === user.id && editingCommentId !== comment._id && (
                                                    <>
                                                        <button onClick={() => { setEditingCommentId(comment._id); setEditText(comment.text); }} className="flex items-center gap-1 hover:text-purple-400"><FiEdit3 size={11} /> Edit</button>
                                                        <button onClick={() => handleDeleteComment(comment._id)} className="flex items-center gap-1 hover:text-red-400"><FiTrash2 size={11} /> Delete</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inline Reply Input Box */}
                                    {replyingCommentId === comment._id && (
                                        <div className="ml-10 flex items-center gap-2 bg-[#0e0b1f]/60 p-1.5 rounded-xl border border-purple-500/20">
                                            <input type="text" placeholder={`Reply to ${comment.userName}...`} value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1 bg-transparent border-0 outline-none text-xs text-white px-3" />
                                            <button onClick={() => handlePostReply(comment._id)} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"><FiSend size={10} /> Send</button>
                                        </div>
                                    )}

                                    {/* ── Nested Replies Rendering with Edit/Delete Core Logic ── */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="ml-10 space-y-2 border-l-2 border-purple-500/10 pl-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply._id} className="bg-[#0e0b1f]/15 border border-purple-500/5 rounded-xl p-3 flex gap-2.5">
                                                    <div className="w-6 h-6 rounded-full bg-purple-500/5 border border-purple-500/10 shrink-0 flex items-center justify-center text-[10px] font-bold text-purple-400/70">
                                                        {reply.userName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 space-y-0.5">
                                                        <div className="flex items-center justify-between">
                                                            <h6 className="text-[11px] font-bold text-white/70">{reply.userName}</h6>
                                                            <span className="text-[9px] text-white/20 font-mono">{reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : "Just Now"}</span>
                                                        </div>

                                                        {/* 📝 🆕 Reply Edit Condition Render */}
                                                        {editingReplyId === reply._id ? (
                                                            <div className="flex items-center gap-2 pt-1">
                                                                <input type="text" value={editReplyText} onChange={(e) => setEditReplyText(e.target.value)} className="flex-1 bg-white/5 border border-purple-500/20 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500" />
                                                                <button onClick={() => handleSaveReplyEdit(comment._id, reply._id)} className="p-1.5 rounded-md bg-green-500/20 text-green-400"><FiCheck size={12} /></button>
                                                                <button onClick={() => { setEditingReplyId(null); setEditReplyText(''); }} className="p-1.5 rounded-md bg-red-500/20 text-red-400"><FiX size={12} /></button>
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-white/50">{reply.text}</p>
                                                        )}

                                                        {/* 🔒 🆕 Security Validation: ওনারশিপ ম্যাচ করলে তবেই অ্যাকশন ট্র্যাকার দেখাবে */}
                                                        {user && reply.userId === user.id && editingReplyId !== reply._id && (
                                                            <div className="flex items-center gap-3 pt-1 text-[10px] text-white/20 font-semibold">
                                                                <button onClick={() => { setEditingReplyId(reply._id); setEditReplyText(reply.text); }} className="hover:text-purple-400 transition-colors flex items-center gap-0.5">
                                                                    <FiEdit3 size={10} /> Edit
                                                                </button>
                                                                <button onClick={() => handleDeleteReply(comment._id, reply._id)} className="hover:text-red-400 transition-colors flex items-center gap-0.5">
                                                                    <FiTrash2 size={10} /> Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 border border-dashed border-purple-500/5 rounded-2xl text-white/20 text-xs tracking-wider">NO SIGNALS TRANSMITTED YET.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}