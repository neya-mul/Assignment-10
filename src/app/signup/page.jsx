"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCamera, FiChevronDown, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/iamgeUpload/imageUpload';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Helper function to validate password complexity
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPass = e.target.confirmPassword.value;
    const role = e.target.role.value;

    // 1. Check if passwords match
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    // 2. Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setUploading(true);
    let imageUrl = '';
    if (imageFile) {
      try {
        imageUrl = await uploadToImgBB(imageFile);
      } catch {
        setError('Image upload failed. Please try again.');
        setUploading(false);
        return;
      }
    }
    setUploading(false);
    setLoading(true);

    const { data, error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      image: imageUrl,
      callbackURL: '/',
    });

    setLoading(false);
    if (signUpError) {
      setError(signUpError.message || 'Something went wrong.');
      return;
    }

    // Ensure state cleanup before pushing routes
    await authClient.signOut();
    router.push('/login');
  };

  const isSubmitting = uploading || loading;

  return (
    <div className="min-h-[calc(100vh-66px)] flex items-center justify-center bg-[#08060f] px-4 py-30 lg:py-25">

      {/* Background glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0e0b1f]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-[0_0_60px_rgba(123,92,240,0.1)]">

          {/* Header */}
          <div className="text-center mb-8 ">
            <div
              className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
            >
              S
            </div>
            <h2
              className="text-3xl font-black tracking-[.12em] bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent uppercase mb-1"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Join STRYDE
            </h2>
            <p className="text-white/40 text-sm">Stride Today. Strong Tomorrow.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-2">
              <label htmlFor="avatarUpload" className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-purple-500/40 group-hover:border-purple-400 flex items-center justify-center overflow-hidden bg-purple-500/5 transition-all duration-300">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-white/30 group-hover:text-purple-400 transition-colors">
                      <FiCamera size={24} />
                      <span className="text-[10px] mt-1 font-semibold tracking-wider uppercase">Photo</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/0 group-hover:ring-purple-500/30 transition-all duration-300" />
              </label>

              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="text-white/25 text-[11px] mt-2 tracking-wide">Optional profile photo</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                I am a
              </label>
              <div className="relative">
                <select
                  name="role"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 cursor-pointer appearance-none"
                >
                  <option value="member" className="bg-[#0e0b1f] text-white">Member</option>
                  <option value="trainer" className="bg-[#0e0b1f] text-white">Trainer</option>
                </select>
                <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400/60 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-purple-400 transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
              >
                <span className="text-base">⚠</span>
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-sm tracking-[.08em] uppercase shadow-[0_0_24px_rgba(123,92,240,0.45)] hover:shadow-[0_0_32px_rgba(123,92,240,0.65)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {uploading
                ? '⟳  Uploading Image...'
                : loading
                  ? '⟳  Creating Account...'
                  : 'Create Account →'
              }
            </motion.button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
              Log in
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}


// Admin@123