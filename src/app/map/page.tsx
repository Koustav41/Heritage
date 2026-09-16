'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  Filter, 
  Landmark, 
  Utensils, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Compass,
  X,
  Clock,
  Ticket,
  Globe2,
  Layers,
  Map as MapIcon,
  Grid,
  Info,
  Navigation
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { HeritageSiteImage } from '@/components/HeritageSiteImage';
import { HeritageSite } from '@/types';

type RegionFilter = 'ALL' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTRAL' | 'NORTHEAST';
type SiteTypeFilter = 'ALL' | 'MONUMENT' | 'RELIGIOUS_SITE' | 'ARCHITECTURE' | 'COLONIAL_HERITAGE' | 'NATURAL_HERITAGE';

const REGIONS: { id: RegionFilter; label: string; states: string[] }[] = [
  { id: 'ALL', label: 'All India', states: [] },
  { id: 'NORTH', label: 'North India', states: ['Delhi', 'Uttar Pradesh', 'Rajasthan', 'Punjab'] },
  { id: 'SOUTH', label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Telangana'] },
  { id: 'EAST', label: 'East India', states: ['West Bengal', 'Odisha', 'Bihar'] },
  { id: 'WEST', label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan'] },
  { id: 'CENTRAL', label: 'Central India', states: ['Madhya Pradesh'] },
  { id: 'NORTHEAST', label: 'Northeast India', states: ['Assam'] },
];

const SITE_TYPES: { id: SiteTypeFilter; label: string }[] = [
  { id: 'ALL', label: 'All Heritage Types' },
  { id: 'MONUMENT', label: 'Forts & Monuments' },
  { id: 'RELIGIOUS_SITE', label: 'Temples & Sacred Shrines' },
  { id: 'ARCHITECTURE', label: 'Rock-Cut & Palace Architecture' },
  { id: 'COLONIAL_HERITAGE', label: 'Colonial & Maritime' },
  { id: 'NATURAL_HERITAGE', label: 'Eco & Delta Heritage' }
];

// Mathematical projection of India's latitude & longitude onto map canvas percentage
// Latitude bounds: 8.0° N (Kanyakumari) to 35.5° N (Kashmir/Ladakh)
// Longitude bounds: 68.0° E (Gujarat) to 97.5° E (Arunachal Pradesh)
function getCoordinatesPercent(lat: number, lng: number): { x: number; y: number } {
  const minLng = 68.0;
  const maxLng = 97.5;
  const minLat = 8.0;
  const maxLat = 35.5;

  const rawX = ((lng - minLng) / (maxLng - minLng)) * 100;
  const rawY = ((maxLat - lat) / (maxLat - minLat)) * 100;

  // Clamp within container padding
  const x = Math.max(5, Math.min(95, rawX));
  const y = Math.max(6, Math.min(94, rawY));
  return { x, y };
}

export default function InteractiveHeritageMapPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('ALL');
  const [selectedSiteType, setSelectedSiteType] = useState<SiteTypeFilter>('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');
  const [hoveredSite, setHoveredSite] = useState<HeritageSite | null>(null);

  // Default to Taj Mahal (first Pan-India site) or first item
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(
    CANONICAL_HERITAGE_SITES.find(s => s.id === 'taj-mahal') || CANONICAL_HERITAGE_SITES[0]
  );

  // State options with counts
  const statesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CANONICAL_HERITAGE_SITES.forEach(s => {
      counts[s.state] = (counts[s.state] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, []);

  // Filtered sites based on region, state, site type, and search query
  const filteredSites = useMemo(() => {
    const activeRegionObj = REGIONS.find(r => r.id === selectedRegion);

    return CANONICAL_HERITAGE_SITES.filter(site => {
      // Region match
      const matchRegion = selectedRegion === 'ALL' || 
        (activeRegionObj && activeRegionObj.states.includes(site.state));

      // State match
      const matchState = selectedState === 'ALL' || site.state === selectedState;

      // Type match
      const matchType = selectedSiteType === 'ALL' || site.siteType === selectedSiteType;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        site.name.toLowerCase().includes(q) ||
        site.district.toLowerCase().includes(q) ||
        site.state.toLowerCase().includes(q) ||
        site.nativeName?.toLowerCase().includes(q) ||
        site.historicalPeriod.toLowerCase().includes(q) ||
        site.shortDescription.toLowerCase().includes(q);

      return matchRegion && matchState && matchType && matchSearch;
    });
  }, [selectedRegion, selectedState, selectedSiteType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Heading */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Cartography of India • {CANONICAL_HERITAGE_SITES.length} Canonical Coordinates Plotted</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Pan-India Heritage & Geospatial Map
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
            Explore authentic historical monuments, sacred shrines, ancient rock-cut caves, and Mughal-Rajput fortresses plotted across all Indian states and geographical zones.
          </p>
        </div>

        {/* View Switcher & Quick Stats */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('MAP')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'MAP' 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Geospatial Map</span>
            </button>
            <button
              onClick={() => setViewMode('GRID')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'GRID' 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Directory ({filteredSites.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 text-xs">
        
        {/* Top Controls: Search + State Selector */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument, city, state, or era..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-stone-400 font-medium shrink-0">State:</span>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedRegion('ALL');
              }}
              className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none font-medium focus:ring-1 focus:ring-amber-500"
            >
              <option value="ALL">All 15+ Indian States ({CANONICAL_HERITAGE_SITES.length} sites)</option>
              {statesWithCounts.map(st => (
                <option key={st.name} value={st.name}>
                  {st.name} ({st.count} {st.count === 1 ? 'site' : 'sites'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-stone-100 dark:border-stone-800">
          <span className="text-[11px] font-bold text-stone-400 mr-1 uppercase tracking-wider">Region:</span>
          {REGIONS.map(reg => {
            const isSelected = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => {
                  setSelectedRegion(reg.id);
                  setSelectedState('ALL');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>

        {/* Site Type Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-stone-400 mr-1 uppercase tracking-wider">Category:</span>
          {SITE_TYPES.map(type => {
            const isSelected = selectedSiteType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedSiteType(type.id)}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-400 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-stone-300'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Map Container & Right Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Canvas / Directory (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl relative min-h-[640px] flex flex-col">
          
          {/* Header Bar */}
          <div className="p-3.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold text-xs text-stone-800 dark:text-stone-200">
                Plotting {filteredSites.length} of {CANONICAL_HERITAGE_SITES.length} Heritage Coordinates
              </span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-3">
              <span className="hidden sm:inline">Lat: 8.0°N - 35.5°N</span>
              <span className="hidden sm:inline">Long: 68.0°E - 97.5°E</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                WGS-84 Projected
              </span>
            </div>
          </div>

          {viewMode === 'MAP' ? (
            /* Visual Geospatial Cartographic Canvas */
            <div className="relative flex-1 bg-gradient-to-br from-amber-50/60 via-stone-50 to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 p-6 min-h-[600px] flex flex-col justify-between overflow-hidden select-none">
              
              {/* Compass Rose */}
              <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-md flex flex-col items-center text-[10px] font-bold text-amber-700 dark:text-amber-400 z-10">
                <span>N</span>
                <Compass className="w-6 h-6 my-1 text-amber-600 animate-spin-slow" />
                <span>S</span>
              </div>

              {/* Geographic Labels & Watermark Outlines of India */}
              <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40 dark:opacity-25">
                <svg viewBox="0 0 1000 1000" className="w-full h-full text-stone-300 dark:text-stone-700 fill-current">
                  {/* Stylized Contour Representation of India */}
                  <path d="M 320,120 L 370,110 L 420,140 L 490,190 L 510,230 L 600,240 L 670,250 L 760,240 L 850,260 L 880,310 L 830,360 L 750,380 L 680,410 L 650,470 L 620,530 L 550,650 L 480,780 L 420,880 L 400,920 L 380,880 L 350,780 L 310,690 L 260,610 L 230,550 L 210,480 L 200,440 L 170,410 L 190,360 L 220,330 L 270,300 L 280,240 L 310,180 Z" 
                        fill="currentColor" 
                        fillOpacity="0.15" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 pointer-events-none border border-stone-200/50 dark:border-stone-800/50 grid grid-cols-4 grid-rows-4 z-0">
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">32°N, 72°E</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">32°N, 80°E</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">32°N, 88°E</div>
                <div className="border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400 text-right">Himalayas</div>
                
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">24°N, 72°E</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Indo-Gangetic</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">24°N, 88°E</div>
                <div className="border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400 text-right">Brahmaputra</div>

                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Arabian Sea</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Deccan Plateau</div>
                <div className="border-r border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Bay of Bengal</div>
                <div className="border-b border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400 text-right">East Coast</div>

                <div className="border-r border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Lakshadweep</div>
                <div className="border-r border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">8°N, 80°E</div>
                <div className="border-r border-stone-200/30 dark:border-stone-800/30 p-2 text-[9px] font-mono text-stone-400">Indian Ocean</div>
                <div className="p-2 text-[9px] font-mono text-stone-400 text-right">Andaman Sea</div>
              </div>

              {/* Plotted Interactive Coordinates */}
              <div className="absolute inset-0 z-10">
                {filteredSites.map((site) => {
                  const coords = getCoordinatesPercent(site.coordinates.lat, site.coordinates.lng);
                  const isSelected = selectedSite?.id === site.id;
                  const isHovered = hoveredSite?.id === site.id;

                  return (
                    <div
                      key={site.id}
                      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      onClick={() => setSelectedSite(site)}
                      onMouseEnter={() => setHoveredSite(site)}
                      onMouseLeave={() => setHoveredSite(null)}
                    >
                      {/* Outer pulsing ring for selected or featured monuments */}
                      {(isSelected || site.featured) && (
                        <span className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                          isSelected ? 'bg-amber-500' : 'bg-orange-400'
                        }`} />
                      )}

                      {/* Map Pin Marker */}
                      <div className={`relative flex items-center justify-center rounded-full transition-all duration-200 shadow-md ${
                        isSelected 
                          ? 'w-7 h-7 bg-amber-600 text-white ring-4 ring-amber-300 dark:ring-amber-900 scale-125 z-30' 
                          : isHovered
                          ? 'w-6 h-6 bg-orange-500 text-white ring-2 ring-white scale-110 z-20'
                          : site.state === 'West Bengal'
                          ? 'w-4 h-4 bg-amber-500/90 text-white hover:scale-125 hover:bg-amber-600'
                          : 'w-5 h-5 bg-orange-600 text-white ring-1 ring-white/90 hover:scale-125'
                      }`}>
                        <Landmark className={isSelected ? 'w-4 h-4' : 'w-2.5 h-2.5'} />
                      </div>

                      {/* Tooltip on Hover */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 rounded-xl bg-stone-900 text-white text-[11px] shadow-xl pointer-events-none transition-all z-40 ${
                        isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}>
                        <div className="font-bold truncate text-amber-300">{site.name}</div>
                        <div className="text-[10px] text-stone-300 flex items-center justify-between mt-0.5">
                          <span>{site.district}, {site.state}</span>
                          <span className="font-mono text-amber-400">{site.coordinates.lat.toFixed(1)}°N</span>
                        </div>
                        <div className="text-[9px] text-stone-400 truncate mt-0.5">
                          {site.siteType.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick-Info Bar */}
              <div className="mt-auto pt-4 relative z-10">
                <div className="p-3 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                      <span className="w-3 h-3 rounded-full bg-orange-600 inline-block"></span>
                      Pan-India Monuments ({CANONICAL_HERITAGE_SITES.filter(s => s.state !== 'West Bengal').length})
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                      Bengal Heritage ({CANONICAL_HERITAGE_SITES.filter(s => s.state === 'West Bengal').length})
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-500">
                    Click any marker to inspect archive record & directions
                  </span>
                </div>
              </div>

            </div>
          ) : (
            /* Directory Grid View */
            <div className="p-6 overflow-y-auto max-h-[640px] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSites.map((site) => {
                  const isSelected = selectedSite?.id === site.id;
                  return (
                    <div
                      key={site.id}
                      onClick={() => setSelectedSite(site)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex gap-3.5 items-start ${
                        isSelected
                          ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-400'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300 shadow-xs'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-xs">
                        <HeritageSiteImage site={site} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-amber-700 dark:text-amber-400 truncate">{site.state}</span>
                          <span className="font-mono text-stone-400">{site.coordinates.lat.toFixed(1)}°N, {site.coordinates.lng.toFixed(1)}°E</span>
                        </div>
                        <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                          {site.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-snug">
                          {site.shortDescription}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Selected Site Detail Drawer (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl p-6 space-y-5">
          {selectedSite ? (
            <div className="space-y-4">
              
              {/* Site Photo */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <HeritageSiteImage site={selectedSite} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                    {selectedSite.state}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900/80 text-stone-200 backdrop-blur-md">
                    {selectedSite.district}
                  </span>
                </div>

                {selectedSite.verified && (
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Archive
                  </span>
                )}
              </div>

              {/* Title & Native Name */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                    {selectedSite.historicalPeriod}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {selectedSite.constructionPeriod}
                  </span>
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-0.5">
                  {selectedSite.name}
                </h3>
                {selectedSite.nativeName && (
                  <p className="text-xs text-stone-500 font-medium">{selectedSite.nativeName}</p>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {selectedSite.shortDescription}
              </p>

              {/* Metadata Badges */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Timings:
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedSite.visitingHours.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Ticket className="w-3 h-3 text-amber-600" />
                    Entry:
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedSite.entryFee.split('+')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-amber-600" />
                    Coordinates:
                  </span>
                  <span className="font-mono text-amber-600 font-semibold">{selectedSite.coordinates.lat.toFixed(4)}°N, {selectedSite.coordinates.lng.toFixed(4)}°E</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href={`/heritage/${selectedSite.slug}`}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
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
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Audio Story Preview */}
              {selectedSite.audioStory && (
                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] space-y-1">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block">Oral Heritage Story:</span>
                  <p className="text-stone-600 dark:text-stone-400 italic">
                    &ldquo;{selectedSite.audioStory}&rdquo;
                  </p>
                </div>
              )}

            </div>
          ) : (
            <div className="py-24 text-center text-stone-400 text-xs">
              <MapPin className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p>Click any map marker across India to inspect its heritage archive profile.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
