import React from 'react';
import Link from 'next/link';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function ForumPostCard({ post }) {

  // Destructure with robust fallbacks
  const { _id, title, description, image, userName, userEmail, userId } = post

  const targetId = _id || id;



  // Format timestamp safely
  // const formattedDate = createdAt 
  //   ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  //   : 'Recent Release';

  return (
    <article className="group relative flex flex-col justify-between h-[450px] bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 backdrop-blur-md shadow-xl hover:shadow-purple-500/[0.02]">

      {/* 1. Header Media Element */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <img
          src={post?.image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Dark overlay gradient mix */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Subtle top banner accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 2. Core Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Metadata Block */}
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
            <span className="flex items-center gap-1.5 text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
              <FiUser className="text-[10px]" /> {userName ? userName : 'Unknown'}
            </span>
            {/* <span className="flex items-center gap-1">
              <FiClock /> {formattedDate}
            </span> */}
          </div>

          {/* Title - Native Line Clamp */}
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Body Description - Native Line Clamp */}
          <p className="text-sm text-zinc-400/80 font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* 3. Footer Navigation / Action Area */}
        <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-end">
          <Link
            href={`/forumDetails/${_id}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider text-purple-300 uppercase bg-purple-500/10 border border-purple-500/20 rounded-lg group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300 ease-in-out"
          >
            <span>Read More</span>
            <FiArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}