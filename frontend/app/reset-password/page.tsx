'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaRobot,
} from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import api from '@/services/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid reset token.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      await api.post('/auth/reset-password', {
        token,
        new_password: newPassword,
      });

      toast.success('Password reset successful!');

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      const err = error as AxiosError<{
        detail?: string;
      }>;

      toast.error(err.response?.data?.detail ?? 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  }

  const features = [
    'Secure JWT Authentication',
    'AI Powered Placement Platform',
    'Resume Analysis',
    'Mock Interviews',
    'Performance Dashboard',
  ];

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-950 font-sans">
      <Toaster position="top-right" />
      
      {/* LEFT SIDE - Hero Section (Desktop Only) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0B0F19] p-12 lg:flex">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-[100px]"
        />

        {/* Branding & Header */}
        <div className="relative z-10 flex flex-col space-y-8">
          <div className="flex items-center space-x-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
              <FaRobot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">PlacementPrep AI</h2>
              <p className="text-xs font-medium text-blue-400">Your AI-Powered Placement Companion</p>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-white xl:text-5xl">
              Create New Password
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Secure your account with AI-powered protection.
              </span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-gray-400">
              Choose a strong, unique password to protect your account and continue your placement preparation journey.
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="relative z-10 mt-12 space-y-5">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              key={index}
              className="flex items-center space-x-3"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <FiCheck className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[440px]"
        >
          {/* Card Container */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-gray-800 dark:bg-[#0F131F] dark:shadow-none sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Reset Password 🔒
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FaLock className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:bg-gray-900"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FaLock className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:bg-gray-900"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </span>
                ) : (
                  'Update Password'
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <Link
                href="/login"
                className="group inline-flex items-center space-x-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <FaArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Next.js 15 requires useSearchParams to be wrapped in a Suspense boundary
// when statically rendering. We wrap the main component to prevent build errors.
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <svg className="h-8 w-8 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}