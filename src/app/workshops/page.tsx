'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Gift, 
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CANONICAL_WORKSHOPS } from '@/lib/data/workshops';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { Workshop } from '@/types';

export default function WorkshopsDirectoryPage() {
  const { addBooking } = usePorjotok();
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [registeredBookingId, setRegisteredBookingId] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;

    const bookingId = addBooking({
      serviceType: 'WORKSHOP',
      itemTitle: selectedWorkshop.title,
      providerName: selectedWorkshop.instructorName,
      date: selectedWorkshop.date,
      time: selectedWorkshop.startTime,
      guestsCount: attendeeCount,
      totalAmount: selectedWorkshop.price * attendeeCount
    });

    setRegisteredBookingId(bookingId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hands-On Masterclasses • Includes Verified Digital Certificate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Artisan Craft & Tradition Workshops
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Experience authentic Indian craftsmanship. Create Jaipur blue pottery, Thanjavur gold foil art, Varanasi zari handloom runners, ancient Dokra brass sculptures, or Purulia Chhau masks directly with master artisans across India.
        </p>
      </div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CANONICAL_WORKSHOPS.map((ws) => (
          <div
            key={ws.id}
            id={ws.id}
            className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                <img
                  src={ws.image}
                  alt={ws.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-md">
                  {ws.category}
                </span>

                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{ws.district}{ws.state ? `, ${ws.state}` : ''}</span>
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <strong>{ws.date}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{ws.startTime} - {ws.endTime}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-xl text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                  {ws.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {ws.description}
                </p>

                {/* Master Instructor Info */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
                  <img src={ws.instructorPhoto} alt={ws.instructorName} className="w-10 h-10 rounded-full object-cover" />
                  <div className="text-xs">
                    <div className="font-bold text-stone-900 dark:text-stone-100">{ws.instructorName}</div>
                    <div className="text-stone-400 text-[11px]">{ws.instructorBio}</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verifiable Certificate</span>
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-600" />
                    <span>Keep Your Handmade Work</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">Registration Fee</span>
                  <span className="text-2xl font-black text-stone-900 dark:text-stone-100">₹{ws.price}</span>
                  <span className="text-[10px] text-stone-400 block">{ws.capacity - ws.enrolledCount} seats remaining</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedWorkshop(ws);
                    setRegisteredBookingId(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Register / Book Seat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedWorkshop(null)}
        >
          <div 
            className="relative max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Workshop Enrollment
                </h3>
              </div>
              <button 
                onClick={() => setSelectedWorkshop(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {registeredBookingId ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">Enrolled Successfully!</h4>
                <p className="text-xs text-stone-500">
                  Certificate Voucher ID: <strong className="text-amber-600 font-mono">{registeredBookingId}</strong>
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-200 text-left">
                  Your seat for <strong>{selectedWorkshop.title}</strong> is confirmed. You can view your QR certificate badge in the <em>Visitor Dashboard</em>!
                </div>
                <button
                  onClick={() => setSelectedWorkshop(null)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Close & View in Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{selectedWorkshop.title}</h4>
                  <p className="text-stone-500">{selectedWorkshop.venue} • {selectedWorkshop.date}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Number of Participants</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    required
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Per Participant:</span>
                    <span className="font-bold">₹{selectedWorkshop.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-black pt-1 border-t border-amber-200/60 dark:border-amber-800">
                    <span>Total Payable:</span>
                    <span>₹{selectedWorkshop.price * attendeeCount}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Confirm Registration (₹{selectedWorkshop.price * attendeeCount})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
