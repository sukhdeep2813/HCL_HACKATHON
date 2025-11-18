interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  accent?: string;
}

export const StatCard = ({ label, value, trend, accent }: StatCardProps) => (
  <div className="glass-panel flex flex-col gap-3 p-5">
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="text-3xl font-semibold text-slate-900">{value}</p>
    {trend ? <p className="text-sm text-emerald-600">{trend}</p> : null}
    {accent ? <p className="text-xs text-slate-500">{accent}</p> : null}
  </div>
);
