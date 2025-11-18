'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, authError, user } = useAuth();
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace(`/dashboard/${user.role === 'provider' ? 'provider' : 'patient'}`);
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const profile = await login({ email, password });
      const destination = `/dashboard/${profile.role === 'provider' ? 'provider' : 'patient'}`;
      router.push(destination);
    } catch (error) {
      console.error(error);
      setStatus('Unable to login. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="glass-panel w-full max-w-md p-8">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Welcome back</p>
          <h1 className="text-3xl font-semibold text-slate-900">Login to your WellNest portal</h1>
          <p className="text-sm text-slate-600">Choose your role to view the right dashboard.</p>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-sm font-semibold">
          {(['patient', 'provider'] as UserRole[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRole(option)}
              className={`rounded-full px-4 py-2 capitalize transition ${role === option ? 'bg-white shadow-md text-slate-900' : 'text-slate-500'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-600">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              required
            />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              required
            />
          </label>
          {status || authError ? (
            <p className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-600">{status || authError}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : `Login as ${role}`}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-blue-600">
            Sign up instead
          </Link>
        </p>
      </div>
    </div>
  );
}
