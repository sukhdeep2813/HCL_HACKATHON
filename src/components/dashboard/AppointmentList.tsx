import { Appointment, DoctorProfile } from '@/types';
import { CalendarDays, CheckCircle2, Loader2 } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  doctors: DoctorProfile[];
  loading?: boolean;
  emptyMessage: string;
}

export const AppointmentList = ({ appointments, doctors, loading, emptyMessage }: AppointmentListProps) => {
  if (loading) {
    return (
      <div className="glass-panel flex items-center justify-center p-10 text-slate-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading appointments...
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="glass-panel p-8 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  const doctorLookup = Object.fromEntries(doctors.map((doc) => [doc.id, doc.fullName]));

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="glass-panel flex flex-wrap items-center justify-between gap-4 p-5"
        >
          <div>
            <p className="text-base font-semibold text-slate-900">
              {doctorLookup[appointment.providerId] || 'Specialist'}
            </p>
            <p className="text-sm text-slate-500">{appointment.reason}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={16} /> {appointment.slot}
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 size={16} /> {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
