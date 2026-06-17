"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Assignment10
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2"
          >
            <Link href="/" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">Home</Link>
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">Dashboard</Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">Login</Link>
            <Link href="/signup" className="block text-center px-3 py-2 rounded-xl bg-blue-600 text-white font-medium">
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}