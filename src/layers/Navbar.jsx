"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };


  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Assignment10
          </Link>


          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">

            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>

            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>


            {
              user ? (
                <div className="flex items-center gap-4">

                  {/* User Info */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {
                        user.name?.charAt(0).toUpperCase() || <FiUser />
                      }
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>


                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                  >
                    <FiLogOut />
                    Logout
                  </button>

                </div>
              )
              :
              (
                <>
                  <Link 
                    href="/login"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Login
                  </Link>


                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )
            }

          </div>



          {/* Mobile Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600"
          >
            {
              isOpen ? <FiX size={24}/> : <FiMenu size={24}/>
            }
          </button>

        </div>


      </div>



      {/* Mobile Menu */}

      <AnimatePresence>

        {
          isOpen && (

            <motion.div
              initial={{opacity:0,height:0}}
              animate={{opacity:1,height:"auto"}}
              exit={{opacity:0,height:0}}
              className="md:hidden bg-white border-t px-4 py-4 space-y-3"
            >

              <Link href="/" className="block">
                Home
              </Link>

              <Link href="/dashboard" className="block">
                Dashboard
              </Link>


              {
                user ? (

                  <>

                  <div className="border-t pt-3">

                    <p className="font-semibold">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>


                  <button
                    onClick={handleLogout}
                    className="w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 rounded-xl"
                  >
                    <FiLogOut/>
                    Logout
                  </button>

                  </>

                )
                :
                (
                  <>
                  <Link href="/login" className="block">
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="block text-center bg-blue-600 text-white py-2 rounded-xl"
                  >
                    Sign Up
                  </Link>
                  </>
                )
              }


            </motion.div>

          )
        }


      </AnimatePresence>


    </nav>
  );
}