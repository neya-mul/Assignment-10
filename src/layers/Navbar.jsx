"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiLogOut, FiUser, FiChevronDown,
  FiHome, FiGrid, FiUsers, FiLayout
} from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hooks must be called at the top level, before any conditional returns
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Early return is now safely placed AFTER all hooks have been declared
  if (pathname.includes('dashboard')) return null;

  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home',        href: '/',            icon: <FiHome size={13} /> },
    { label: 'All Classes', href: '/all-classess', icon: <FiGrid size={13} /> },
    { label: 'Community',   href: '/community',    icon: <FiUsers size={13} /> },
  ];

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50">
      {/* Glass bar */}
      <div className="bg-[#07050f]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white font-black text-[15px] flex-shrink-0 shadow-[0_0_14px_rgba(139,92,246,0.5)]"
                style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
              >
                S
              </div>
              <span
                className="font-black text-[21px] tracking-[.14em] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent uppercase"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                STRYDE
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ label, href, icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      relative flex items-center gap-1.5
                      text-[12px] font-semibold tracking-[.08em] uppercase
                      px-4 py-2 rounded-lg transition-all duration-200
                      ${active
                        ? 'text-white'
                        : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-purple-500/15 border border-purple-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 ${active ? 'text-purple-400' : ''}`}>{icon}</span>
                    <span className="relative z-10">{label}</span>
                    {active && (
                      <span className="relative z-10 w-1 h-1 rounded-full bg-purple-400 ml-0.5" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Right: Auth ── */}
            <div className="hidden md:flex items-center gap-2.5">
              {user ? (
                <>
                  {/* User dropdown trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/8 hover:border-purple-500/30 transition-all duration-200 cursor-pointer"
                    >
                      {/* Avatar */}
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-[12px] overflow-hidden flex-shrink-0 ring-2 ring-purple-500/30">
                        {user.image
                          ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                          : (user.name?.charAt(0).toUpperCase() ?? <FiUser size={12} />)
                        }
                      </div>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-white text-[12px] font-semibold">{user.name?.split(' ')[0]}</span>
                        <span className="text-purple-400/70 text-[10px] capitalize mt-[2px]">{user.role}</span>
                      </div>
                      <FiChevronDown
                        size={12}
                        className={`text-white/30 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-[calc(100%+10px)] w-56 bg-[#0e0b1f] border border-purple-500/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                        >
                          {/* User info header */}
                          <div className="px-4 py-3.5 border-b border-purple-500/10">
                            <p className="text-white font-semibold text-[13px]">{user.name}</p>
                            <p className="text-white/35 text-[11px] mt-0.5 truncate">{user.email}</p>
                          </div>

                          {/* Dashboard link */}
                          <div className="p-2">
                            <Link
                              href={`dashboard/${user?.role}`}
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-150 tracking-wide uppercase"
                            >
                              <FiLayout size={13} />
                              <span>Dashboard</span>
                              <span className="ml-auto text-[10px] text-purple-400/50 capitalize font-medium normal-case">
                                {user.role}
                              </span>
                            </Link>
                          </div>

                          {/* Logout */}
                          <div className="px-2 pb-2">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer tracking-wide uppercase"
                            >
                              <FiLogOut size={13} />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-white/50 hover:text-white text-[12px] font-semibold tracking-[.08em] uppercase px-3.5 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="relative px-5 py-2.5 rounded-xl text-white font-bold text-[12px] tracking-[.1em] uppercase overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute inset-0 shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300" />
                    <span className="relative z-10">Join Now →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>

          </div>
        </div>
      </div>

      {/* Active route underline */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-[#07050f]/95 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-5 pt-4 pb-6 space-y-1">

              {/* Nav links */}
              {navLinks.map(({ label, href, icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-[13px] font-semibold tracking-[.07em] uppercase
                      transition-all duration-200
                      ${active
                        ? 'text-white bg-purple-500/15 border border-purple-500/25'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <span className={active ? 'text-purple-400' : 'text-white/30'}>{icon}</span>
                    {label}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                  </Link>
                );
              })}

              {user ? (
                <>
                  {/* Dashboard */}
                  <Link
                    href={`dashboard/${user?.role}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold tracking-[.07em] uppercase text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/18 transition-all duration-200"
                  >
                    <FiLayout size={13} className="text-purple-400" />
                    Dashboard
                    <span className="ml-auto text-[10px] text-purple-400/50 capitalize font-medium normal-case">{user.role}</span>
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-white/5 my-2" />

                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0 ring-2 ring-purple-500/30">
                      {user.image
                        ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        : (user.name?.charAt(0).toUpperCase() ?? <FiUser />)
                      }
                    </div>
                    <div>
                      <p className="text-white font-bold text-[13px]">{user.name}</p>
                      <p className="text-white/35 text-[11px] mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 font-bold text-[12px] tracking-[.08em] uppercase hover:bg-red-500/15 transition-all cursor-pointer"
                  >
                    <FiLogOut size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-white/5 my-2" />
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl text-white/55 text-[13px] font-semibold tracking-[.08em] uppercase hover:text-white hover:bg-white/5 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-[13px] tracking-[.1em] uppercase shadow-[0_0_20px_rgba(123,92,240,0.35)]"
                  >
                    Join Now →
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}