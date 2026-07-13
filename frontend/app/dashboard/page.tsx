"use client";

import { useEffect, useState } from "react";
import RecentInterviews from "@/components/dashboard/RecentInterviews";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import api from "@/services/api";
import { getDashboardStats } from "@/services/dashboard";

interface CategoryScore {
  category: string;
  average: number;
}

interface DashboardStats {
  interviews_completed: number;
  average_score: number;
  questions_solved: number;
  best_score: number;

  recent_scores: number[];

  category_scores: CategoryScore[];
}
interface User {
  id: number;
  full_name: string;
  email: string;
}

export default function DashboardPage() {

  const [stats, setStats] = useState<DashboardStats>({
  interviews_completed: 0,
  average_score: 0,
  questions_solved: 0,
  best_score: 0,
  recent_scores: [],
  category_scores: [],
});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  async function loadDashboard() {
    try {
      const [statsData, userResponse] = await Promise.all([
        getDashboardStats(),
        api.get("/auth/me"),
      ]);

      setStats(statsData);
      console.log("AUTH ME RESPONSE:", userResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);

  return (
    <DashboardLayout>

      <Card className="mb-8 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">

  <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

    <div>

      <h1 className="text-4xl font-bold">
        Welcome Back, {user?.full_name ?? "User"} 👋
      </h1>
      <p className="mt-3 text-lg text-blue-100">
        Continue your preparation with AI-powered mock interviews.
      </p>

      <div className="mt-8 flex gap-4">

        <Button
          className="bg-white !text-blue-700 hover:bg-blue-100"
          onClick={() => {
            window.location.href = "/interview/start";
          }}
        >
          Start Interview
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-400"
          onClick={() => {
            window.location.href = "/history";
          }}
        >
          View History
        </Button>

      </div>

    </div>

    <div className="hidden lg:block">

      <div className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur">

        <p className="text-lg">
          Interviews Completed
        </p>

        <h2 className="mt-2 text-6xl font-bold">
          {loading ? "..." : stats.interviews_completed}
        </h2>

      </div>

    </div>

  </div>

</Card>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Mock Interviews"
          value={
            loading
              ? "..."
              : stats.interviews_completed
          }
          subtitle="Completed"
        />

        <StatCard
          title="Average Score"
          value={
            loading
              ? "..."
              : `${stats.average_score}%`
          }
          subtitle="Overall Performance"
        />

        <StatCard
          title="Questions Solved"
          value={
            loading
              ? "..."
              : stats.questions_solved
          }
          subtitle="Practice Questions"
        />

      </div>

      {/* Progress */}

      <div className="grid gap-6 mt-8 lg:grid-cols-2">

  <Card>

    <h2 className="mb-6 text-xl font-bold">
      Performance Overview
    </h2>

    <PerformanceChart
  scores={stats?.recent_scores ?? []}
/>
  </Card>

  <Card>

  <div className="flex items-start justify-between">

    <div>

      <h2 className="text-2xl font-bold">
        📄 Resume Interview
      </h2>

      <p className="mt-3 text-slate-500">
        Upload your resume and let AI generate personalized interview
        questions based on your skills, projects, and experience.
      </p>

    </div>

    <div className="rounded-full bg-blue-100 p-4 text-3xl">
      🤖
    </div>

  </div>

  <div className="mt-8">

    <Button
      onClick={() => {
        window.location.href = "/resume";
      }}
    >
      Upload Resume
    </Button>

  </div>

</Card>

</div>
<div className="mt-8">
  <RecentInterviews />
</div>
    </DashboardLayout>
  );
}