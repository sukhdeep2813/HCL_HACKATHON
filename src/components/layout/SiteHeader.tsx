'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const SiteHeader = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#features', label: 'Features' },
    { href: '/#providers', label: 'Providers' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          WellNest
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? 'text-slate-900'
                  : 'transition hover:text-slate-900'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm font-medium">
          {user ? (
            <>
              <Link
                href={`/dashboard/${user.role === 'provider' ? 'provider' : 'patient'}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:border-slate-400"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
              >
                Join Portal
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
