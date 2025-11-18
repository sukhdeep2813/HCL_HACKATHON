import { Link } from 'react-router-dom'
import { Activity, CalendarCheck, Shield, Stethoscope, Droplets } from 'lucide-react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'

const features = [
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: 'Wellness Tracking',
    description: 'Monitor steps, hydration, and sleep with real-time insights.',
  },
  {
    icon: <CalendarCheck className="h-6 w-6 text-success" />,
    title: 'Preventive Care',
    description: 'Automated reminders ensure you never miss critical checkups.',
  },
  {
    icon: <Shield className="h-6 w-6 text-warning" />,
    title: 'Secure Records',
    description: 'HIPAA-ready privacy controls and consent tracking built in.',
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-danger" />,
    title: 'Provider Dashboard',
    description: 'Clinicians manage panels, review risks, and update plans.',
  },
]

const stats = [
  { label: 'Patients Empowered', value: '1.2k+' },
  { label: 'Preventive Checks Logged', value: '4.8k' },
  { label: 'Providers Onboarded', value: '150+' },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Droplets className="h-7 w-7" />
          WellnessHub
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#features" className="hover:text-primary">
            Features
          </a>
          <a href="#providers" className="hover:text-primary">
            Providers
          </a>
          <a href="#compliance" className="hover:text-primary">
            Compliance
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden md:inline-flex">
            <Button variant="secondary" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="info">Preventive Care MVP</Badge>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Personalized Wellness, Preventive Care, and Provider Collaboration in One Place
            </h1>
            <p className="text-lg text-slate-600">
              Track habits, receive proactive reminders, and collaborate with healthcare providers. Built with secure
              authentication, consent management, and actionable dashboards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg">Create account</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  View demo dashboards
                </Button>
              </Link>
            </div>
          </div>
          <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/10 via-white to-success/10">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900">Today&apos;s Snapshot</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center justify-between">
                  <span>Steps</span>
                  <strong>8,950 / 10,000</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Water Intake</span>
                  <strong>2.7L / 3L</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Sleep</span>
                  <strong>7.4 hrs</strong>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        <section id="features" className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </section>

        <section
          id="providers"
          className="grid items-center gap-10 rounded-3xl bg-slate-900 px-10 py-12 text-white md:grid-cols-2"
        >
          <div className="space-y-4">
            <Badge variant="success">Provider Tools</Badge>
            <h2 className="text-3xl font-semibold">Population Health at a Glance</h2>
            <p className="text-sm text-slate-200">
              Risk stratify patients, monitor adherence, and coordinate preventive outreach with action logs and audit
              trails.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="compliance" className="rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">Privacy & Consent Compliance</h2>
          <p className="mt-4 text-sm text-slate-600">
            Built with audit logs, consent tracking, and secure authentication. Supports HIPAA-ready workflows, JWT
            token handling, and least-privilege access.
          </p>
        </section>
      </main>
    </div>
  )
}

export default LandingPage


