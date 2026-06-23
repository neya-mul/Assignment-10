"use client"

import React, { useState, useEffect } from 'react';
import { FiSearch, FiUserCheck, FiSlash, FiShield } from 'react-icons/fi';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Users on Component Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}users`);
        const allUsers = await res.json();
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 2. Toggle Status Function (Block / Unblock)
  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state instantly if backend succeeds
        setUsers(users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        ));
      } else {
        console.error("Failed to update user status in the database.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // 3. Promote User to Admin Function
  const promoteToAdmin = async (userId, userName) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      if (res.ok) {
        // Update local state instantly if backend succeeds
        setUsers(users.map((user) =>
          user._id === userId ? { ...user, role: 'admin' } : user
        ));
      } else {
        console.error("Failed to promote user to admin in the database.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // 4. Filter criteria for search bar
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      {/* Head Header Segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
        <div>
          <h1
            className="text-4xl font-black tracking-[.12em] bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent uppercase"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            Manage Platform Users
          </h1>
          <p className="text-white/40 text-sm mt-1">Audit permissions, adjust global scope matrix rules, and toggle soft access bans.</p>
        </div>

        {/* Dynamic Search */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/40" size={16} />
          <input
            type="text"
            placeholder="Search credentials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-purple-500/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
      </div>

      {/* ── APPROACH: Adaptive Screen Layout Switcher ── */}

      {/* 1. Mobile & Tablet Card Layout Feed (Visible below md viewport break) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-5 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Identity & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {user.name?.slice(0, 2) || '?'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white/90 truncate text-sm">{user.name}</h3>
                    <p className="text-white/40 font-mono text-[11px] truncate mt-0.5">{user.email}</p>
                  </div>
                </div>

                {/* Status Dot */}
                <div className="flex items-center gap-1 shrink-0 bg-zinc-950/40 px-2 py-1 rounded-lg border border-white/5">
                  <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-400 animate-pulse shadow-[0_0_8px_#f87171]'}`} />
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-white/60">
                    {user.status === 'active' ? 'Live' : 'Blocked'}
                  </span>
                </div>
              </div>

              {/* Scope & Role Metadata info display */}
              <div className="flex items-center justify-between pt-2 border-t border-purple-500/5">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">System Role</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : user.role === 'trainer'
                    ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}>
                  {user.role || 'user'}
                </span>
              </div>

              {/* Interactive Operation Action Strip */}
              <div className="flex items-center gap-2 pt-1">
                {user.role !== 'admin' && (
                  <button 
                    onClick={() => promoteToAdmin(user._id, user.name)}
                    className="flex-1 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <FiShield size={12} />
                    <span>Admin</span>
                  </button>
                )}

                <button
                  onClick={() => toggleUserStatus(user._id, user.status)}
                  className={`flex-1 py-2 rounded-xl border text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${user.status === 'active'
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                >
                  {user.status === 'active' ? (
                    <>
                      <FiSlash size={12} />
                      <span>Block</span>
                    </>
                  ) : (
                    <>
                      <FiUserCheck size={12} />
                      <span>Unblock</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-white/30 text-xs font-semibold bg-[#0e0b1f]/60 border border-purple-500/10 rounded-2xl w-full col-span-full">
            No registry users found matching terms.
          </div>
        )}
      </div>

      {/* 2. Desktop High-Density Data Table (Preserved safely; hidden below md viewports) */}
      <div className="hidden md:block bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-500/10 bg-[#090714] text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                <th className="py-4 px-6">Identified Profile</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Structural Role</th>
                <th className="py-4 px-6">System Status</th>
                <th className="py-4 px-6 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/5 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-purple-500/5 transition-colors duration-150">
                    {/* Name column */}
                    <td className="py-4 px-6 font-semibold text-white/90">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs uppercase">
                          {user.name?.slice(0, 2) || '?'}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="py-4 px-6 text-white/60 font-mono text-xs">{user.email}</td>

                    {/* Role Tag Column */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                        : user.role === 'trainer'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        }`}>
                        {user.role || 'user'}
                      </span>
                    </td>

                    {/* Status Badge Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-400 animate-pulse shadow-[0_0_8px_#f87171]'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${user.status === 'active' ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                          {user.status === 'active' ? 'Active' : 'Blocked'}
                        </span>
                      </div>
                    </td>

                    {/* Practical Interactive Action Controls */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Make Admin Trigger Button */}
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => promoteToAdmin(user._id, user.name)}
                            className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                            title="Promote account status to system admin"
                          >
                            <FiShield size={13} />
                            <span className="hidden lg:inline">Make Admin</span>
                          </button>
                        )}

                        {/* Block / Unblock Toggle Button */}
                        <button
                          onClick={() => toggleUserStatus(user._id, user.status)}
                          className={`p-2 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 ${user.status === 'active'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                        >
                          {user.status === 'active' ? (
                            <>
                              <FiSlash size={13} />
                              <span className="hidden lg:inline">Block</span>
                            </>
                          ) : (
                            <>
                              <FiUserCheck size={13} />
                              <span className="hidden lg:inline">Unblock</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-white/30 text-sm font-semibold tracking-wide">
                    No registry users found matching terms.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}