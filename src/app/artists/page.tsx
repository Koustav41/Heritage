'use client';

import React, { useState } from 'react';
import { Users, Music, Star, ShieldCheck, Calendar, Phone, Mail, CheckCircle2, X } from 'lucide-react';
import { CANONICAL_ARTISTS } from '@/lib/data/members';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { Artist } from '@/types';

export default function ArtistsDirectoryPage() {
  const { addBooking } = usePorjotok();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [inquiryDate, setInquiryDate] = useState('2026-11-20');
  const [inquiryConfirmedId, setInquiryConfirmedId] = useState<string | null>(null);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArtist) return;

    const bookingId = addBooking({
      serviceType: 'ARTIST',
      itemTitle: `${selectedArtist.name} Cultural Performance`,
      providerName: selectedArtist.name,
      date: inquiryDate,
      time: '06:30 PM',
      guestsCount: 1,
      totalAmount: selectedArtist.performanceCharge
    });

    setInquiryConfirmedId(bookingId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 text-xs font-semibold">
          <Music className="w-3.5 h-3.5" />
          <span>Folk Performers & Classical Masters • Heritage Music & Dance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Local Artists & Folk Performers
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Book authentic live acoustic performances: mystic Baul minstrels of Birbhum, martial Purulia Chhau troupes, and classical Dhrupad masters of the Bishnupur Gharana.
        </p>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CANONICAL_ARTISTS.map((art) => (
          <div
            key={art.id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-purple-500/40">
                  <img src={art.photo} alt={art.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 truncate">
                      {art.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  {art.bengaliName && (
                    <p className="text-xs text-stone-400">{art.bengaliName}</p>
                  )}
                  <p className="text-xs text-purple-700 dark:text-purple-400 font-semibold mt-1">
                    {art.artForm}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 inline-block mt-1">
                    {art.groupType} Ensemble • {art.district}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {art.bio}
              </p>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Repertoire Samples
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {art.portfolioSamples.map(sample => (
                    <span key={sample} className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 text-xs">
                      ♪ {sample}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Performance Fee</span>
                <span className="text-xl font-black text-stone-900 dark:text-stone-100">₹{art.performanceCharge}</span>
              </div>

              <button
                onClick={() => {
                  setSelectedArtist(art);
                  setInquiryConfirmedId(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Performance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Inquiry Modal */}
      {selectedArtist && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedArtist(null)}
        >
          <div 
            className="relative max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Book Folk Performance
                </h3>
              </div>
              <button 
                onClick={() => setSelectedArtist(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquiryConfirmedId ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">Performance Inquired!</h4>
                <p className="text-xs text-stone-500">
                  Booking Reference: <strong className="text-purple-600 font-mono">{inquiryConfirmedId}</strong>
                </p>
                <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-xs text-purple-900 dark:text-purple-200 text-left">
                  Artist troupe <strong>{selectedArtist.name}</strong> has been notified for {inquiryDate}. Check details in your <em>Visitor Dashboard</em>.
                </div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Close & View in Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{selectedArtist.name}</h4>
                  <p className="text-stone-500">{selectedArtist.artForm} • {selectedArtist.location}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Select Event Date</label>
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    required
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Estimated Ensemble Honorarium</span>
                  <span className="text-base font-black text-purple-600">₹{selectedArtist.performanceCharge}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
