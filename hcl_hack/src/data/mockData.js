export const wellnessGoals = [
  { id: 1, label: 'Daily Steps', value: 78, color: 'primary' },
  { id: 2, label: 'Water Intake', value: 92, color: 'success' },
  { id: 3, label: 'Sleep Quality', value: 64, color: 'warning' },
]

export const preventiveReminders = [
  {
    id: 1,
    checkupName: 'Annual Physical',
    scheduledDate: '2025-12-01',
    status: 'upcoming',
  },
  {
    id: 2,
    checkupName: 'Blood Work',
    scheduledDate: '2025-11-28',
    status: 'upcoming',
  },
  {
    id: 3,
    checkupName: 'Allergy Screening',
    scheduledDate: '2025-11-15',
    status: 'completed',
  },
]

export const patientMetrics = [
  { name: 'Mon', steps: 6800, sleep: 6.5, water: 2.1 },
  { name: 'Tue', steps: 8200, sleep: 7.2, water: 2.6 },
  { name: 'Wed', steps: 7500, sleep: 6.9, water: 2.4 },
  { name: 'Thu', steps: 9100, sleep: 7.5, water: 2.8 },
  { name: 'Fri', steps: 10400, sleep: 8.1, water: 3.0 },
  { name: 'Sat', steps: 12000, sleep: 8.3, water: 3.2 },
  { name: 'Sun', steps: 7300, sleep: 7.0, water: 2.3 },
]

export const providerPatients = [
  {
    id: 'p-1',
    name: 'Sophia Patel',
    age: 34,
    lastVisit: '2025-10-04',
    risk: 'low',
    goals: { steps: 72, water: 88, sleep: 65 },
  },
  {
    id: 'p-2',
    name: 'Marcus Allen',
    age: 41,
    lastVisit: '2025-11-02',
    risk: 'medium',
    goals: { steps: 64, water: 70, sleep: 58 },
  },
  {
    id: 'p-3',
    name: 'Emily Chen',
    age: 28,
    lastVisit: '2025-11-11',
    risk: 'high',
    goals: { steps: 55, water: 62, sleep: 48 },
  },
]

export const appointmentSlots = [
  { id: 'slot-1', date: '2025-11-20', provider: 'Dr. Morgan', status: 'pending' },
  { id: 'slot-2', date: '2025-11-24', provider: 'Dr. Singh', status: 'confirmed' },
]


