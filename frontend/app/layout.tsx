
import "./globals.css";

import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlacementPrep AI",
  description: "AI Powered Interview Preparation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}
        <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
  }}
/>
      </body>
    </html>
  );
}