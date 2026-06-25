'use client';

import Link from 'next/link';
// import { usePathname } from 'navigation';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const footerLink = usePathname();
  
  // Dashboard রুটগুলোতে ফুটার হাইড রাখার লজিক
  if (footerLink?.includes('dashboard')) {
    return null;
  }

  return (
    <footer className="relative bg-[#050816] border-t border-purple-500/10 overflow-hidden select-none">
      
      {/* 🔮 Background Ambient Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Top Section: Brand & Nav Links ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-purple-500/5 pb-8">
          
          {/* Column 1: Branding & Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Link href="/" className="hover:opacity-90 transition-opacity active:scale-98">
                <Image 
                  src={logo} 
                  alt="Fitness Café Logo" 
                  width={140} 
                  height={45} 
                  className="object-contain"
                  priority 
                />
              </Link>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Architecting elite training frameworks. Step into the next generation of performance tracking and premium fitness sandbox experiences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-purple-400 mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="/classes" className="hover:text-purple-300 transition-colors">All Classes</Link></li>
              <li><Link href="/trainers" className="hover:text-purple-300 transition-colors">Our Trainers</Link></li>
              <li><Link href="/favorites" className="hover:text-purple-300 transition-colors">Bookmarks Array</Link></li>
            </ul>
          </div>

          {/* Column 3: Portal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-purple-400 mb-4">Portal System</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="/login" className="hover:text-purple-300 transition-colors">Client Login</Link></li>
              <li><Link href="/register" className="hover:text-purple-300 transition-colors">Join Membership</Link></li>
              <li><Link href="#" className="hover:text-purple-300 transition-colors">Secure Checkout</Link></li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Section: Copyright & Social Arrays ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Cyberpunk Style System Log Copyright */}
          <p className="text-[11px] font-mono text-white/30 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} FITNESS CAFÉ // SYS.LOC.BD // ALL RIGHTS RESERVED.
          </p>
          
          {/* Modern Tech Box Social Buttons */}
          <div className="flex space-x-3">
            <a 
              href="#" 
              className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-white/40 hover:bg-purple-500/10 hover:border-purple-400/40 hover:text-purple-300 hover:scale-105 transition-all shadow-sm group"
              title="Github Architecture"
            >
              <FaGithub size={16} className="group-hover:rotate-6 transition-transform" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-white/40 hover:bg-purple-500/10 hover:border-purple-400/40 hover:text-purple-300 hover:scale-105 transition-all shadow-sm group"
              title="Twitter Stream"
            >
              <FaTwitter size={16} className="group-hover:rotate-6 transition-transform" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-white/40 hover:bg-purple-500/10 hover:border-purple-400/40 hover:text-purple-300 hover:scale-105 transition-all shadow-sm group"
              title="LinkedIn Node"
            >
              <FaLinkedin size={16} className="group-hover:rotate-6 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}