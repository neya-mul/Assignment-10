import MyForumPostsClient from '@/components/MyForumPostCline';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function MyForumPosts() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;

  if (!user) {
    return (
      <div className="py-12 text-center text-white/40 text-sm">
        Please log in to view your posts.
      </div>
    );
  }

  // Normalise base URL (ensure trailing slash, once)
  const baseUrl = (process.env.NEXT_PUBLIC_URL || 'http://localhost:5000/').replace(/\/?$/, '/');

  const res = await fetch(`${baseUrl}my-forum-posts/${user.id}`, {
    cache: 'no-store', // always fresh — deletions must reflect immediately
  });
  const posts = await res.json();

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1
          className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Your Published Articles
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Review, evaluate, or remove posts attributed to your trainer profile.
        </p>
      </div>

      {/* ── Client component owns all interactivity ── */}
      <MyForumPostsClient initialPosts={posts} baseUrl={baseUrl} />
    </div>
  );
}