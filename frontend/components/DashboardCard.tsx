interface Props {
  title: string;
  value: string;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="card shadow p-4">

      <h6>{title}</h6>

      <h2>{value}</h2>

    </div>
  );
}