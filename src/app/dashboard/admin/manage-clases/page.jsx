
// import React, { useState } from 'react';
import AdminClassCard from '@/components/AdminClassCard';
import { AnimatePresence } from 'framer-motion';

export default async function ManageClasses() {
const res = await fetch(
  `${process.env.NEXT_PUBLIC_URL}admin-classes`,
  {
    cache: 'no-store',
  }
);  const classes = await res.json()
  
 

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
       
      </AnimatePresence>

      <div className="border-b border-purple-500/10 pb-6">
        <h1 className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>Manage Classes</h1>
        <p className="text-white/40 text-sm mt-1">Authorize, defer, or expunge user training schedules.</p>
      </div>

      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Class Program</th>
                <th className="py-4 px-6">Trainer</th>
                <th className="py-4 px-6">Schedule Window</th>
                <th className="py-4 px-6">Status Flag</th>
                <th className="py-4 px-6 text-right">Operations Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
             {
              classes.map(c=> <AdminClassCard key={c._id} c={c}></AdminClassCard>)
             }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}