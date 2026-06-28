import React from 'react'
import { FiCheckCircle, FiArrowRight, FiHash } from 'react-icons/fi'
import Link from 'next/link'
import { stripe } from '@/lib/stripe';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;
  

  let transactionId = "N/A";
  let metadata = {};
  let userRole = "member"; 

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      transactionId = session.payment_intent || session.id; 
      metadata = session.metadata;

      if (metadata && transactionId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}my-booked-classes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            classId: metadata.classId,
            className: metadata.className,
            scheduleTime: metadata.scheduleTime,
            trainerName: metadata.trainerName,
            trainerId: metadata.trainerId,
            price: parseFloat(metadata.price),
            userEmail: metadata.userEmail,
            userName: metadata.userName,
            userId: metadata.userId,
            transactionId: transactionId 
          })
        });
        
        userRole = metadata.userId ? "member" : "member"; 
      }
      
      
    } catch (err) {
      console.error("Stripe verification or DB sync failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,#1e0b3a_0%,#050816_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-[#0e0b1f]/80 backdrop-blur border border-purple-500/20 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(109,40,217,0.15)]">
          
          <div className="w-16 h-16 bg-green-400/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/25 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
            <FiCheckCircle size={28} />
          </div>

          <p className="text-purple-400 text-[10px] font-semibold uppercase tracking-[4px] mb-1">
            Transaction Confirmed
          </p>

          <h1
            className="text-white font-extrabold text-3xl mb-2 tracking-wide uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: ".05em" }}
          >
            Payment Successful!
          </h1>

          {/*  Displaying the dynamic Transaction ID */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] font-mono text-purple-300">
            <FiHash size={12} /> TXN: {transactionId}
          </div>

          <div className="bg-[#050816] border border-purple-500/10 rounded-xl p-4 text-left text-xs text-white/50 mb-6 space-y-2">
            <p className="text-white/80 font-semibold text-center border-b border-purple-500/5 pb-1.5 uppercase tracking-wider">
              {metadata.className || "Class Registered"}
            </p>
            <p>Your slot has been registered successfully. The class dashboard has been synced with your credentials and your reservation is permanent.</p>
          </div>

          <Link href={`/dashboard/${userRole}`}>
            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-xs tracking-wide uppercase rounded-xl shadow-[0_0_24px_rgba(123,92,240,0.35)] hover:shadow-[0_0_32px_rgba(123,92,240,0.55)] hover:scale-[1.01] transition-all duration-200"
            >
              Go to your Dashboard <FiArrowRight size={13} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}