import Details from '@/components/Details';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { notFound } from 'next/navigation'; // Optional, for clean 404 handling

const DetailsPage = async ({ params }) => {


 const { token } = await auth.api.getToken({
  headers: await headers()
});

  const { id } = await params;
  
  // 1. Added cache: 'no-store' for authenticated requests
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}all-classes/${id}`, {
    cache: 'no-store', 
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  // 2. Added basic error handling
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      return <div>Unauthorized access. Please log in.</div>;
    }
    return <div>Failed to load class details.</div>;
  }

  const cls = await res.json();

  if (!cls || cls.length === 0) {
    return notFound(); // Triggers your Next.js 404 page if no class is found
  }

  return (
    <div className='py-10'>
      <Details cls={cls[0]} />
    </div>
  );
};

export default DetailsPage;