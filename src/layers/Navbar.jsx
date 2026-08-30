"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiLogOut, FiUser, FiChevronDown,
  FiHome, FiGrid, FiUsers, FiLayout
} from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import { clearWelcomeTrigger } from '@/lib/welcome-notification';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track page scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hooks must be called at the top level
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Early return safely placed after hooks
  if (pathname.includes('dashboard')) {
    return null;
  }

  const handleLogout = async () => {
    clearWelcomeTrigger();
    await authClient.signOut();
    setIsOpen(false);
    setDropdownOpen(false);
    router.push('/login');
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: <FiHome size={13} /> },
    { label: 'All Classes', href: '/all-classess', icon: <FiGrid size={13} /> },
    { label: 'Community', href: '/all-forums', icon: <FiUsers size={13} /> },
  ];

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    // changed fixed to fixed top-0 left-0 right-0 so it overlaps cleanly on the banner
    <nav className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out">
      {/* Dynamic Background: 
        - Transparent when at the top (over the banner)
        - Stays transparent on scroll too, with a subtle blur for legibility
      */}
      <div
        className={`
          transition-all duration-500 ease-in-out border-b
          ${isScrolled
            ? 'bg-transparent backdrop-blur-xl border-purple-500/15 shadow-[0_10px_40px_rgba(5,8,22,0.35)] h-[72px]'
            : 'bg-transparent border-transparent h-[80px]'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* ── Logo ── */}
            <Link href='/'>
              <span
                className="font-black tracking-[.15em] bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent text-lg uppercase"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                FitnessCafe
              </span>
            </Link>
            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href, icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    className={`
                      relative flex items-center gap-2
                      text-[11px] font-bold tracking-[.1em] uppercase
                      px-4 py-2.5 rounded-full transition-all duration-300
                      ${active
                        ? 'text-white'
                        : 'text-white/50 hover:text-white/90 hover:bg-white/[0.03]'
                      }
                    `}
                  >
                    {/* Active dynamic pill background */}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-500/20 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${active ? 'text-violet-400' : 'text-white/40'}`}>
                      {icon}
                    </span>
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ── Right: Auth ── */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 hover:bg-purple-900/30 hover:border-purple-400/40 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-[12px] overflow-hidden flex-shrink-0 ring-2 ring-purple-500/40 group-hover:ring-purple-400 transition-all duration-300">
                      {user.image
                        ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        : (user.name?.charAt(0).toUpperCase() ?? <FiUser size={12} />)
                      }
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-white text-[12px] font-semibold">{user.name?.split(' ')[0]}</span>
                      <span className="text-purple-300/60 text-[9px] tracking-wider uppercase font-bold mt-[3px]">{user.role}</span>
                    </div>
                    <FiChevronDown
                      size={12}
                      className={`text-white/40 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-[calc(100%+12px)] w-56 bg-[#050816] border border-purple-500/25 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden"
                      >
                        {/* User profile section */}
                        <div className="px-4 py-4 bg-gradient-to-b from-purple-950/20 to-transparent border-b border-purple-500/10">
                          <p className="text-white font-bold text-[13px] tracking-wide">{user.name}</p>
                          <p className="text-white/40 text-[11px] mt-0.5 truncate">{user.email}</p>
                        </div>

                        {/* Actions */}
                        <div className="p-2 space-y-1">
                          <Link
                            href={user?.role ? `/dashboard/${user.role}` : '/login'}
                            onClick={() => setDropdownOpen(false)}
                            prefetch={false}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200 tracking-wider uppercase"
                          >
                            <FiLayout size={13} className="text-purple-400" />
                            <span>Dashboard</span>
                            <span className="ml-auto text-[9px] text-purple-400/50 bg-purple-500/10 px-2 py-0.5 rounded-md capitalize font-semibold normal-case">
                              {user.role}
                            </span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer tracking-wider uppercase"
                          >
                            <FiLogOut size={13} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    prefetch={false}
                    className="text-white/60 hover:text-white text-[11px] font-bold tracking-[.1em] uppercase px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={false}
                    className="relative px-5 py-2.5 rounded-full text-white font-bold text-[11px] tracking-[.1em] uppercase overflow-hidden group transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="absolute inset-0 shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all duration-300" />
                    <span className="relative z-10 flex items-center gap-1">Join Now →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-purple-950/20 border border-purple-500/20 text-white/70 hover:text-white hover:bg-purple-900/30 transition-all"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>

          </div>
        </div>
      </div>

      {/* Dynamic Underline Reflection (Only visible when scrolled) */}
      <div className={`h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-60 transition-opacity duration-500 ${isScrolled ? 'opacity-60' : 'opacity-0'}`} />

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#050816] border-b border-purple-500/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">

              {/* Links */}
              {navLinks.map(({ label, href, icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-[12px] font-bold tracking-[.08em] uppercase
                      transition-all duration-200
                      ${active
                        ? 'text-white bg-gradient-to-r from-violet-600/15 to-purple-500/15 border border-purple-500/30'
                        : 'text-white/50 hover:text-white hover:bg-purple-950/10'
                      }
                    `}
                  >
                    <span className={active ? 'text-violet-400' : 'text-white/30'}>{icon}</span>
                    {label}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                  </Link>
                );
              })}

              {user ? (
                <>
                  <Link
                    href={user?.role ? `/dashboard/${user.role}` : '/login'}
                    onClick={() => setIsOpen(false)}
                    prefetch={false}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold tracking-[.08em] uppercase text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-200"
                  >
                    <FiLayout size={13} className="text-purple-400" />
                    Dashboard
                    <span className="ml-auto text-[9px] bg-purple-500/20 px-2 py-0.5 rounded-md text-purple-300 capitalize font-medium normal-case">{user.role}</span>
                  </Link>

                  <div className="h-px bg-purple-500/10 my-3" />

                  {/* Profile Summary */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-950/10 border border-purple-500/10">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0 ring-2 ring-purple-500/30">
                      {user.image
                        ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        : (user.name?.charAt(0).toUpperCase() ?? <FiUser />)
                      }
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white font-bold text-[13px] truncate">{user.name}</p>
                      <p className="text-white/40 text-[11px] truncate mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 font-bold text-[12px] tracking-[.08em] uppercase hover:bg-red-500/15 transition-all cursor-pointer"
                  >
                    <FiLogOut size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-purple-500/10 my-3" />
                  <Link
                    href="/login"
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl text-white/60 text-[12px] font-bold tracking-[.08em] uppercase hover:text-white hover:bg-white/5 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-[12px] tracking-[.1em] uppercase shadow-[0_4px_15px_rgba(124,58,237,0.3)]"
                  >
                    Join Now →
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown background layer listener */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}