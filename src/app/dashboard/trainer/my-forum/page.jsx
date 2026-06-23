import ForumPostCard from '@/components/ForumPostCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function MyForumPosts() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;

  // Safeguard if session isn't loaded/found
  if (!user) {
    return <div className="text-white/60 p-6">Please log in to view your posts.</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}my-forum-posts/${user.id}`);
  const posts = await res.json();

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

      {/* Grid Layout Container */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, ind) => (
            <ForumPostCard post={post} key={post._id || post.id || ind} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-white/40 text-sm">You haven't written any articles yet.</p>
        </div>
      )}
    </div>
  );
}