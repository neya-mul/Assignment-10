"use client"

import React from 'react';
import { FiCreditCard, FiArrowUpRight, FiSearch } from 'react-icons/fi';

export default function Transactions() {
  const transactions = [
    { id: 'ch_3Mv1b2LkdIwXm1r20aXyz9', email: 'arnold@bodybuilding.com', amount: '$180.00', date: '2026-06-18 14:32' },
    { id: 'ch_3Mv5f9LkdIwXm1r20oPqw4', email: 'john.doe@gmail.com', amount: '$45.00', date: '2026-06-17 09:11' },
    { id: 'ch_3Mv9x1LkdIwXm1r20zLmn2', email: 'serena@vibeandflow.com', amount: '$210.00', date: '2026-06-15 18:55' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>Platform Ledger</h1>
          <p className="text-white/40 text-sm mt-1">Read-only structural transaction histories captured from Stripe processing pipelines.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Stripe Live Gateway</div>
      </div>

      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Stripe Transaction ID</th>
                <th className="py-4 px-6">Account Holder Email</th>
                <th className="py-4 px-6">Timestamp UTC</th>
                <th className="py-4 px-6 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm font-mono">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-purple-500/5 transition-colors group">
                  <td className="py-4 px-6 text-purple-400 font-semibold text-xs select-all">{t.id}</td>
                  <td className="py-4 px-6 text-white/80 font-sans tracking-wide text-xs">{t.email}</td>
                  <td className="py-4 px-6 text-white/40 text-xs">{t.date}</td>
                  <td className="py-4 px-6 text-right text-emerald-400 font-bold tracking-tight text-sm">
                    <span className="inline-flex items-center gap-1">{t.amount} <FiArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}