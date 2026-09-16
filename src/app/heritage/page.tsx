'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Landmark, 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  Heart, 
  ChevronRight, 
  Calendar, 
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { usePorjotok } from '@/lib/store/porjotok-context';
import { SiteCategory } from '@/types';

export default function HeritageDirectoryPage() {
  const { savedSiteSlugs, toggleSaveSite } = usePorjotok();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NAME' | 'STATE' | 'DISTRICT'>('STATE');

  const states = useMemo(() => {
    const list = Array.from(new Set(CANONICAL_HERITAGE_SITES.map(s => s.state))).sort();
    return ['ALL', ...list];
  }, []);

  const districts = useMemo(() => {
    const sitePool = selectedState === 'ALL' 
      ? CANONICAL_HERITAGE_SITES 
      : CANONICAL_HERITAGE_SITES.filter(s => s.state === selectedState);
    const list = Array.from(new Set(sitePool.map(s => s.district))).sort();
    return ['ALL', ...list];
  }, [selectedState]);

  const siteTypes = useMemo(() => {
    return ['ALL', 'MONUMENT', 'ARCHITECTURE', 'RELIGIOUS_SITE', 'COLONIAL_HERITAGE', 'NATURAL_HERITAGE', 'HISTORICAL_PERSONALITY'];
  }, []);

  const filteredSites = useMemo(() => {
    return CANONICAL_HERITAGE_SITES.filter(site => {
      const matchesSearch = 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.nativeName?.includes(searchQuery) ||
        site.bengaliName?.includes(searchQuery) ||
        site.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === 'ALL' || site.state === selectedState;
      const matchesDistrict = selectedDistrict === 'ALL' || site.district === selectedDistrict;
      const matchesType = selectedType === 'ALL' || site.siteType === selectedType;

      return matchesSearch && matchesState && matchesDistrict && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'STATE') {
        const stateDiff = a.state.localeCompare(b.state);
        return stateDiff !== 0 ? stateDiff : a.name.localeCompare(b.name);
      }
      if (sortBy === 'DISTRICT') return a.district.localeCompare(b.district);
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedState, selectedDistrict, selectedType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5" />
          <span>Pan-India Canonical Catalogue • {CANONICAL_HERITAGE_SITES.length} Verified Heritage Sites across {states.length - 1} States</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Heritage Places of India
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
          Explore iconic UNESCO World Heritage wonders, majestic Rajput fortresses, thousand-year-old Chola stone temples, rock-cut Ellora & Ajanta caves, Buddhist sanctuaries, and architectural marvels across every region of India.
        </p>
      </div>

      {/* Quick State Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-bold text-stone-500 shrink-0 uppercase tracking-wider">State:</span>
        {states.map(st => (
          <button
            key={st}
            onClick={() => {
              setSelectedState(st);
              setSelectedDistrict('ALL');
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
              selectedState === st
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
            }`}
          >
            {st === 'ALL' ? 'All of India' : st}
          </button>
        ))}
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument name, state, or era..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* State Select */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('ALL');
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              {states.map(s => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All Indian States' : s}
                </option>
              ))}
            </select>
          </div>

          {/* District Select */}
          <div className="md:col-span-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              {districts.map(d => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'All Districts' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Type Select */}
          <div className="md:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              {siteTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'ALL' ? 'All Categories' : t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'NAME' | 'STATE' | 'DISTRICT')}
              className="w-full px-2 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="STATE">State</option>
              <option value="NAME">Name</option>
              <option value="DISTRICT">District</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span>Showing <strong>{filteredSites.length}</strong> of {CANONICAL_HERITAGE_SITES.length} canonical sites across India</span>
          {(searchQuery || selectedState !== 'ALL' || selectedDistrict !== 'ALL' || selectedType !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('ALL');
                setSelectedDistrict('ALL');
                setSelectedType('ALL');
              }}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => (
          <div
            key={site.id}
            className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Featured Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={site.featuredImage}
                  alt={site.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                    {site.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 backdrop-blur-md">
                    {site.district}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 text-white">
                    {site.siteType.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={() => toggleSaveSite(site.slug)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors"
                  title="Bookmark site"
                >
                  <Heart className={`w-3.5 h-3.5 ${savedSiteSlugs.includes(site.slug) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                  <span>{site.historicalPeriod}</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                    {site.name}
                  </h3>
                  {(site.nativeName || site.bengaliName) && (
                    <p className="text-xs text-stone-400 font-medium">{site.nativeName || site.bengaliName}</p>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {site.shortDescription}
                </p>

                {site.historicalPersonalities.length > 0 && (
                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <span className="font-medium text-stone-700 dark:text-stone-300">Associated:</span>
                    <span className="truncate">{site.historicalPersonalities.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-stone-500 truncate max-w-[140px]">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                <span className="truncate">{site.address.split(',')[0]}</span>
              </div>

              <Link
                href={`/heritage/${site.slug}`}
                className="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 shrink-0"
              >
                <span>Full Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <div className="py-20 text-center text-stone-500 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <Compass className="w-12 h-12 mx-auto text-amber-500/40 mb-3" />
          <p className="text-lg font-bold text-stone-800 dark:text-stone-200">No heritage sites found</p>
          <p className="text-xs text-stone-400 mt-1">Try clearing your filters or changing the search query.</p>
        </div>
      )}

    </div>
  );
}
