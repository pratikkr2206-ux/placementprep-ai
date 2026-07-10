"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { getResults } from "@/services/results";

interface ResultItem {
  question: string;
  user_answer: string;
  score: number;
  feedback: string;
  missing_points: string;
  suggestions: string;
}

interface InterviewResult {
  overall_score: number;
  total_questions: number;
  results: ResultItem[];
}

export default function ResultsPage() {
  const params = useParams();

  const sessionId = Number(params.sessionId);

  const [data, setData] =
    useState<InterviewResult | null>(null);

  const loadResults = useCallback(async () => {
    try {
      const result = await getResults(sessionId);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);

  useEffect(() => {
    void loadResults();
  }, [loadResults]);

  if (!data) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-10 text-white shadow-xl">
        <h1 className="text-5xl font-bold">
          Interview Results 🎉
        </h1>

        <p className="mt-3 text-lg">
          Great job completing your interview!
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <p className="text-gray-500">
            Overall Score
          </p>

          <h2 className="mt-4 text-6xl font-bold text-green-600">
            {data.overall_score}%
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <p className="text-gray-500">
            Questions Answered
          </p>

          <h2 className="mt-4 text-6xl font-bold text-blue-600">
            {data.total_questions}
          </h2>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {data.results.map((item, index) => (
          <div
            key={`${item.question}-${index}`}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Question {index + 1}
              </h2>

              <div
                className={`rounded-full px-4 py-2 font-bold text-white ${
                  item.score >= 80
                    ? "bg-green-500"
                    : item.score >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {item.score}%
              </div>
            </div>

            <p className="mt-6 font-semibold">
              {item.question}
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-blue-600">
                Your Answer
              </h3>

              <p className="mt-2 text-gray-700">
                {item.user_answer}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-green-600">
                AI Feedback
              </h3>

              <p className="mt-2">
                {item.feedback}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-red-500">
                Missing Points
              </h3>

              <p className="mt-2">
                {item.missing_points || "None"}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-purple-600">
                Suggestions
              </h3>

              <p className="mt-2">
                {item.suggestions ||
                  "Keep practicing!"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}