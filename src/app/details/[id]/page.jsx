import Details from '@/components/Details';
import React from 'react'

const DetailsPage = async ({ params }) => {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}all-classes/${id}`);
  const cls = await res.json()

  return (
    <div>
      <Details cls={cls[0]}></Details>
    </div>
  )
}

export default DetailsPage