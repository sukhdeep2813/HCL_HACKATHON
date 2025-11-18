import { DoctorProfile } from '@/types';
import { CalendarHeart, Clock, User } from 'lucide-react';

interface DoctorCardProps {
  doctor: DoctorProfile;
  onBook: (doctor: DoctorProfile, slot: string) => void;
}

export const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => (
  <div className="glass-panel flex flex-col gap-4 p-5">
    <div>
      <p className="text-lg font-semibold text-slate-900">{doctor.fullName}</p>
      <p className="text-sm text-slate-500">{doctor.specialization}</p>
    </div>
    <p className="text-sm text-slate-600">{doctor.bio}</p>
    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
      <span className="tag-pill flex items-center gap-1"><User size={14} />{doctor.yearsExperience} yrs exp.</span>
      <span className="tag-pill flex items-center gap-1"><CalendarHeart size={14} />Preventive care</span>
    </div>
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Available slots</p>
      <div className="flex flex-wrap gap-2">
        {doctor.availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onBook(doctor, slot)}
            className="flex items-center gap-1 rounded-full border border-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:border-blue-300"
          >
            <Clock size={14} />
            {slot}
          </button>
        ))}
      </div>
    </div>
  </div>
);
