'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ChevronRight, 
  MapPin, 
  Users, 
  Calendar,
  Compass,
  Filter
} from 'lucide-react';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';
import { CultureCategory } from '@/types';

export default function CultureDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');

  const categories = useMemo(() => {
    return ['ALL', 'FESTIVAL', 'MUSIC', 'DANCE', 'CRAFT', 'PAINTING', 'TEXTILE', 'FOOD_CULTURE', 'FAIR', 'CULTURAL_EVENT'];
  }, []);

  const allStates = useMemo(() => {
    const states = Array.from(new Set(CANONICAL_CULTURE_ENTRIES.map(c => c.state).filter(Boolean))).sort();
    return ['ALL', ...states];
  }, []);

  const filteredCultures = useMemo(() => {
    return CANONICAL_CULTURE_ENTRIES.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.bengaliName?.includes(searchQuery) ||
        c.nativeName?.includes(searchQuery) ||
        c.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.geographicAssociation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
      const matchesState = selectedState === 'ALL' || c.state === selectedState;

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedCategory, selectedState]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Living Traditions & Arts • Intangible Cultural Heritage of India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Living Culture & Intangible Heritage of India
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          From UNESCO-inscribed Durga Puja, Garba, and the sacred Kumbh Mela to wandering Baul minstrels, Kerala’s Kathakali & Theyyam, Rajasthan’s serpentine Kalbelia, Madhubani ritual paintings, Assamese Bihu, and timeless Vedic chanting across Indian states.
        </p>
      </div>

      {/* State Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-orange-600" />
          State:
        </span>
        {allStates.map(st => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedState === st
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-orange-300'
            }`}
          >
            {st === 'ALL' ? 'All India (27 Traditions)' : st}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search festivals, dance, state, music, or craft traditions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-orange-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Cultural Dimensions' : cat.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span>Showing <strong>{filteredCultures.length}</strong> living traditions {selectedState !== 'ALL' && `in ${selectedState}`}</span>
          {(searchQuery || selectedCategory !== 'ALL' || selectedState !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedState('ALL');
              }}
              className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Culture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCultures.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={item.featuredImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-600 text-white shadow-sm">
                    {item.category.replace('_', ' ')}
                  </span>
                  {item.state && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 backdrop-blur-md text-amber-300 border border-white/20">
                      {item.state}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  {(item.nativeName || item.bengaliName) && (
                    <p className="text-xs text-stone-400 font-medium">{item.nativeName || item.bengaliName}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {item.shortDescription}
                </p>

                <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item.geographicAssociation}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item.practitioners}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 dark:border-stone-800 mt-3 flex items-center justify-between text-xs">
              <span className="text-stone-400 text-[11px] font-medium">{item.historicalPeriod}</span>
              <Link
                href={`/culture/${item.slug}`}
                className="font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1"
              >
                <span>Read Tradition</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
