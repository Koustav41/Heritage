'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Calendar, 
  ArrowLeft, 
  Landmark, 
  BookOpen, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';

export default function CultureDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const culture = CANONICAL_CULTURE_ENTRIES.find(c => c.slug === slug);

  if (!culture) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <Sparkles className="w-16 h-16 mx-auto text-orange-600/40" />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tradition Record Not Found</h1>
        <p className="text-sm text-stone-500">The requested living culture record is not present in our archive.</p>
        <Link href="/culture" className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Living Culture Directory
        </Link>
      </div>
    );
  }

  const relatedSites = CANONICAL_HERITAGE_SITES.filter(s => 
    culture.relatedSites.some(name => s.name.toLowerCase().includes(name.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Link */}
      <div>
        <Link
          href="/culture"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Living Traditions & Arts</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[340px] shadow-2xl bg-stone-900">
        <img
          src={culture.featuredImage}
          alt={culture.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white inline-block">
            {culture.category.replace('_', ' ')}
          </span>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {culture.name}
            </h1>
            {culture.bengaliName && (
              <p className="text-lg sm:text-xl text-amber-300 font-medium">{culture.bengaliName}</p>
            )}
          </div>

          <p className="text-sm sm:text-base text-stone-200 max-w-3xl line-clamp-2 leading-relaxed">
            {culture.shortDescription}
          </p>
        </div>
      </div>

      {/* Grid: 8 Cols Content + 4 Cols Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-8 space-y-10">
          
          {/* Detailed Explanation */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Living Culture Documentation</span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Overview & Practice
            </h2>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {culture.detailedExplanation}
            </p>
          </section>

          {/* Origins & Cultural Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
                Historical Origins
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {culture.originHistory}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
                Cultural Significance
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {culture.culturalSignificance}
              </p>
            </div>
          </div>

          {/* Connected Festivals & Events */}
          {culture.connectedEvents.length > 0 && (
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Connected Festivals & Celebrations
              </h3>
              <div className="flex flex-wrap gap-2">
                {culture.connectedEvents.map(evt => (
                  <span key={evt} className="px-3 py-1 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 text-xs font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    <span>{evt}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Heritage Sites */}
          {relatedSites.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                Connected Heritage Sites
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedSites.map(site => (
                  <Link
                    key={site.id}
                    href={`/heritage/${site.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-orange-600 transition-colors">
                        {site.name}
                      </h4>
                      <p className="text-xs text-stone-500">{site.district} • {site.historicalPeriod}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-2 border-b border-stone-100 dark:border-stone-800">
              Community & Geographic Context
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">Practitioner Community</span>
                <span className="text-stone-500">{culture.practitioners}</span>
              </div>

              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">Geographic Heartlands</span>
                <span className="text-stone-500">{culture.geographicAssociation}</span>
              </div>

              <div>
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">Historical Continuity</span>
                <span className="text-stone-500">{culture.historicalPeriod}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/workshops"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Attend Artisan Workshop</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
