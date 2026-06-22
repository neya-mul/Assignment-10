
import ForumPostCard from '@/components/ForumPostCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiClock, FiLayers, FiMessageSquare } from 'react-icons/fi';

export default async function MyForumPosts() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts`)
  const posts = await res.json()
  // console.log(posts);
  
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Your Published Articles
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Review, evaluate, or wipe community domain data blocks attributed to your coach authentication profile.
        </p>
      </div>

      {/* Grid Component Node Render Array */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {
          posts.map((post, ind)=>{
           return  <ForumPostCard post={post} key={ind}></ForumPostCard>
          })
        }
      

      </div>
    </div>
  );
}