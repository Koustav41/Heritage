'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  X, 
  Sparkles,
  ArrowRight,
  Search
} from 'lucide-react';
import { CANONICAL_GUIDES } from '@/lib/data/members';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { Guide } from '@/types';

export default function GuidesDirectoryPage() {
  const { addBooking } = usePorjotok();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Booking modal form state
  const [bookingDate, setBookingDate] = useState('2026-10-15');
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  const states = useMemo(() => {
    return ['ALL', ...Array.from(new Set(CANONICAL_GUIDES.map(g => g.state))).sort()];
  }, []);

  const districts = useMemo(() => {
    const guidePool = selectedState === 'ALL'
      ? CANONICAL_GUIDES
      : CANONICAL_GUIDES.filter(g => g.state === selectedState);
    return ['ALL', ...Array.from(new Set(guidePool.map(g => g.district))).sort()];
  }, [selectedState]);

  const filteredGuides = useMemo(() => {
    return CANONICAL_GUIDES.filter(g => {
      const matchesState = selectedState === 'ALL' || g.state === selectedState;
      const matchesDistrict = selectedDistrict === 'ALL' || g.district === selectedDistrict;
      const matchesSearch = 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
        g.specialities.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesState && matchesDistrict && matchesSearch;
    });
  }, [selectedState, selectedDistrict, searchQuery]);

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) return;

    const bookingId = addBooking({
      serviceType: 'GUIDE',
      itemTitle: `${selectedGuide.location} Guided Circuit`,
      providerName: selectedGuide.name,
      date: bookingDate,
      time: '09:00 AM',
      guestsCount,
      totalAmount: selectedGuide.chargePerDay
    });

    setBookingConfirmedId(bookingId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pan-India Certified Guides Registry • ASI & State Tourism Certified Historians</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Verified State-wise Local Guides & Historians
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Connect with vetted local historians, archaeological experts, and multilingual cultural storytellers across Indian states. Every guide has passed background verification and archaeological accreditation.
        </p>
      </div>

      {/* State Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          <span>Explore Guides by State:</span>
          {selectedState !== 'ALL' && (
            <button
              onClick={() => {
                setSelectedState('ALL');
                setSelectedDistrict('ALL');
              }}
              className="text-emerald-600 font-semibold hover:underline normal-case"
            >
              Reset to All States
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {states.map(st => (
            <button
              key={st}
              onClick={() => {
                setSelectedState(st);
                setSelectedDistrict('ALL');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedState === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
              }`}
            >
              {st === 'ALL' ? 'All Indian States' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls: Search & District */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by name, circuit (e.g., Taj Mahal, Hampi, Chola), language..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {districts.map(d => (
              <option key={d} value={d}>
                {d === 'ALL' ? (selectedState === 'ALL' ? 'All Districts of India' : `All Districts in ${selectedState}`) : `${d} District`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-stone-500 flex items-center justify-between">
        <span>Showing <strong>{filteredGuides.length}</strong> certified guides across India</span>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-500/40 relative">
                  <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 truncate">
                      {guide.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {guide.state}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {guide.location} ({guide.district})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{guide.rating}</span>
                    </div>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500">{guide.reviewsCount} circuits led</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500">{guide.experienceYears} yrs exp.</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {guide.bio}
              </p>

              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Languages Spoken
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {guide.languages.map(lang => (
                    <span key={lang} className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Key Specialities
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {guide.specialities.map(spec => (
                    <span key={spec} className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Daily Circuit Charge</span>
                <span className="text-xl font-black text-stone-900 dark:text-stone-100">₹{guide.chargePerDay}</span>
              </div>

              <button
                onClick={() => {
                  setSelectedGuide(guide);
                  setBookingConfirmedId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Guided Tour</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="py-20 text-center text-stone-500 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <Users className="w-12 h-12 mx-auto text-emerald-500/40 mb-3" />
          <p className="text-lg font-bold text-stone-800 dark:text-stone-200">No guides found for this selection</p>
          <p className="text-xs text-stone-400 mt-1">Try switching to "All Indian States" or clearing the search box.</p>
        </div>
      )}

      {/* Booking Modal */}
      {selectedGuide && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedGuide(null)}
        >
          <div 
            className="relative max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Book Guided Circuit
                </h3>
              </div>
              <button 
                onClick={() => setSelectedGuide(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmedId ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tour Booked!</h4>
                <p className="text-xs text-stone-500">
                  Reservation reference: <strong className="text-emerald-600 font-mono">{bookingConfirmedId}</strong>
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-200 text-left">
                  Guide <strong>{selectedGuide.name}</strong> ({selectedGuide.state}) has received your circuit reservation for {bookingDate}. Access your itinerary in your <em>Dashboard</em>.
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Close & View in Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookTour} className="space-y-4 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60">
                  <img src={selectedGuide.photo} alt={selectedGuide.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100">{selectedGuide.name}</div>
                    <div className="text-stone-400">{selectedGuide.location} • {selectedGuide.state}</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Select Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    required
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Total Circuit Fee</span>
                  <span className="text-base font-black text-emerald-600">₹{selectedGuide.chargePerDay}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Confirm & Reserve Tour
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
