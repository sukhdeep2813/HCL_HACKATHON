import { Appointment, DoctorProfile, WellnessGoal } from '@/types';

export const mockGoals: WellnessGoal[] = [
  { id: 'steps', label: 'Daily Steps', target: 8000, progress: 6200, unit: 'steps' },
  { id: 'water', label: 'Water Intake', target: 8, progress: 6, unit: 'glasses' },
  { id: 'sleep', label: 'Sleep Duration', target: 8, progress: 7.2, unit: 'hrs' },
];

export const mockDoctors: DoctorProfile[] = [
  {
    id: 'd1',
    fullName: 'Dr. Maya Sharma',
    specialization: 'Preventive Cardiology',
    yearsExperience: 12,
    availableSlots: ['09:00 AM', '11:30 AM', '02:00 PM'],
    bio: 'Blends lifestyle coaching with clinical expertise to prevent chronic disease.',
  },
  {
    id: 'd2',
    fullName: 'Dr. Ethan Patel',
    specialization: 'Holistic Nutrition',
    yearsExperience: 9,
    availableSlots: ['10:15 AM', '01:45 PM', '04:30 PM'],
    bio: 'Helps patients build sustainable nutrition and hydration habits.',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    providerId: 'd1',
    patientId: 'p1',
    slot: 'Nov 20, 09:00 AM',
    reason: 'Preventive cardiac screening',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a2',
    providerId: 'd2',
    patientId: 'p1',
    slot: 'Nov 22, 11:00 AM',
    reason: 'Hydration habit reset',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];
