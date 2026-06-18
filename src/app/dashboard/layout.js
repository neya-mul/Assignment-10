// app/dashboard/layout.js
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

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function DashboardHomePage({ children }) {
  const {data: session} = useSession()
  const user = session?.user
  console.log(user?.role);
  
  // 1. Structured Navigation Items Array
 const dashboardLinks = {
  member: [
    {
      name: 'Overview',
      href: '/dashboard/member',
      icon: <FaTachometerAlt />
    },
    {
      name: 'Booked Classes',
      href: '/dashboard/member/booked-clases',
      icon: <FaCalendarCheck />
    },
    {
      name: 'Apply as Trainer',
      href: '/dashboard/member/apply-as-trainer',
      icon: <FaUserTie />
    },
    {
      name: 'Favourite',
      href: '/dashboard/member/favourites',
      icon: <FaHeart />
    },
  ],

  trainer: [
    {
      name: 'Overview',
      href: '/dashboard/trainer',
      icon: <FaTachometerAlt />
    },
    {
      name: 'Add Class',
      href: '/dashboard/trainer/add-class',
      icon: <FaPlusCircle />
    },
    {
      name: 'My Classes',
      href: '/dashboard/trainer/my-classes',
      icon: <FaDumbbell />
    },
    {
      name: 'Add Forum',
      href: '/dashboard/trainer/add-forum',
      icon: <FaComments />
    },
    {
      name: 'My Forum',
      href: '/dashboard/trainer/my-forum',
      icon: <FaComments />
    },
  ],

  admin: [
    {
      name: 'Overview',
      href: '/dashboard/admin',
      icon: <FaTachometerAlt />
    },
    {
      name: 'Manage Users',
      href: '/dashboard/admin/manage-users',
      icon: <FaUsers />
    },
    {
      name: 'Applied Trainers',
      href: '/dashboard/admin/applied-trainers',
      icon: <FaUserCheck />
    },
    {
      name: 'Manage Trainers',
      href: '/dashboard/admin/manage-trainers',
      icon: <FaChalkboardTeacher />
    },
    {
      name: 'Manage Classes',
      href: '/dashboard/admin/manage-clases',
      icon: <FaClipboardList />
    },
    {
      name: 'Add Forum Post',
      href: '/dashboard/admin/add-forum',
      icon: <FaPlusCircle />
    },
    {
      name: 'Transaction',
      href: '/dashboard/admin/transaction',
      icon: <FaMoneyBillWave />
    },
    {
      name: 'Forum Posts Manage',
      href: '/dashboard/admin/forum-posts',
      icon: <FaComments />
    },
  ]
};

const navItems = dashboardLinks[user?.role] || []





  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Quick helper to determine if a link is active (Optional basic implementation)
  // For production, you could use `usePathname()` from 'next/navigation'
  const activeRoute = '/dashboard';

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950 text-white font-bold tracking-wider border-b border-slate-800">
          <span>NEXUS CRM</span>
          <button
            className="md:hidden text-gray-400 hover:text-white p-1 text-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation Links (Dynamically Mapped) */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeRoute === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs text-slate-500">
          Logged in as Admin
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Sticky Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none text-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <span className="hidden md:inline-block text-sm text-gray-500 font-medium">
              Welcome back, User
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            U
          </div>
        </header>

        {/* Dynamic Nested Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* --- MOBILE SIDEBAR BACKDROP OVERLAY --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

    </div>
  );
}