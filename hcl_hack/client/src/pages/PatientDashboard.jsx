import { useMemo, useState } from 'react'
import { CalendarDays, ClipboardList, Droplet, Moon, Footprints } from 'lucide-react'
import { format } from 'date-fns'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from 'recharts'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Badge from '../components/common/Badge'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import { patientMetrics, preventiveReminders, wellnessGoals } from '../data/mockData'
import { useAuthStore } from '../store/useAuthStore'

const PatientDashboard = () => {
  const { user } = useAuthStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formState, setFormState] = useState({ date: '', reason: '' })

  const todaySummary = useMemo(
    () => [
      { label: 'Steps', value: '8,950', icon: <Footprints className="h-5 w-5 text-primary" /> },
      { label: 'Water', value: '2.7 L', icon: <Droplet className="h-5 w-5 text-success" /> },
      { label: 'Sleep', value: '7.4 hrs', icon: <Moon className="h-5 w-5 text-warning" /> },
    ],
    [],
  )

  const handleBook = (event) => {
    event.preventDefault()
    setFormState({ date: '', reason: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Hi {user?.name ?? 'Patient'}</p>
            <h1 className="text-3xl font-bold text-slate-900">Your Wellness Overview</h1>
            <p className="text-sm text-slate-600">Stay on track with guided goals and preventive reminders.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Share with provider</Button>
            <Button onClick={() => setIsModalOpen(true)}>Book appointment</Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {todaySummary.map((item) => (
            <Card key={item.label} className="space-y-2">
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="text-sm font-semibold text-slate-600">{item.label}</h3>
              </div>
              <p className="text-2xl font-bold text-slate-900">{item.value}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card title="Weekly Performance">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="steps" stroke="#3B82F6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="sleep" stroke="#10B981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Goal Progress" className="space-y-4">
            {wellnessGoals.map((goal) => (
              <div key={goal.id}>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>{goal.label}</span>
                  <span>{goal.value}%</span>
                </div>
                <ProgressBar value={goal.value} color={goal.color} showLabel={false} />
              </div>
            ))}
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card title="Preventive reminders" className="space-y-4">
            {preventiveReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{reminder.checkupName}</p>
                    <p className="text-sm text-slate-500">
                      Scheduled {format(new Date(reminder.scheduledDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Badge variant={reminder.status === 'completed' ? 'success' : 'warning'}>
                  {reminder.status}
                </Badge>
              </div>
            ))}
          </Card>
          <Card title="Care plan activity" className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl bg-primary/10 p-4">
              <ClipboardList className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">Goal streak</p>
                <p className="text-2xl font-bold text-slate-900">12 days</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-inner">
              <p className="text-sm text-slate-600">Next action</p>
              <p className="text-lg font-semibold text-slate-800">Log water intake by 6 PM</p>
            </div>
          </Card>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment">
        <form className="space-y-4" onSubmit={handleBook}>
          <Input
            label="Preferred Date"
            type="date"
            value={formState.date}
            onChange={(e) => setFormState((prev) => ({ ...prev, date: e.target.value }))}
          />
          <Input
            label="Reason"
            placeholder="Annual wellness review"
            value={formState.reason}
            onChange={(e) => setFormState((prev) => ({ ...prev, reason: e.target.value }))}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PatientDashboard


