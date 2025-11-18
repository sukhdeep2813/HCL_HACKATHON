import { WellnessGoal } from '@/types';

export const GoalCard = ({ goal }: { goal: WellnessGoal }) => {
  const progressPct = Math.min(100, Math.round((goal.progress / goal.target) * 100));
  return (
    <div className="glass-panel space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{goal.label}</p>
          <p className="text-xl font-semibold text-slate-900">
            {goal.progress}/{goal.target} {goal.unit}
          </p>
        </div>
        <span className="tag-pill text-slate-600">{progressPct}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
};
