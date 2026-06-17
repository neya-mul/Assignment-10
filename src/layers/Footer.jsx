import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Assignment10. All rights reserved.
        </p>
        <div className="flex space-x-6 text-gray-400">
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300"><FaGithub size={20} /></a>
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
}