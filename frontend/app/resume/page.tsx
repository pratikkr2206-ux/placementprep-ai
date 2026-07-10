"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ResumeUpload from "@/components/resume/ResumeUpload";

export default function ResumePage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Resume Interview
          </h1>

          <p className="mt-2 text-slate-500">
            Upload your resume and let AI generate personalized interview
            questions based on your skills, projects, and experience.
          </p>

        </div>

        {/* Upload Component */}

        <ResumeUpload />

      </div>

    </DashboardLayout>
  );
}