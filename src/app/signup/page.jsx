"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Default to one of the 2 roles
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Handle standard input updates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image file selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verification logic can be added here once assignment instructions drop
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup Data Submitted:", formData);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-100/70 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Join us and start your assignment journey</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image Upload Field */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group hover:border-blue-500 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FiCamera size={24} />
                  <span className="text-[10px] mt-1">Upload Image</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                placeholder="John Doe" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-800" 
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
                placeholder="you@example.com" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-800" 
              />
            </div>
          </div>

          {/* Role Selection Dropdown Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Select Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 cursor-pointer"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                required 
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-800" 
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
                required 
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-800" 
              />
            </div>
          </div>

          {/* Framer Motion Animated Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }} 
            type="submit" 
            className="w-full py-3 mt-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}