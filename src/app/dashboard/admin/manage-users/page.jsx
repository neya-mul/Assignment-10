"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUserCheck, FiSlash, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function ManageUsers() {
  // Mock State - Easily swap with dynamic fetch operations & server mutations later
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'member', status: 'active' },
    { id: '2', name: 'Sarah Connor', email: 'sarah@fitness.com', role: 'trainer', status: 'active' },
    { id: '3', name: 'Mike Tyson', email: 'ironmike@stryde.com', role: 'member', status: 'blocked' },
    { id: '4', name: 'Emma Watson', email: 'emma@hello.com', role: 'member', status: 'active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Custom Trigger for Mock Toast Feedback
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  // Toggle Action: Block / Unblock Users (Soft-block simulation)
  const toggleUserStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    
    if (nextStatus === 'blocked') {
      showToast(`User restricted. Session permissions demoted to read-only.`, 'warning');
    } else {
      showToast(`User account restrictions successfully lifted.`, 'success');
    }
  };

  // Action: Promote Standard Users to Admin
  const promoteToAdmin = (id, name) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'admin' } : u));
    showToast(`${name} has been granted structural root Admin access privileges.`, 'success');
  };

  // Filter criteria 
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      
      {/* Interactive Toast Notifications Frame */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm min-w-[320px] max-w-md ${
              toast.type === 'warning' 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {toast.type === 'warning' ? <FiAlertTriangle size={18} /> : <FiCheckCircle size={18} />}
            <span className="font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Head Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
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
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/40" size={16} />
          <input 
            type="text" 
            placeholder="Search credentials..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-purple-500/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
      </div>

      {/* Data Table Core Frame */}
      <div className="bg-[#0e0b1f]/60 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
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
                  <tr key={user.id} className="hover:bg-purple-500/5 transition-colors duration-150">
                    
                    {/* Name / Avatar details Column */}
                    <td className="py-4 px-6 font-semibold text-white/90">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs uppercase">
                          {user.name.slice(0,2)}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="py-4 px-6 text-white/60 font-mono text-xs">{user.email}</td>

                    {/* Role Tag Column */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin' 
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                          : user.role === 'trainer'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status Badge Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-400 animate-pulse shadow-[0_0_8px_#f87171]'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${user.status === 'active' ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                          {user.status === 'active' ? 'Active' : 'Soft Blocked'}
                        </span>
                      </div>
                    </td>

                    {/* Practical Interactive Action Controls */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Make Admin Trigger Button */}
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => promoteToAdmin(user.id, user.name)}
                            className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                            title="Promote account status to system admin"
                          >
                            <FiShield size={13} />
                            <span className="hidden lg:inline">Make Admin</span>
                          </button>
                        )}

                        {/* Block / Unblock Toggle Button */}
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`p-2 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 ${
                            user.status === 'active'
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