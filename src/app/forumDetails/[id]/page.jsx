import ForumDetailsPage from '@/components/ForumDetailsPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export default async function ForumDetails({ params }) {
    const { id } = await params;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    // Server-side data fetch
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}forum-posts/${id}`);
    const forumData = await res.json();
    const forum = forumData[0];


    return (
        <ForumDetailsPage forum={forum}></ForumDetailsPage>
    );
}