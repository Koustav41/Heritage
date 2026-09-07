'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Filter, ArrowRight, Sparkles, Landmark, Compass, ChevronRight } from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';

export default function KnowledgeArchivePage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'ALL' | 'SITES' | 'CULTURES'>('ALL');

  const combinedEntries = useMemo(() => {
    const siteEntries = CANONICAL_HERITAGE_SITES.map(s => ({
      id: s.id,
      title: s.name,
      bengaliTitle: s.bengaliName,
      category: s.siteType,
      type: 'SITE' as const,
      slug: `/heritage/${s.slug}`,
      summary: s.shortDescription,
      region: s.district,
      period: s.historicalPeriod,
      image: s.featuredImage
    }));

    const cultureEntries = CANONICAL_CULTURE_ENTRIES.map(c => ({
      id: c.id,
      title: c.name,
      bengaliTitle: c.bengaliName,
      category: c.category,
      type: 'CULTURE' as const,
      slug: `/culture/${c.slug}`,
      summary: c.shortDescription,
      region: c.geographicAssociation,
      period: c.historicalPeriod,
      image: c.featuredImage
    }));

    return [...siteEntries, ...cultureEntries];
  }, []);

  const filteredEntries = useMemo(() => {
    return combinedEntries.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.bengaliTitle?.includes(query) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.region.toLowerCase().includes(query.toLowerCase());

      const matchesTab = 
        tab === 'ALL' || 
        (tab === 'SITES' && item.type === 'SITE') || 
        (tab === 'CULTURES' && item.type === 'CULTURE');

      return matchesQuery && matchesTab;
    });
  }, [combinedEntries, query, tab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Porjotok Knowledge Repository • 70+ Indexed Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Heritage & Cultural Knowledge Archive
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          The verified knowledge core of Porjotok. Access grounded historical documentation, architectural analyses, oral traditions, and geographical records.
        </p>
      </div>

      {/* Search & Tab bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search knowledge repository by keyword, district, or era..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 self-start">
            <button
              onClick={() => setTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'ALL' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'
              }`}
            >
              All Records ({combinedEntries.length})
            </button>
            <button
              onClick={() => setTab('SITES')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'SITES' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'
              }`}
            >
              Heritage Sites (55)
            </button>
            <button
              onClick={() => setTab('CULTURES')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === 'CULTURES' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'
              }`}
            >
              Living Culture (15)
            </button>
          </div>
        </div>

        <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          Showing <strong>{filteredEntries.length}</strong> knowledge records
        </div>
      </div>

      {/* Archive Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((item) => (
          <Link
            key={item.id}
            href={item.slug}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.type === 'SITE' 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200' 
                    : 'bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200'
                }`}>
                  {item.type === 'SITE' ? '🏛️ Heritage Site' : '🪔 Living Culture'}
                </span>
                <span className="text-[11px] text-stone-400">{item.period}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                {item.bengaliTitle && (
                  <p className="text-xs text-stone-400">{item.bengaliTitle}</p>
                )}
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span className="truncate max-w-[160px]">{item.region}</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
