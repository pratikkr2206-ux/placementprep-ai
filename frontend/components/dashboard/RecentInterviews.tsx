"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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

export default function RecentInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await getInterviewHistory();
      setInterviews(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold">
        Recent Interviews
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : interviews.length === 0 ? (
        <EmptyState
          title="No Recent Interviews"
          description="Start your first AI mock interview to see your interview history here."
        />
      ) : (
        <div className="space-y-4">
          {interviews.map((item) => (
            <div
              key={item.session_id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold">
                  {item.role}
                </h3>

                <p className="text-sm text-slate-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Badge color="blue">
                  {item.difficulty}
                </Badge>

                <Badge
                  color={
                    item.average_score >= 85
                      ? "green"
                      : item.average_score >= 60
                      ? "yellow"
                      : "red"
                  }
                >
                  {item.average_score}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}