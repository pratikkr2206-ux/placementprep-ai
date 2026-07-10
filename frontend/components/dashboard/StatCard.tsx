interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-800">
            {value}
          </h2>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-3xl text-white transition-transform duration-300 group-hover:scale-110">

          📊

        </div>

      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-200">

        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      </div>

    </div>
  );
}