import Link from 'next/link';
import { Activity, BellRing, CalendarCheck, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react';

const featureHighlights = [
  {
    icon: <HeartPulse className="h-6 w-6 text-rose-500" />,
    title: 'Personalized Wellness',
    copy: 'Track daily habits, hydration, and sleep goals in one adaptive dashboard.',
  },
  {
    icon: <BellRing className="h-6 w-6 text-amber-500" />,
    title: 'Preventive Nudges',
    copy: 'Automated reminders for screenings, labs, and care plans keep patients proactive.',
  },
  {
    icon: <CalendarCheck className="h-6 w-6 text-emerald-500" />,
    title: 'Frictionless Booking',
    copy: 'Patients see real-time slots and providers get instant updates when visits are booked.',
  },
];

const providerBenefits = [
  'Panel health snapshot in under 3 seconds',
  'Instant booking notifications + consent logs',
  'Care gaps auto surfaced for each patient profile',
];

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-20 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Hackathon-ready Healthcare MVP
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Preventive care that feels personal for patients and actionable for providers.
          </h1>
          <p className="text-lg text-slate-600">
            WellNest unifies wellness goals, preventive reminders, and provider coordination in a single secure portal. Patients stay on track. Care teams stay ahead of risk.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-500"
            >
              I have an account
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60">
            <div>
              <p className="text-2xl font-semibold text-slate-900">4.9/5</p>
              <p className="text-sm text-slate-500">Patient experience score</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">72%</p>
              <p className="text-sm text-slate-500">care gaps closed in 60 days</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">HIPAA-ready</p>
              <p className="text-sm text-slate-500">roles, consent & audit trail</p>
            </div>
          </div>
        </div>
        <div className="glass-panel space-y-5 p-6">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Live Wellness Snapshot</p>
            <div className="mt-5 grid grid-cols-2 gap-4 text-slate-900">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Steps today</p>
                <p className="text-3xl font-semibold">6,240</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Water intake</p>
                <p className="text-3xl font-semibold">6 / 8</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Sleep quality</p>
                <p className="text-3xl font-semibold">92%</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Stress level</p>
                <p className="text-3xl font-semibold">Low</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-4 text-white">
            <div>
              <p className="text-sm text-white/70">Preventive Check</p>
              <p className="text-lg font-semibold">Cardio screening due in 4 days</p>
            </div>
            <Activity className="h-10 w-10 text-emerald-300" />
          </div>
          <div className="rounded-2xl border border-slate-100 p-5">
            <p className="text-sm font-medium text-slate-500">Provider updates</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Dr. Sharma shared a hydration plan</li>
              <li>Lab results auto-synced • A1C in range</li>
              <li>Consent refreshed for nutrition data</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Why WellNest</p>
            <h2 className="text-3xl font-semibold text-slate-900">Built for preventive care journeys end to end.</h2>
            <p className="text-slate-600">
              Secure authentication, wellness tracking, reminders, provider dashboards, and booking—ready for demo day in under five minutes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div key={feature.title} className="glass-panel space-y-3 p-6">
                <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100/80 p-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass-panel p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Patients</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Consent-aware wellness and reminders</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ Secure login and onboarding</li>
                <li>✓ Daily goals for steps, water, sleep</li>
                <li>✓ Preventive checkup reminders + nudges</li>
              </ul>
            </div>
            <div className="glass-panel p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Providers</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">At-a-glance care coordination</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {providerBenefits.map((benefit) => (
                  <li key={benefit}>✓ {benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="providers" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Care network</p>
              <h2 className="text-3xl font-semibold text-slate-900">Meet the preventive care collective</h2>
              <p className="text-slate-600">Patients instantly see available professionals and time slots.</p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-500"
            >
              Become a provider
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-panel space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Dr. Wellness {item}</p>
                    <p className="text-sm text-slate-500">Integrative Medicine</p>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-slate-600">
                  Focus on whole-person prevention plans with digital biomarker tracking.
                </p>
                <div className="text-xs font-medium text-slate-500">Next availability</div>
                <div className="flex flex-wrap gap-2">
                  {['09:00 AM', '11:30 AM', '02:00 PM'].map((slot) => (
                    <span key={slot} className="rounded-full border border-blue-100 px-3 py-1 text-sm text-blue-600">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
