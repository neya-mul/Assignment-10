// app/dashboard/layout.js
'use client';

import { useState } from 'react';

export default function DashboardHomePage({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      {/* Mobile drawer: hidden by default (-translate-x-full), visible on medium screens (md:translate-x-0) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950 text-white font-bold tracking-wider border-b border-slate-800">
          <span>NEXUS CRM</span>
          {/* Close button for mobile screen viewports */}
          <button 
            className="md:hidden text-gray-400 hover:text-white p-1 text-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white">
            <span>📊</span> <span>Overview</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <span>📈</span> <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <span>👥</span> <span>Customers</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <span>⚙️</span> <span>Settings</span>
          </a>
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
            {/* Hamburger Button for Mobile Views */}
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

          {/* Dummy Avatar Profile Icon */}
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