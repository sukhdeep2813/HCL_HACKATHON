'use client';

import { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { WellnessGoal } from '@/types';

interface GoalCardProps {
  goal: WellnessGoal;
  onUpdate?: (goalId: string, newProgress: number) => void;
}

export const GoalCard = ({ goal, onUpdate }: GoalCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(goal.progress.toString());
  
  const progressPct = Math.min(100, Math.round((goal.progress / goal.target) * 100));
  
  const handleSave = () => {
    const newProgress = parseFloat(editValue);
    if (!isNaN(newProgress) && newProgress >= 0) {
      onUpdate?.(goal.id, newProgress);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditValue(goal.progress.toString());
    setIsEditing(false);
  };
  
  return (
    <div className="glass-panel space-y-3 p-5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{goal.label}</p>
          {isEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 px-2 py-1 text-lg font-semibold border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                step={goal.id === 'sleep' ? '0.1' : '1'}
                min="0"
                max={goal.id === 'steps' ? '50000' : goal.id === 'water' ? '20' : '12'}
              />
              <span className="text-lg font-semibold text-slate-900">/{goal.target} {goal.unit}</span>
            </div>
          ) : (
            <p className="text-xl font-semibold text-slate-900">
              {goal.progress}/{goal.target} {goal.unit}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="tag-pill text-slate-600">{progressPct}%</span>
          {isEditing ? (
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          )}
        </div>
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
