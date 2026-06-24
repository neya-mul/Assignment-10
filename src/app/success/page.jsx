'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'

export default function Success() {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center py-16 px-4 relative overflow-hidden">

      {/* Background Radial Gradient matching your Details page */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0e0b1f]/80 backdrop-blur border border-purple-500/20 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(109,40,217,0.15)]"
        >
          {/* Green Badge matching your UI theme */}
          <div className="w-16 h-16 bg-green-400/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/25 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
            <FiCheckCircle size={28} />
          </div>

          <p className="text-purple-400 text-[10px] font-semibold uppercase tracking-[4px] mb-1">
            Transaction Confirmed
          </p>

          <h1
            className="text-white font-extrabold text-3xl mb-4 tracking-wide uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: ".05em" }}
          >
            Payment Successful!
          </h1>

          {/* Info Description Box */}
          <div className="bg-[#050816] border border-purple-500/10 rounded-xl p-4 text-left text-xs text-white/50 mb-6 leading-relaxed">
            Your slot has been registered. The class dashboard has been synced with your account credentials and your reservation is permanent.
          </div>

          {/* Interactive Action Button using your details gradient */}
          <Link href={`/dashboard/${user?.role}`}>
            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs tracking-wide uppercase rounded-xl shadow-[0_0_24px_rgba(123,92,240,0.35)] hover:shadow-[0_0_32px_rgba(123,92,240,0.55)] hover:scale-[1.01] transition-all duration-200"
            >
              Go to your Dashboard <FiArrowRight size={13} />
            </button></Link>
        </motion.div>

      </div>
    </div>
  )
}