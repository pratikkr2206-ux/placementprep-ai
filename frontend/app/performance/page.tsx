"use client";

import { useEffect, useState } from "react";

import PerformanceChart from "@/components/dashboard/PerformanceChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatCard from "@/components/ui/StatCard";

import { getDashboardStats } from "@/services/dashboard";

interface CategoryScore {
  category: string;
  average: number;
}

interface DashboardStats {
  interviews_completed: number;
  questions_solved: number;
  average_score: number;
  best_score: number;
  recent_scores: number[];
  category_scores: CategoryScore[];
  strengths: string[];
  improvements: string[];
}

export default function PerformancePage() {
  const [stats, setStats] = useState<DashboardStats>({
    interviews_completed: 0,
    questions_solved: 0,
    average_score: 0,
    best_score: 0,
    recent_scores: [],
    category_scores: [],
    strengths: [],
    improvements: [],
  });

  const [loading, setLoading] = useState(true);

  const loadPerformance = async () => {
    try {
      const data = await getDashboardStats();

      setStats({
        interviews_completed: data.interviews_completed ?? 0,
        questions_solved: data.questions_solved ?? 0,
        average_score: data.average_score ?? 0,
        best_score: data.best_score ?? 0,
        recent_scores: data.recent_scores ?? [],
        category_scores: data.category_scores ?? [],
        strengths: data.strengths ?? [],
        improvements: data.improvements ?? [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPerformance();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Performance Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor your interview performance and identify areas for
            improvement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <StatCard
            title="Average Score"
            value={`${stats.average_score}%`}
            subtitle="Overall"
          />

          <StatCard
            title="Best Score"
            value={`${stats.best_score}%`}
            subtitle="Highest"
          />

          <StatCard
            title="Interviews"
            value={stats.interviews_completed}
            subtitle="Completed"
          />

          <StatCard
            title="Questions"
            value={stats.questions_solved}
            subtitle="Answered"
          />
        </div>

        <Card>
          <h2 className="text-2xl font-bold">
            Interview Progress
          </h2>

          <div className="mt-6">
            <PerformanceChart
              scores={stats.recent_scores}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold">
            Category Performance
          </h2>

          <div className="mt-6 space-y-6">
            {stats.category_scores.length > 0 ? (
              stats.category_scores.map((item) => (
                <div key={item.category}>
                  <div className="mb-2 flex justify-between">
                    <span className="font-semibold">
                      {item.category}
                    </span>

                    <span>{item.average}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-200">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      style={{
                        width: `${item.average}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No Performance Data"
                description="Complete a few interviews to unlock detailed analytics and AI insights."
              />
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold">
            🤖 AI Performance Coach
          </h2>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-green-600">
                Strengths
              </h3>

              <ul className="mt-4 space-y-2">
                {stats.strengths.length > 0 ? (
                  stats.strengths.map((item) => (
                    <li key={item}>
                      ✅ {item}
                    </li>
                  ))
                ) : (
                  <li>No strengths identified yet.</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-red-600">
                Needs Improvement
              </h3>

              <ul className="mt-4 space-y-2">
                {stats.improvements.length > 0 ? (
                  stats.improvements.map((item) => (
                    <li key={item}>
                      ⚠ {item}
                    </li>
                  ))
                ) : (
                  <li>No improvement areas identified yet.</li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}