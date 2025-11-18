'use client';

import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <main className="flex-1 bg-slate-50">{children}</main>
    <SiteFooter />
  </div>
);
