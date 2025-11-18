import { useMemo } from 'react'
import { format } from 'date-fns'
import { AlertTriangle, CalendarClock, Users } from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import ProgressBar from '../components/common/ProgressBar'
import Button from '../components/common/Button'
import { providerPatients } from '../data/mockData'
import { useAuthStore } from '../store/useAuthStore'

const ProviderDashboard = () => {
  const { user } = useAuthStore()

  const stratifiedCounts = useMemo(() => {
    return providerPatients.reduce(
      (acc, patient) => {
        acc[patient.risk] = (acc[patient.risk] ?? 0) + 1
        return acc
      },
      { low: 0, medium: 0, high: 0 },
    )
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Hello {user?.name ?? 'Provider'}</p>
            <h1 className="text-3xl font-bold text-slate-900">Panel Management</h1>
            <p className="text-sm text-slate-600">
              Monitor adherence, high-risk alerts, and preventive milestones at a glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Export logs</Button>
            <Button>Schedule outreach</Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <Users className="mb-3 h-8 w-8 text-primary" />
            <p className="text-sm text-slate-500">Active patients</p>
            <p className="text-3xl font-bold text-slate-900">{providerPatients.length}</p>
          </Card>
          <Card>
            <AlertTriangle className="mb-3 h-8 w-8 text-warning" />
            <p className="text-sm text-slate-500">High risk</p>
            <p className="text-3xl font-bold text-slate-900">{stratifiedCounts.high}</p>
          </Card>
          <Card>
            <CalendarClock className="mb-3 h-8 w-8 text-success" />
            <p className="text-sm text-slate-500">Checkups scheduled</p>
            <p className="text-3xl font-bold text-slate-900">18</p>
          </Card>
        </section>

        <section className="space-y-6">
          {providerPatients.map((patient) => (
            <Card key={patient.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{patient.name}</h3>
                  <p className="text-sm text-slate-500">
                    Age {patient.age} • Last visit {format(new Date(patient.lastVisit), 'MMM d, yyyy')}
                  </p>
                </div>
                <Badge
                  variant={patient.risk === 'high' ? 'danger' : patient.risk === 'medium' ? 'warning' : 'success'}
                >
                  {patient.risk} risk
                </Badge>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {Object.entries(patient.goals).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-semibold capitalize text-slate-600">{key}</p>
                    <ProgressBar value={value} color={key === 'steps' ? 'primary' : key === 'water' ? 'success' : 'warning'} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}

export default ProviderDashboard


