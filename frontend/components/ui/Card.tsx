import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}