"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Mail,
  Lock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import api from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = passwordStrength();

  const strengthText = () => {
    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const strengthColor = () => {
    switch (strength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-700";
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      const error = err as AxiosError<any>;

      toast.error(
        error.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-6 py-10">

        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/5 shadow-2xl"
        >
          {/* Left Section */}

          <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent border-r border-white/10">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-cyan-300 w-fit mb-8">
              <Sparkles className="w-4 h-4" />
              PlacementPrep AI
            </div>

            <h1 className="text-5xl font-bold leading-tight text-white">
              Build Your
              <span className="block text-cyan-400">
                Dream Career.
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Create your free account and start preparing for technical
              interviews with AI-powered mock interviews, coding practice,
              analytics and personalized recommendations.
            </p>

            <div className="space-y-5 mt-10">

              <div className="flex items-center gap-4">
                <CheckCircle className="text-cyan-400 w-6 h-6" />
                <span className="text-gray-300">
                  AI Interview Simulator
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle className="text-cyan-400 w-6 h-6" />
                <span className="text-gray-300">
                  Coding & Aptitude Practice
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle className="text-cyan-400 w-6 h-6" />
                <span className="text-gray-300">
                  Performance Analytics
                </span>
              </div>

              <div className="flex items-center gap-4">
                <CheckCircle className="text-cyan-400 w-6 h-6" />
                <span className="text-gray-300">
                  Personalized Learning Path
                </span>
              </div>

            </div>
          </div>

          {/* Right Section */}

          <div className="p-8 md:p-12">

            <div className="mb-10">

              <h2 className="text-3xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-gray-400 mt-2">
                Join thousands of students preparing smarter.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
                            {/* Full Name */}

              <div>

                <label className="text-sm text-gray-300 block mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition focus:border-cyan-400"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="text-sm text-gray-300 block mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition focus:border-cyan-400"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="text-sm text-gray-300 block mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <div className="mt-4">

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className={`h-full transition-all duration-500 ${strengthColor()}`}
                      style={{
                        width: `${strength * 25}%`,
                      }}
                    />

                  </div>

                  <div className="mt-2 text-sm text-gray-400">
                    Password Strength:
                    <span className="ml-2 text-cyan-400">
                      {strengthText()}
                    </span>
                  </div>

                </div>

              </div>

              <button
                disabled={loading}
                className="group w-full rounded-xl bg-cyan-500 py-3.5 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-70"
              >
                <span className="flex items-center justify-center gap-2">

                  {loading ? "Creating Account..." : "Create Account"}

                  {!loading && (
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}

                </span>
              </button>

              <div className="text-center text-gray-400">

                Already have an account?

                <Link
                  href="/login"
                  className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Sign In
                </Link>

              </div>

            </form>

          </div>

        </motion.div>

      </div>
    </>
  );
}