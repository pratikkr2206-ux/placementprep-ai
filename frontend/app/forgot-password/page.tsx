'use client';
import api from "@/services/api";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
  "/auth/forgot-password",
  {
    email,
  }
);

setGeneratedToken(
  response.data.reset_token
);

toast.success(
  "Reset token generated successfully!"
);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Secure JWT Authentication',
    'AI Powered Placement Platform',
    'Resume Analysis',
    'Mock Interviews',
    'Performance Dashboard',
  ];

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-950 font-sans">
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
              Forgot Your Password?
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Reset it securely with AI-powered authentication.
              </span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-gray-400">
              Enter your registered email address and we'll generate a secure password reset token so you can create a new password.
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
            {!generatedToken ? (
              // FORM STATE
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Forgot Password 🔑
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Enter your registered email address below to generate a secure password reset token.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <FiMail className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:bg-gray-900"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </span>
                    ) : (
                      'Generate Reset Token'
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <Link
                    href="/login"
                    className="group inline-flex items-center space-x-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </>
            ) : (
              // SUCCESS STATE
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
                  <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Reset Token Generated Successfully
                </h2>
                
                <div className="mb-6 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 dark:border-orange-900/30 dark:bg-orange-500/10 dark:text-orange-400">
                  Development Mode
                </div>

                <div className="mb-8 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-[#0B0F19]">
                  <p className="mb-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Your Secure Token
                  </p>
                  <p className="break-all text-left font-mono text-sm text-gray-800 dark:text-gray-200">
                    {generatedToken}
                  </p>
                </div>

                <Link href={`/reset-password?token=${generatedToken}`} className="w-full">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/20"
                  >
                    Continue to Reset Password
                  </motion.button>
                </Link>

                <Link href="/login" className="mt-4 w-full">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    Back to Login
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}