"use client"

import React, { useEffect, useState } from 'react';
import { FiCreditCard, FiArrowUpRight, FiSearch } from 'react-icons/fi';

export default function Transactions() {

  const [transactions, setTrainsactions] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}booked-classes`)
      const data = await res.json()
      setTrainsactions(data)
    }
    getData()
  }, [])

  console.log(transactions);



  return (
 <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
    <div>
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
        style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
      >
        Platform Ledger
      </h1>

      <p className="text-white/40 text-xs sm:text-sm mt-1">
        Read-only structural transaction histories captured from Stripe
        processing pipelines.
      </p>
    </div>

    <div className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
      Stripe Live Gateway
    </div>
  </div>

  {/* Desktop Table */}
  <div className="hidden lg:block bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
    <table className="w-full">
      <thead>
        <tr className="text-left text-purple-300 uppercase text-xs">
          <th className="py-3 px-6">Transaction ID</th>
          <th className="py-3 px-6">Email</th>
          <th className="py-3 px-6">User</th>
          <th className="py-3 px-6">Class</th>
          <th className="py-3 px-6">Schedule</th>
          <th className="py-3 px-6">Trainer</th>
          <th className="py-3 px-6 text-right">Amount</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-purple-500/5">
        {transactions.map((t) => (
          <tr key={t._id} className="hover:bg-purple-500/5">
            <td className="py-4 px-6 text-purple-400 text-xs">{t.transactionId}</td>
            <td className="py-4 px-6 text-white/80">{t.userEmail}</td>
            <td className="py-4 px-6 text-white/80">{t.userName}</td>
            <td className="py-4 px-6 text-white/80">{t.className}</td>
            <td className="py-4 px-6 text-white/60">{t.scheduleTime}</td>
            <td className="py-4 px-6 text-white/60">{t.trainerName}</td>
            <td className="py-4 px-6 text-right text-emerald-400 font-bold">
              <span className="inline-flex items-center gap-1">
                ${t.price}
                <FiArrowUpRight size={12} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile & Tablet Cards */}
  <div className="grid gap-4 lg:hidden">
    {transactions.map((t) => (
      <div
        key={t._id}
        className="rounded-2xl border border-purple-500/10 bg-[#0e0b1f]/60 backdrop-blur-xl p-5"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-white">{t.className}</h3>
            <p className="text-xs text-purple-400 mt-1">{t.transactionId}</p>
          </div>

          <div className="text-lg font-bold text-emerald-400">
            ${t.price}
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-white/50">User</span>
            <span className="text-white">{t.userName}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-white/50">Email</span>
            <span className="text-white text-right break-all">
              {t.userEmail}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Trainer</span>
            <span className="text-white">{t.trainerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Schedule</span>
            <span className="text-white text-right">
              {t.scheduleTime}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}