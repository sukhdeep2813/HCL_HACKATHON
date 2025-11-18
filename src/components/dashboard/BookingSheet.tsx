'use client';

import { useState } from 'react';
import { DoctorProfile } from '@/types';

interface BookingSheetProps {
  doctor: DoctorProfile | null;
  slot: string | null;
  onClose: () => void;
  onConfirm: (note: string) => void;
  loading?: boolean;
}

export const BookingSheet = ({ doctor, slot, onClose, onConfirm, loading }: BookingSheetProps) => {
  const [note, setNote] = useState('');

  if (!doctor || !slot) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 p-4">
      <div className="glass-panel w-full max-w-md space-y-4 p-6">
        <div>
          <p className="text-sm font-medium text-slate-500">Booking with</p>
          <p className="text-xl font-semibold text-slate-900">{doctor.fullName}</p>
          <p className="text-sm text-slate-500">{doctor.specialization}</p>
        </div>
        <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
          Selected slot: {slot}
        </div>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Share symptoms or your preventive goal..."
          className="h-24 w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-slate-400 focus:outline-none"
        />
        <div className="flex items-center justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-slate-500 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(note)}
            disabled={loading}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Booking...' : 'Confirm booking'}
          </button>
        </div>
      </div>
    </div>
  );
};
