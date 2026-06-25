import ForumDetailsPage from '@/components/ForumDetailsPage';
import React from 'react';

export default async function ForumDetails({ params }) {
    const { id } = await params;

    // Server-side data fetch
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${id}`);
    const forumData = await res.json();
    const forum = forumData[0];


    return (
        <ForumDetailsPage forum={forum}></ForumDetailsPage>
    );
}