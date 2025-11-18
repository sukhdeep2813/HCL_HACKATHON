export type UserRole = 'patient' | 'provider';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  specialization?: string;
}

export interface DoctorProfile {
  id: string;
  fullName: string;
  specialization: string;
  yearsExperience: number;
  availableSlots: string[];
  bio: string;
}

export interface Appointment {
  id: string;
  providerId: string;
  patientId: string;
  slot: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface WellnessGoal {
  id: string;
  label: string;
  target: number;
  progress: number;
  unit: string;
}
