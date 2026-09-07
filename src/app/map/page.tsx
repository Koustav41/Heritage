'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  Filter, 
  Landmark, 
  Utensils, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Compass,
  X,
  Clock,
  Ticket
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_GUIDES } from '@/lib/data/members';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { CANONICAL_WORKSHOPS } from '@/lib/data/workshops';
import { HeritageSite } from '@/types';

type MapCategory = 'ALL' | 'HERITAGE' | 'FOOD' | 'GUIDES' | 'WORKSHOPS';

export default function InteractiveHeritageMapPage() {
  const [selectedCategory, setSelectedCategory] = useState<MapCategory>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(CANONICAL_HERITAGE_SITES[0]);

  const districts = ['ALL', ...Array.from(new Set(CANONICAL_HERITAGE_SITES.map(s => s.district))).sort()];

  const filteredSites = useMemo(() => {
    return CANONICAL_HERITAGE_SITES.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.bengaliName?.includes(searchQuery) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDistrict = selectedDistrict === 'ALL' || s.district === selectedDistrict;
      return matchSearch && matchDistrict;
    });
  }, [searchQuery, selectedDistrict]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Bengal Cartography • 55 Coordinates Plotted</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-1">
            Heritage & Tourism Map of Bengal
          </h1>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search map markers..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 outline-none"
            />
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 outline-none"
          >
            {districts.map(d => (
              <option key={d} value={d}>{d === 'ALL' ? 'All Districts' : d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Container & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Map Canvas (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl relative min-h-[560px] flex flex-col">
          
          {/* Map Controls Header */}
          <div className="p-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-1.5">
              {(['ALL', 'HERITAGE', 'FOOD', 'GUIDES', 'WORKSHOPS'] as MapCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-amber-600 text-white shadow-xs' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-stone-500">
              Showing <strong>{filteredSites.length}</strong> points on map
            </span>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="relative flex-1 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100/40 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Compass Rose */}
            <div className="absolute top-4 right-4 p-2 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center text-[10px] font-bold text-amber-700 dark:text-amber-400">
              <span>N</span>
              <Compass className="w-5 h-5 my-0.5 text-amber-600" />
              <span>S</span>
            </div>

            {/* Simulated Geospatial Grid of Markers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 z-10 my-auto">
              {filteredSites.slice(0, 12).map((site) => {
                const isSelected = selectedSite?.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-105 z-20'
                        : 'bg-white/90 dark:bg-stone-900/90 hover:bg-amber-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold opacity-80 mb-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{site.district}</span>
                    </div>
                    <div className="font-bold text-xs truncate leading-snug">
                      {site.name}
                    </div>
                    <div className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                      {site.coordinates.lat.toFixed(2)}°N, {site.coordinates.lng.toFixed(2)}°E
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Geospatial Info bar */}
            <div className="mt-4 p-3 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">West Bengal Geospatial Grid</span>
              </div>
              <span className="text-[11px] text-stone-400">Lat: 21.5°N - 27.2°N | Long: 85.8°E - 89.9°E</span>
            </div>

          </div>

        </div>

        {/* Right Selected Site Detail Drawer (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl p-6 space-y-6">
          {selectedSite ? (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <img src={selectedSite.featuredImage} alt={selectedSite.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                  {selectedSite.district}
                </span>
              </div>

              <div>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  {selectedSite.historicalPeriod}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                  {selectedSite.name}
                </h3>
                {selectedSite.bengaliName && (
                  <p className="text-xs text-stone-400 font-medium">{selectedSite.bengaliName}</p>
                )}
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {selectedSite.shortDescription}
              </p>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Visiting Hours:</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedSite.visitingHours.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Entry:</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedSite.entryFee.split('+')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">GPS Coordinates:</span>
                  <span className="font-mono text-amber-600 font-semibold">{selectedSite.coordinates.lat.toFixed(4)}°N, {selectedSite.coordinates.lng.toFixed(4)}°E</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href={`/heritage/${selectedSite.slug}`}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Open Full Heritage Archive</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedSite.coordinates.lat},${selectedSite.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-stone-400 text-xs">
              <MapPin className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p>Click any map marker to inspect its heritage archive profile.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
