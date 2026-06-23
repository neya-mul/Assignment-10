import React from 'react';
import Link from 'next/link';
import { FiClock, FiUser } from 'react-icons/fi';

export default function ForumPostCard({ post }) {
  // Gracefully handle missing data fields to prevent crashes
  const {
    _id,
    title = 'Untitled Post',
    image = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800', // fallbacks
    author = { name: 'Trainer / Admin' },
    description = '',
    createdAt
  } = post;

  // Format date if it exists
  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  // Helper to safely truncate the text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="group relative bg-zinc-900/50 border border-purple-500/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col backdrop-blur-sm">
      
      {/* Post Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        
        <div>
          {/* Metadata Meta Tags */}
          <div className="flex items-center gap-4 text-xs text-white/40 mb-2">
            <span className="flex items-center gap-1">
              <FiUser className="text-purple-400" /> {author?.name || 'Staff'}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="text-purple-400" /> {formattedDate}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>

          {/* Truncated Description */}
          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            {truncateText(description, 120)}
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-end">
          <Link 
            href={`/forum/${_id || post.id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider text-purple-300 uppercase bg-purple-500/10 border border-purple-500/20 rounded-md hover:bg-purple-500 hover:text-white transition-all duration-200"
          >
            Read More
          </Link>
        </div>

      </div>
    </div>
  );
}