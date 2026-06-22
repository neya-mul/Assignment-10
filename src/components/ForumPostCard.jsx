import React from 'react'

export default function ForumPostCard({post}) {
    console.log(post);
    
  return (
    <div>
        <h1 className="text-5xl text-white">{post.title}</h1>
    </div>
  )
}
