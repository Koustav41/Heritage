'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, Users, MapPin, CheckCircle2, X } from 'lucide-react';
import { CANONICAL_CLEANLINESS_CREWS } from '@/lib/data/members';
import { CANONICAL_FUNDRAISERS } from '@/lib/data/fundraisers';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { Fundraiser } from '@/types';

export default function CleanlinessPage() {
  const { fundraisers, donateToFundraiser } = usePorjotok();
  const [selectedFundraiser, setSelectedFundraiser] = useState<Fundraiser | null>(null);
  const [donationAmount, setDonationAmount] = useState(500);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const activeFunds = fundraisers.filter(f => f.status === 'ACTIVE');
  const pendingFunds = fundraisers.filter(f => f.status === 'PENDING_APPROVAL');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFundraiser) return;
    donateToFundraiser(selectedFundraiser.id, donationAmount);
    setDonationSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Community Care • Responsible Heritage Preservation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Cleanliness Drives & Heritage Guardians
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Cleanliness crews protect fragile terracotta temple sanctuaries and clear festive floral offerings from the sacred Hooghly riverbanks. All fundraisers require admin vetting.
        </p>
      </div>

      {/* Active Fundraisers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
            Active Community Fundraisers (Admin Approved)
          </h2>
          <span className="text-xs font-semibold text-emerald-600">
            {activeFunds.length} Drives Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeFunds.map((fund) => {
            const progress = Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100));
            return (
              <div
                key={fund.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-teal-700 dark:text-teal-400">{fund.crewName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      ✓ Admin Vetted
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                    {fund.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {fund.purpose}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{fund.location}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold" suppressHydrationWarning>
                      <span className="text-stone-900 dark:text-stone-100" suppressHydrationWarning>₹{fund.raisedAmount.toLocaleString('en-IN')} raised</span>
                      <span className="text-teal-600" suppressHydrationWarning>{progress}% of ₹{fund.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500">{fund.donorsCount} contributors</span>
                  <button
                    onClick={() => {
                      setSelectedFundraiser(fund);
                      setDonationSuccess(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Contribute / Donate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Volunteer Cleanliness Crews Roster */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          Enlisted Volunteer Crews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CANONICAL_CLEANLINESS_CREWS.map((crew) => (
            <div
              key={crew.id}
              className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-start gap-4"
            >
              <img src={crew.photo} alt={crew.crewName} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">{crew.crewName}</h3>
                  <span className="text-teal-600 font-semibold">{crew.district}</span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{crew.description}</p>
                <div className="flex items-center gap-4 text-stone-500 font-medium pt-1">
                  <span>🧹 {crew.cleanupsCompleted} Cleanups Done</span>
                  <span suppressHydrationWarning>♻️ {crew.wasteDivertedKg.toLocaleString('en-IN')} kg Diverted</span>
                  <span>👥 {crew.membersCount} Volunteers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Modal */}
      {selectedFundraiser && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedFundraiser(null)}
        >
          <div 
            className="relative max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600 fill-teal-600" />
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Support Cleanliness Initiative
                </h3>
              </div>
              <button 
                onClick={() => setSelectedFundraiser(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {donationSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100">Thank You For Your Support!</h4>
                <p className="text-xs text-stone-500">
                  You contributed <strong>₹{donationAmount}</strong> to <em>{selectedFundraiser.title}</em>.
                </p>
                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-xs text-teal-900 dark:text-teal-200">
                  🪙 +25 Heritage Civic Points awarded to your profile!
                </div>
                <button
                  onClick={() => setSelectedFundraiser(null)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonate} className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{selectedFundraiser.title}</h4>
                  <p className="text-stone-500">{selectedFundraiser.crewName} • {selectedFundraiser.location}</p>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Choose Donation Amount</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[200, 500, 1000].map(amt => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setDonationAmount(amt)}
                        className={`py-2 rounded-xl font-bold border transition-all ${
                          donationAmount === amt 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Or Enter Custom Amount (₹)</label>
                  <input
                    type="number"
                    min={50}
                    max={50000}
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Confirm Contribution (₹{donationAmount})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
