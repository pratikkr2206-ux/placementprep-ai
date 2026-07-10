"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import api from "@/services/api";

interface Question {
  id: number;
  question: string;
  category: string;
  role: string;
  difficulty: string;
}

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();

  const sessionId = params.sessionId;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [answer, setAnswer] = useState("");

  const loadQuestions = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await api.get(
        `/interviews/${sessionId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load interview questions.");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      toast.error("Please enter your answer.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("access_token");

      await api.post(
        "/responses/",
        {
          interview_session_id: Number(sessionId),
          question_id: questions[currentIndex].id,
          user_answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setAnswer("");
      } else {
        router.push(`/results/${sessionId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (!questions.length) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-lg text-gray-500">
            No interview questions found.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          Mock Interview
        </h1>

        <p className="mt-2 text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </p>

        <div className="mt-4 h-3 rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex gap-3">
            <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
              {questions[currentIndex].category}
            </span>

            <span className="rounded-full bg-purple-100 px-4 py-2 font-semibold text-purple-700">
              {questions[currentIndex].difficulty}
            </span>
          </div>

          <h2 className="text-2xl font-bold leading-9">
            {questions[currentIndex].question}
          </h2>

          <textarea
            rows={10}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="mt-8 w-full rounded-2xl border p-5 text-lg outline-none focus:border-blue-500"
          />

          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : currentIndex === questions.length - 1
                ? "Finish Interview"
                : "Submit & Next"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}