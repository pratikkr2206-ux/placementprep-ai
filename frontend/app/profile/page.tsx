"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { getProfile, updateProfile } from "@/services/profile";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setFullName(data.full_name ?? "");
      setEmail(data.email ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateProfile({
        full_name: fullName,
        email,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster />

      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <div className="mb-8 flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
              {fullName
                ? fullName.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {fullName || "User"}
              </h1>

              <p className="text-gray-500">
                PlacementPrep AI User
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="mt-2 w-full rounded-xl border p-4"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="mt-2 w-full rounded-xl border p-4"
              />
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="mt-4 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}