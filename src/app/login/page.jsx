"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    setLoading(false);
    if (signInError) {
      setError(signInError.message || 'Invalid email or password.');
      return;
    }

    router.push('/');
  };
const handleGoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    rememberMe: false,
  });

  router.push("/");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08060f] px-4 py-14">

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
          <div className="text-center mb-8">
            <div
              className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
            >
              F
            </div>
            <h2
              className="text-3xl font-black tracking-[.12em] bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent uppercase mb-1"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Welcome Back
            </h2>
            <p className="text-white/40 text-sm">FitnessCafe</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-purple-500/20 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold text-white/40 uppercase tracking-[.1em]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-sm tracking-[.08em] uppercase shadow-[0_0_24px_rgba(123,92,240,0.45)] hover:shadow-[0_0_32px_rgba(123,92,240,0.65)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? '⟳  Signing In...' : 'Sign In →'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-purple-500/15" />
            <span className="text-white/25 text-[11px] font-semibold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-purple-500/15" />
          </div>

          {/* Google Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/5 border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/8 text-white/80 hover:text-white text-sm font-semibold tracking-wide transition-all duration-200"
          >
            <FcGoogle size={18} />
            Continue with Google
          </motion.button>

          {/* Footer */}
          <p className="text-center text-sm text-white/30 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
              Sign up
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}