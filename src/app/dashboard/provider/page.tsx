'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Appointment, DoctorProfile } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import { mockAppointments, mockDoctors } from '@/lib/mock';
import { StatCard } from '@/components/dashboard/StatCard';

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [profile, setProfile] = useState<DoctorProfile | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'provider')) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      setAppointmentsLoading(true);
      try {
        const { data } = await apiClient.get<{ appointments: Appointment[] }>('/api/appointments');
        setAppointments(data.appointments);
      } catch (error) {
        console.warn('Falling back to mock provider appointments', error);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get<{ doctors: DoctorProfile[] }>('/api/doctors');
        const doctor = data.doctors.find((doc) => doc.id === user?.id);
        setProfile(doctor || mockDoctors[0]);
      } catch (error) {
        console.warn('Falling back to mock doctor profile', error);
        setProfile(mockDoctors[0]);
      }
    };

    fetchAppointments();
    fetchProfile();
  }, [user]);

  const metrics = useMemo(() => {
    const today = appointments.slice(0, 3);
    const openSlots = profile?.availableSlots.length ?? 0;
    return {
      totalPatients: new Set(appointments.map((appt) => appt.patientId)).size,
      confirmed: appointments.length,
      openSlots,
      nextVisits: today,
    };
  }, [appointments, profile?.availableSlots]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Provider view</p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Care delivery cockpit</h1>
            <p className="text-sm text-slate-500">Monitor bookings, consent, and open slots in real-time.</p>
          </div>
          {profile ? (
            <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">{profile.fullName}</p>
              <p>{profile.specialization}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active patients" value={`${metrics.totalPatients}`} trend="+4 this month" />
        <StatCard label="Confirmed visits" value={`${metrics.confirmed}`} accent="Syncs instantly with bookings" />
        <StatCard label="Open slots" value={`${metrics.openSlots}`} accent="Update availability to fill gaps" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming schedule</h2>
          {appointmentsLoading ? (
            <p className="text-sm text-slate-500">Loading appointments...</p>
          ) : metrics.nextVisits.length ? (
            <div className="space-y-4">
              {metrics.nextVisits.map((appointment) => (
                <div key={appointment.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-900">Slot: {appointment.slot}</p>
                  <p className="text-sm text-slate-500">Reason: {appointment.reason}</p>
                  <p className="text-xs text-slate-400">Patient ref: {appointment.patientId}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No upcoming visits yet.</p>
          )}
        </div>
        <div className="glass-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
          <p className="text-sm text-slate-500">These slots appear instantly in the patient portal.</p>
          <div className="flex flex-wrap gap-2">
            {profile?.availableSlots.length ? (
              profile.availableSlots.map((slot) => (
                <span key={slot} className="rounded-full border border-emerald-200 px-4 py-1 text-sm font-semibold text-emerald-700">
                  {slot}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-400">All booked! Add more slots from the backend.</span>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel space-y-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Recent bookings</h2>
          <p className="text-sm text-slate-500">Latest preventive visits from your panel.</p>
        </div>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base font-semibold text-slate-900">{appointment.slot}</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {appointment.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{appointment.reason}</p>
              <p className="text-xs text-slate-400">Patient ref: {appointment.patientId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
