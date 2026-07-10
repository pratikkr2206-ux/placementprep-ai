import { FaInbox } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">

      <FaInbox
        size={56}
        className="text-slate-400"
      />

      <h2 className="mt-6 text-2xl font-bold text-slate-700">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

    </div>
  );
}