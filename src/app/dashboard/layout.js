'use client';

import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUserTie,
  FaHeart,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaDumbbell,
  FaComments,
  FaUsers,
  FaUserCheck,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Structured Navigation Items Array (Fixed typos and path structures)
  const dashboardLinks = {
    member: [
      { name: 'Overview', href: '/dashboard/member', icon: <FaTachometerAlt /> },
      { name: 'Booked Classes', href: '/dashboard/member/booked-classes', icon: <FaCalendarCheck /> }, // Fixed typo: -clases to -classes
      { name: 'Apply as Trainer', href: '/dashboard/member/apply-as-trainer', icon: <FaUserTie /> },
      { name: 'Favourite', href: '/dashboard/member/favourites', icon: <FaHeart /> },
    ],
    trainer: [
      { name: 'Overview', href: '/dashboard/trainer', icon: <FaTachometerAlt /> },
      { name: 'Add Class', href: '/dashboard/trainer/add-class', icon: <FaPlusCircle /> },
      { name: 'My Classes', href: '/dashboard/trainer/my-classes', icon: <FaDumbbell /> },
      { name: 'Add Forum', href: '/dashboard/trainer/add-forum', icon: <FaComments /> },
      { name: 'My Forum', href: '/dashboard/trainer/my-forum', icon: <FaComments /> },
    ],
    admin: [
      { name: 'Overview', href: '/dashboard/admin', icon: <FaTachometerAlt /> },
      { name: 'Manage Users', href: '/dashboard/admin/manage-users', icon: <FaUsers /> },
      { name: 'Applied Trainers', href: '/dashboard/admin/applied-trainers', icon: <FaUserCheck /> },
      { name: 'Manage Trainers', href: '/dashboard/admin/manage-trainers', icon: <FaChalkboardTeacher /> },
      { name: 'Manage Classes', href: '/dashboard/admin/manage-classes', icon: <FaClipboardList /> }, // Fixed typo: -clases to -classes
      { name: 'Add Forum Post', href: '/dashboard/admin/add-forum', icon: <FaPlusCircle /> },
      { name: 'Transaction', href: '/dashboard/admin/transaction', icon: <FaMoneyBillWave /> },
      { name: 'Forum Posts Manage', href: '/dashboard/admin/forum-posts', icon: <FaComments /> },
    ]
  };

  const navItems = dashboardLinks[user?.role] || [];
  
  // Safely extract initials dynamically
  const userInitials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) 
    : 'U';

  return (
    <div className="flex h-screen bg-[#08060f] text-white font-sans overflow-hidden relative">
      
      {/* Background ambient decorative glow rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-700/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0e0b1f]/95 backdrop-blur-xl border-r border-purple-500/10 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-[#090714] border-b border-purple-500/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-black text-xs"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
            >
              S
            </div>
            <Link href='/'>
              <span 
                className="font-black tracking-[.15em] bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent text-lg uppercase"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                FitnessCafe
              </span>
            </Link>
          </div>
          <button
            className="md:hidden text-white/40 hover:text-purple-400 p-1 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href} // Fixed: Changed key from item.name to item.href to guarantee absolute uniqueness
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_20px_rgba(123,92,240,0.3)] border-l-4 border-purple-400'
                    : 'text-white/40 hover:bg-purple-500/5 hover:text-purple-400 border border-transparent hover:border-purple-500/10'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-purple-400/60'}>{item.icon}</span>
                <span className="text-xs tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-purple-500/10 bg-[#090714] text-[10px] font-bold uppercase tracking-widest text-white/30 flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>Role:</span>
          <span className="text-purple-400">{user?.role || 'Guest'}</span>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">

        {/* Sticky Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-[#0e0b1f]/40 backdrop-blur-xl border-b border-purple-500/10 shrink-0">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded-xl hover:bg-purple-500/5 border border-transparent hover:border-purple-500/10 text-white/70 focus:outline-none transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <span className="hidden md:inline-block text-xs uppercase font-bold tracking-widest text-white/40">
              Welcome back, <span className="text-white/70">{user?.name || 'Overview'}</span> {/* Fixed: Spelling error 'Wellcome' and adjusted context fallback */}
            </span>
          </div>

          {/* User Profile Info Frame */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white/80">{user?.name || 'Guest Account'}</p>
              <p className="text-[10px] uppercase tracking-wider text-purple-400/80 font-extrabold">{user?.role || 'Guest'}</p>
            </div>
            <div className="w-9 h-9 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(123,92,240,0.15)] overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                userInitials
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-transparent">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* --- MOBILE SIDEBAR BACKDROP OVERLAY --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#06040a]/60 backdrop-blur-sm z-45 md:hidden transition-all duration-200"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

    </div>
  );
}