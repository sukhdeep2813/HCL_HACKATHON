'use client';

import { AuthProvider } from '@/context/AuthContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
