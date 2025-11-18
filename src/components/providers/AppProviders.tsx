'use client';

import { AuthProvider } from '@/context/AuthContext';
import { WellnessProvider } from '@/context/WellnessContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <WellnessProvider>
        {children}
      </WellnessProvider>
    </AuthProvider>
  );
};
