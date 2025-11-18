'use client';

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { apiClient, setAuthHeader } from '@/lib/api';
import { AuthResponse, UserProfile, UserRole } from '@/types';

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  authError: string | null;
  login: (payload: { email: string; password: string }) => Promise<UserProfile>;
  signup: (payload: {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    specialization?: string;
  }) => Promise<UserProfile>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'wellness_portal_auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as AuthResponse;
      startTransition(() => {
        setUser(parsed.user);
        setToken(parsed.token);
      });
      setAuthHeader(parsed.token);
    }
    startTransition(() => setLoading(false));
  }, []);

  const persistSession = useCallback((authPayload: AuthResponse) => {
    setUser(authPayload.user);
    setToken(authPayload.token);
    setAuthHeader(authPayload.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authPayload));
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthHeader(undefined);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setAuthError(null);
      try {
        const { data } = await apiClient.post<AuthResponse>('/api/auth/login', {
          email,
          password,
        });
        persistSession(data);
        return data.user;
      } catch (error) {
        console.error('Login error', error);
        setAuthError('Unable to login. Check your credentials.');
        throw error;
      }
    },
    [persistSession],
  );

  const signup = useCallback(
    async ({ fullName, email, password, role, specialization }: {
      fullName: string;
      email: string;
      password: string;
      role: UserRole;
      specialization?: string;
    }) => {
      setAuthError(null);
      try {
        const { data } = await apiClient.post<AuthResponse>('/api/auth/register', {
          fullName,
          email,
          password,
          role,
          specialization,
        });
        persistSession(data);
        return data.user;
      } catch (error) {
        console.error('Signup error', error);
        setAuthError('Unable to create account. Try a different email.');
        throw error;
      }
    },
    [persistSession],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, token, loading, authError, login, signup, logout }),
    [user, token, loading, authError, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
