"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { getInterviewHistory } from "@/services/history";

interface Interview {
  session_id: number;
  role: string;
  difficulty: string;
  status: string;
  average_score: number;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await getInterviewHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
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
      <h1 className="mb-8 text-4xl font-bold">
        Interview History
      </h1>

      {history.length === 0 ? (
        <EmptyState
          title="No Interviews Yet"
          description="Complete your first mock interview to start tracking your progress."
        />
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.session_id}
              className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.role}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    {item.difficulty}
                  </p>

                  <p className="mt-2 text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">
                    {item.average_score}%
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    {item.status}
                  </div>

                  <Link
                    href={`/results/${item.session_id}`}
                    className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                  >
                    View Results
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}