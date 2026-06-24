'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Success() {
const session = useParams()
console.log(session);


  return (
    <div>Success</div>
  )
}
