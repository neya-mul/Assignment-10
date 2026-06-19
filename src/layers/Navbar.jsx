"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

export default function Navbar() {
const navLink  = usePathname()
if(navLink.includes('dashboard')){
  return null
}

  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  // const dashboardPath = `/dashboard/${user?.role ?? 'member'}`;

  return (
    <nav className="sticky top-0 z-50 bg-[#08060f]/90 backdrop-blur-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[66px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-black text-base flex-shrink-0"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
            >
              S
            </div>
            <span
              className="font-black text-[22px] tracking-[.13em] bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent uppercase"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              STRYDE
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">

            {[
              { label: 'Home', href: '/' },
              { label: 'All Classes', href: '/classes' },
              { label: 'Community', href: '/community' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/55 hover:text-purple-400 hover:bg-purple-500/10 text-[12px] font-semibold tracking-[.09em] uppercase px-3.5 py-1.5 rounded-lg transition-all duration-200"
              >
                {label}
              </Link>
            ))}

            {/* Conditional Dashboard */}
            {user && (
              <Link
                href={`dashboard/${user?.role}`}
                className="text-purple-400 text-[12px] font-bold tracking-[.09em] uppercase px-3.5 py-1.5 rounded-lg border border-purple-500/35 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200 ml-1"
              >
                Dashboard
              </Link>
            )}

            {/* Divider */}
            <div className="w-px h-6 bg-purple-500/25 mx-2" />

            {user ? (
              <div className="flex items-center gap-2">
                {/* User pill */}
                <div className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 cursor-pointer hover:bg-purple-500/15 transition-all duration-200">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-[12px] overflow-hidden flex-shrink-0">
                    {user.image
                      ? <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      : (user.name?.charAt(0).toUpperCase() ?? <FiUser size={12} />)
                    }
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-white text-[12px] font-semibold">{user.name?.split(' ')[0]}</span>
                    <span className="text-purple-400/70 text-[10px] font-medium capitalize">{user.role}</span>
                  </div>
                  <FiChevronDown size={12} className="text-white/30" />
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-[9px] bg-red-500/10 border border-red-500/25 text-red-400 text-[12px] font-semibold hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 cursor-pointer"
                >
                  <FiLogOut size={13} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  href="/login"
                  className="text-white/55 hover:text-white text-[12px] font-semibold tracking-[.09em] uppercase px-3.5 py-1.5 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold text-[12px] tracking-[.1em] uppercase shadow-[0_0_18px_rgba(123,92,240,0.4)] hover:shadow-[0_0_28px_rgba(123,92,240,0.65)] hover:scale-[1.02] transition-all duration-200"
                >
                  Join Now →
                </Link>
              </div>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#08060f] border-t border-purple-500/15 overflow-hidden"
          >
            <div className="px-5 py-5">

              {[
                { label: 'Home', href: '/' },
                { label: 'All Classes', href: '/classes' },
                { label: 'Community', href: '/community' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-white/65 text-[14px] font-semibold tracking-[.08em] uppercase border-b border-purple-500/10 hover:text-purple-400 transition-colors"
                >
                  {label}
                </Link>
              ))}

              {user && (
                <Link
                  href={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-purple-400 text-[14px] font-bold tracking-[.08em] uppercase border-b border-purple-500/10"
                >
                  Dashboard
                  <span className="ml-2 text-[10px] text-purple-400/50 normal-case font-medium capitalize">({user.role})</span>
                </Link>
              )}

              {user ? (
                <>
                  {/* User row */}
                  <div className="flex items-center gap-3 py-4 border-b border-purple-500/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-[15px] overflow-hidden flex-shrink-0">
                      {user.image
                        ? <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
                        : (user.name?.charAt(0).toUpperCase() ?? <FiUser />)
                      }
                    </div>
                    <div>
                      <p className="text-white font-bold text-[14px]">{user.name}</p>
                      <p className="text-white/35 text-[12px] mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-[10px] bg-red-500/10 border border-red-500/25 text-red-400 font-bold text-[13px] tracking-[.08em] uppercase hover:bg-red-500/20 transition-all cursor-pointer"
                  >
                    <FiLogOut size={15} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-white/55 text-[14px] font-semibold tracking-[.08em] uppercase border-b border-purple-500/10 hover:text-white/80 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 block text-center py-3 rounded-[10px] bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold text-[13px] tracking-[.1em] uppercase shadow-[0_0_20px_rgba(123,92,240,0.38)]"
                  >
                    Join Now →
                  </Link>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}