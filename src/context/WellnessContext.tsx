'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WellnessGoal } from '@/types';
import { mockGoals } from '@/lib/mock';

interface WellnessContextType {
  goals: WellnessGoal[];
  updateGoal: (goalId: string, newProgress: number) => void;
  resetGoals: () => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

interface WellnessProviderProps {
  children: ReactNode;
}

export const WellnessProvider = ({ children }: WellnessProviderProps) => {
  const [goals, setGoals] = useState<WellnessGoal[]>(mockGoals);

  // Load goals from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('wellness-goals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (error) {
        console.warn('Failed to parse saved goals, using defaults');
      }
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wellness-goals', JSON.stringify(goals));
  }, [goals]);

  const updateGoal = (goalId: string, newProgress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  const resetGoals = () => {
    setGoals(mockGoals);
    localStorage.removeItem('wellness-goals');
  };

  return (
    <WellnessContext.Provider value={{ goals, updateGoal, resetGoals }}>
      {children}
    </WellnessContext.Provider>
  );
};