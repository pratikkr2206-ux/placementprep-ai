"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import {
  FaRobot,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      const err = error as AxiosError<{
        detail?: string;
      }>;

      toast.error(
        err.response?.data?.detail ??
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="relative flex min-h-screen overflow-hidden bg-slate-950">

        {/* Background Blobs */}

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10 grid w-full lg:grid-cols-2">

          {/* LEFT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hidden flex-col justify-center px-20 text-white lg:flex"
          >
            <div className="flex items-center gap-5">

              <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-2xl">

                <FaRobot size={42} />

              </div>

              <div>

                <h1 className="text-5xl font-black">
                  PlacementPrep AI
                </h1>

                <p className="mt-2 text-lg text-slate-300">
                  Your AI-Powered Placement Companion
                </p>

              </div>

            </div>

            <h2 className="mt-16 max-w-xl text-6xl font-black leading-tight">
              Ace Every
              <br />
              Interview with
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Artificial Intelligence
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
              Practice realistic interviews,
              receive instant AI feedback,
              improve your resume, and
              track your performance —
              all in one intelligent platform.
            </p>

            <div className="mt-16 space-y-8">

              <div className="flex items-center gap-5">

                <FaCheckCircle
                  className="text-green-400"
                  size={26}
                />

                <span className="text-xl">
                  AI Resume Analysis
                </span>

              </div>

              <div className="flex items-center gap-5">

                <FaCheckCircle
                  className="text-green-400"
                  size={26}
                />

                <span className="text-xl">
                  Personalized Mock Interviews
                </span>

              </div>

              <div className="flex items-center gap-5">

                <FaCheckCircle
                  className="text-green-400"
                  size={26}
                />

                <span className="text-xl">
                  Instant AI Evaluation
                </span>

              </div>

              <div className="flex items-center gap-5">

                <FaCheckCircle
                  className="text-green-400"
                  size={26}
                />

                <span className="text-xl">
                  Performance Analytics Dashboard
                </span>

              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex items-center justify-center p-8"
          >

            <div className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">

              <h2 className="text-4xl font-black text-slate-800">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-slate-500">
                Sign in to continue your
                placement preparation journey.
              </p>

              <form
                onSubmit={handleLogin}
                className="mt-10 space-y-6"
              >

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-2xl border border-slate-300 px-4 transition focus-within:border-blue-600">

                    <FaEnvelope className="text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full bg-transparent p-4 outline-none"
                    />

                  </div>

                </div>
                                {/* PASSWORD */}

                <div>

                  <label className="mb-2 block font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-2xl border border-slate-300 px-4 transition focus-within:border-blue-600">

                    <FaLock className="text-slate-400" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full bg-transparent p-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="text-slate-500 transition hover:text-blue-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* OPTIONS */}

                <div className="flex items-center justify-between text-sm">

                  <label className="flex cursor-pointer items-center gap-2 text-slate-600">

                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) =>
                        setRemember(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 accent-blue-600"
                    />

                    Remember Me

                  </label>

                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="font-semibold text-blue-600 transition hover:text-blue-800"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* LOGIN BUTTON */}

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </motion.button>

              </form>

              {/* DIVIDER */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-slate-200" />

                <span className="px-4 text-sm text-slate-400">
                  NEW TO PLACEMENTPREP AI?
                </span>

                <div className="h-px flex-1 bg-slate-200" />

              </div>

              {/* REGISTER */}

              <button
                onClick={() =>
                  router.push("/register")
                }
                className="w-full rounded-2xl border-2 border-blue-600 py-4 text-lg font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Create Account
              </button>

              {/* MOBILE BRAND */}

              <div className="mt-10 border-t pt-8 text-center lg:hidden">

                <div className="mb-4 flex justify-center">

                  <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">

                    <FaRobot size={34} />

                  </div>

                </div>

                <h3 className="text-2xl font-black text-slate-800">
                  PlacementPrep AI
                </h3>

                <p className="mt-2 text-slate-500">
                  AI-powered mock interviews,
                  resume analysis, and
                  performance tracking.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </>
  );
}