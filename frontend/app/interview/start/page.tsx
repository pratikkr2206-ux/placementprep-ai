"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/services/api";

export default function StartInterviewPage() {
  const router = useRouter();

  const [role, setRole] = useState("Java Developer");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");

      const response = await api.post(
        "/interviews/start",
        {
          role,
          difficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Interview created successfully!");

      router.push(`/interview/${response.data.session_id}`);
    } catch (error) {
      const err = error as AxiosError;

      console.error("Status:", err.response?.status);
      console.error("Data:", err.response?.data);
      console.error("Headers:", err.response?.headers);
      console.error("Full Error:", err);

      toast.error("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">
          Start Mock Interview
        </h1>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <label className="font-semibold">
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 mb-6 w-full rounded-xl border p-3"
          >
            <option>Java Developer</option>
            <option>Python Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <label className="font-semibold">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-2 mb-8 w-full rounded-xl border p-3"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            onClick={startInterview}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 p-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Interview..."
              : "Start Interview"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}