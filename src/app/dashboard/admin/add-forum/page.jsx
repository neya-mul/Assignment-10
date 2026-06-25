"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiBookOpen, FiImage, FiPlusCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AddForumPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Core Handler: Imgbb Secure REST File Upload Pipeline Integration
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Swap out template string literal with your process.env.NEXT_PUBLIC_IMGBB_API_KEY later
      const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      if (resData.success) {
        setImageUrl(resData.data.url);
      }
    } catch (err) {
      toast.error("Image upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Forum Post dispatch broadcast generated successfully.");
    setTitle(''); setDescription(''); setImageUrl('');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>Publish Forum Article</h1>
        <p className="text-white/40 text-sm mt-1">Broadcast high-grade authority strategy blueprints to the network pipeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5"><FiBookOpen className="text-purple-400" /> Article Head Title</label>
          <input type="text" placeholder="e.g., Tactical Carbohydrate Phasing Matrix" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white/5 border border-white/5 p-4 rounded-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5"><FiImage className="text-purple-400" /> Cover Resource</span>
            <label className="flex flex-col items-center justify-center border border-dashed border-purple-500/30 rounded-xl p-4 cursor-pointer hover:bg-purple-500/5 hover:border-purple-500/50 transition-all text-center">
              <FiUploadCloud size={20} className="text-purple-300 mb-1" />
              <span className="text-[11px] font-semibold text-purple-300">{isUploading ? "Uploading Data Matrix..." : "Upload Cover Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div className="h-24 w-full rounded-lg border border-purple-500/10 bg-[#090714] flex items-center justify-center overflow-hidden">
            {imageUrl ? <img src={imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover" /> : <span className="text-[10px] text-white/20 uppercase tracking-wider">No Cover Processed</span>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1.5">Article Body Context</label>
          <textarea rows={6} placeholder="Inject operational workout mechanics context, nutritional specifications, or community policy updates..." value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all resize-none" />
        </div>

        <button type="submit" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 shadow-[0_4px_20px_rgba(123,92,240,0.25)]"><FiPlusCircle size={15} /> Dispatch Broadcast Post</button>
      </form>
    </div>
  );
}