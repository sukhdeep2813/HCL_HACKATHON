'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Appointment, DoctorProfile } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useWellness } from '@/context/WellnessContext';
import { apiClient } from '@/lib/api';
import { mockAppointments, mockDoctors } from '@/lib/mock';
import { StatCard } from '@/components/dashboard/StatCard';
import { GoalCard } from '@/components/dashboard/GoalCard';
import { DoctorCard } from '@/components/dashboard/DoctorCard';
import { AppointmentList } from '@/components/dashboard/AppointmentList';
import { BookingSheet } from '@/components/dashboard/BookingSheet';

export default function PatientDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { goals, updateGoal, resetGoals } = useWellness();
  const [doctors, setDoctors] = useState<DoctorProfile[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [bookingDoctor, setBookingDoctor] = useState<DoctorProfile | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'patient')) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await apiClient.get<{ doctors: DoctorProfile[] }>('/api/doctors');
        setDoctors(data.doctors);
      } catch (error) {
        console.warn('Falling back to mock doctors', error);
      }
    };

    const fetchAppointments = async () => {
      if (!user) return;
      setAppointmentsLoading(true);
      try {
        const { data } = await apiClient.get<{ appointments: Appointment[] }>('/api/appointments');
        setAppointments(data.appointments);
      } catch (error) {
        console.warn('Falling back to mock appointments', error);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, [user]);

  const handleBook = (doctor: DoctorProfile, slot: string) => {
    setBookingDoctor(doctor);
    setSelectedSlot(slot);
  };

  const confirmBooking = async (note: string) => {
    if (!bookingDoctor || !selectedSlot) return;
    setBookingLoading(true);
    try {
      const { data } = await apiClient.post<{ appointment: Appointment }>('/api/appointments', {
        providerId: bookingDoctor.id,
        slot: selectedSlot,
        reason: note || 'Preventive checkup',
      });
      setAppointments((prev) => [data.appointment, ...prev]);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === bookingDoctor.id
            ? { ...doc, availableSlots: doc.availableSlots.filter((slot) => slot !== selectedSlot) }
            : doc,
        ),
      );
    } catch (error) {
      console.warn('Falling back to mock booking', error);
      const optimisticAppointment: Appointment = {
        id: crypto.randomUUID(),
        providerId: bookingDoctor.id,
        patientId: user?.id || 'demo',
        slot: selectedSlot,
        reason: note || 'Preventive visit',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [optimisticAppointment, ...prev]);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === bookingDoctor.id
            ? { ...doc, availableSlots: doc.availableSlots.filter((slot) => slot !== selectedSlot) }
            : doc,
        ),
      );
    } finally {
      setBookingLoading(false);
      setBookingDoctor(null);
      setSelectedSlot(null);
    }
  };

  const bookingSummary = useMemo(
    () => ({
      upcoming: appointments.length,
      goalsOnTrack: Math.round((goals.filter((goal) => goal.progress >= goal.target * 0.8).length / goals.length) * 100),
      reminders: 3,
    }),
    [appointments.length, goals],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Patient view</p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold text-slate-900">Wellness cockpit</h1>
          <p className="text-sm text-slate-500">Keep goals, reminders, and bookings in sync.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Upcoming visits" value={`${bookingSummary.upcoming}`} trend="2 new this week" />
        <StatCard label="Goals on track" value={`${bookingSummary.goalsOnTrack}%`} accent="Steps + water are on pace" />
        <StatCard label="Reminders" value={`${bookingSummary.reminders}`} accent="Flu shot, lab work, hydration" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Today's Wellness Goals</h2>
          <button
            onClick={() => {
              if (confirm('Reset all wellness goals to default values?')) {
                resetGoals();
              }
            }}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Reset Goals
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdate={updateGoal}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Care team</h2>
          <p className="text-sm text-slate-500">Choose a provider and grab an open slot.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Your bookings</h2>
          <p className="text-sm text-slate-500">Confirmed visits sync across providers instantly.</p>
        </div>
        <AppointmentList
          appointments={appointments}
          doctors={doctors}
          loading={appointmentsLoading}
          emptyMessage="No appointments yet. Book your first preventive visit!"
        />
      </div>

      <BookingSheet
        doctor={bookingDoctor}
        slot={selectedSlot}
        onClose={() => {
          setBookingDoctor(null);
          setSelectedSlot(null);
        }}
        onConfirm={confirmBooking}
        loading={bookingLoading}
      />
    </div>
  );
}
