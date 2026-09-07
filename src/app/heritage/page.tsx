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
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NAME' | 'DISTRICT'>('NAME');

  const districts = useMemo(() => {
    const list = Array.from(new Set(CANONICAL_HERITAGE_SITES.map(s => s.district))).sort();
    return ['ALL', ...list];
  }, []);

  const siteTypes = useMemo(() => {
    return ['ALL', 'MONUMENT', 'ARCHITECTURE', 'RELIGIOUS_SITE', 'COLONIAL_HERITAGE', 'NATURAL_HERITAGE', 'HISTORICAL_PERSONALITY'];
  }, []);

  const filteredSites = useMemo(() => {
    return CANONICAL_HERITAGE_SITES.filter(site => {
      const matchesSearch = 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.bengaliName?.includes(searchQuery) ||
        site.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDistrict = selectedDistrict === 'ALL' || site.district === selectedDistrict;
      const matchesType = selectedType === 'ALL' || site.siteType === selectedType;

      return matchesSearch && matchesDistrict && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'DISTRICT') return a.district.localeCompare(b.district);
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedDistrict, selectedType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5" />
          <span>Canonical Catalogue • 55 Verified Heritage Sites</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Heritage Sites of West Bengal
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Explore ancient Buddhist ruins, terracotta masterpieces of the Malla kings, medieval Sultanate mosques of Gour and Pandua, Nawabi palaces of Murshidabad, and colonial landmarks.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, Bengali script, or history..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* District Select */}
          <div className="md:col-span-3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              {districts.map(d => (
                <option key={d} value={d}>
                  {d === 'ALL' ? 'All Districts of Bengal' : `${d} District`}
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
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'NAME' | 'DISTRICT')}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="NAME">Sort by Name</option>
              <option value="DISTRICT">Sort by District</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span>Showing <strong>{filteredSites.length}</strong> of {CANONICAL_HERITAGE_SITES.length} canonical sites</span>
          {(searchQuery || selectedDistrict !== 'ALL' || selectedType !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 backdrop-blur-md">
                    {site.district}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-600 text-white">
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
                  {site.bengaliName && (
                    <p className="text-xs text-stone-400 font-medium">{site.bengaliName}</p>
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
