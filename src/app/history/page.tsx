'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Landmark, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { HISTORICAL_MILESTONES } from '@/lib/data/history-timeline';

export default function HistoryTimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string>('ALL');

  const eras = [
    { id: 'ALL', label: 'All Civilizational Epochs' },
    { id: 'ANCIENT', label: 'Indus, Maurya & Ancient' },
    { id: 'MEDIEVAL', label: 'Chola, Mughal & Vijayanagara' },
    { id: 'NAWABI', label: 'Nawabs & Regional Courts' },
    { id: 'COLONIAL_RENAISSANCE', label: 'Indian Renaissance' },
    { id: 'FREEDOM_STRUGGLE', label: 'Freedom Struggle & Swaraj' }
  ];

  const filteredMilestones = selectedEra === 'ALL'
    ? HISTORICAL_MILESTONES
    : HISTORICAL_MILESTONES.filter(m => m.era === selectedEra);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Deep Historical Archive • Millennia of Indian Civilization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Timeline of Indian Civilization
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Journey from the ancient brick cities of the Indus Valley and Emperor Ashoka’s Dhamma pillars through the Imperial Cholas, Vijayanagara at Hampi, Mughal architectural splendors, the Indian Renaissance, and the epic national struggle for Swaraj.
        </p>
      </div>

      {/* Epoch Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {eras.map(era => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedEra === era.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-amber-300 dark:border-amber-800 ml-4 sm:ml-6 space-y-12">
        {filteredMilestones.map((item, index) => (
          <div key={item.id} className="relative pl-6 sm:pl-10 space-y-4">
            
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-stone-900 border-4 border-amber-600 flex items-center justify-center text-xs font-bold text-amber-600 shadow-md">
              {index + 1}
            </div>

            {/* Content Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {item.era.replace('_', ' ')}
                  </span>
                  <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                    {item.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 self-start sm:self-auto">
                  {item.yearRange}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                    {item.detailedHistory}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Major Historical Personalities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.majorPersonalities.map(p => (
                        <span key={p} className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5">
                          <User className="w-3 h-3 text-amber-600" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                      Canonical Monuments of this Era
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.relatedSites.map(site => (
                        <span key={site} className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
                          {site}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
