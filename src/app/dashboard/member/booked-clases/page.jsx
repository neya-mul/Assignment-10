import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React from 'react';
import { FiArrowRight, FiClock } from 'react-icons/fi';

export default async function BookedClasses() {


  const { token } = await auth.api.getToken({
    headers: await headers()
  })


  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user

  if (!user?.email) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-white/30 text-sm">
        Please sign in to access your booked ledger.
      </div>
    )
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}my-booked-classes/${user?.email}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const myClass = await res.json()

  



  const emptyState = (
    <p className="py-10 text-center text-white/30 text-xs tracking-wide">
      No active bookings found under{' '}
      <span className="text-purple-400/80 font-mono">{user.email}</span>.
    </p>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Your Booked Sessions
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Review, track, and access your active, fully settled training registrations.
        </p>
      </div>

      {/* ── TABLE VIEW (md+) ── */}
      <div className="hidden md:block bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Class Program</th>
                <th className="py-4 px-6">Assigned Instructor</th>
                <th className="py-4 px-6">Schedule Window</th>
                <th className="py-4 px-6 text-right">Action Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
              {!myClass || myClass.length === 0 ? (
                <tr>
                  <td colSpan={4}>{emptyState}</td>
                </tr>
              ) : (
                myClass.map((item) => (
                  <tr key={item._id} className="text-white/70 hover:bg-white/[0.01] transition-colors group">
                    <td className="py-4 px-6 font-semibold text-white tracking-wide">
                      {item.className}
                    </td>
                    <td className="py-4 px-6 text-purple-300/90 font-medium">
                      {item.trainerName || "Verified Personal Coach"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 bg-white/[0.02] border border-white/5 rounded-md px-2 py-0.5">
                        <FiClock className="text-purple-400/60" size={12} /> {item.scheduleTime}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/details/${item?.classId || item?._id}`}
                        className="shrink-0 text-xs text-purple-400 font-bold tracking-wider uppercase inline-flex items-center gap-1 mt-0.5"
                      >
                        Enter <FiArrowRight size={11} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CARD VIEW (mobile) ── */}
      <div className="md:hidden space-y-3">
        {!myClass || myClass.length === 0 ? (
          emptyState
        ) : (
          myClass.map((item) => (
            <div
              key={item._id}
              className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl px-5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Top row: class name + action */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-white tracking-wide text-sm leading-snug">
                    {item.className}
                  </p>
                  <p className="text-purple-300/90 font-medium text-xs mt-0.5">
                    {item.trainerName || "Verified Personal Coach"}
                  </p>
                </div>
                <Link
                  href={`/details/${item?.classId || item?._id}`}
                  className="shrink-0 text-xs text-purple-400 font-bold tracking-wider uppercase inline-flex items-center gap-1 mt-0.5"
                >
                  Enter <FiArrowRight size={11} />
                </Link>
              </div>

              {/* Bottom row: schedule */}
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40 bg-white/[0.02] border border-white/5 rounded-md px-2 py-0.5">
                <FiClock className="text-purple-400/60" size={11} /> {item.scheduleTime}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}