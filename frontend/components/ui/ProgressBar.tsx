interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div className="w-full">

      <div className="h-3 w-full rounded-full bg-slate-200">

        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

      <p className="mt-2 text-right text-sm font-medium text-slate-600">
        {value}%
      </p>

    </div>
  );
}