import ForumsClient from "@/components/ForumClient";

export default async function AllForums() {
  let forums = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts`, {
      next: { revalidate: 60 },
    });
    if (res.ok) forums = await res.json();
  } catch (_) {}

  return <ForumsClient initialForums={forums} />;
}