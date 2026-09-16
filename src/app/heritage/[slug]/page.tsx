'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Landmark, 
  MapPin, 
  Clock, 
  Ticket, 
  Accessibility, 
  Volume2, 
  ShieldCheck, 
  Heart, 
  ArrowLeft, 
  Share2, 
  Compass, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  User,
  Utensils,
  BookOpen,
  Camera,
  X,
  Maximize2
} from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_GUIDES } from '@/lib/data/members';
import { CANONICAL_WORKSHOPS } from '@/lib/data/workshops';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function HeritageSiteDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { savedSiteSlugs, toggleSaveSite } = usePorjotok();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const site = CANONICAL_HERITAGE_SITES.find(s => s.slug === slug);

  if (!site) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <Landmark className="w-16 h-16 mx-auto text-amber-600/40" />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Heritage Site Not Found</h1>
        <p className="text-sm text-stone-500">The requested heritage landmark is not in our canonical records.</p>
        <Link href="/heritage" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Heritage Directory
        </Link>
      </div>
    );
  }

  const isSaved = savedSiteSlugs.includes(site.slug);
  const nearbyGuides = CANONICAL_GUIDES.filter(g => g.district === site.district || g.state === site.state).slice(0, 2);
  const nearbyWorkshops = CANONICAL_WORKSHOPS.filter(w => w.district === site.district).slice(0, 2);
  const nearbyFoods = CANONICAL_FOOD_ITEMS.filter(f => f.district === site.district || f.state === site.state).slice(0, 2);
  const distinctGallery = (site.gallery || []).filter(img => img && img !== site.featuredImage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/heritage"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Heritage Sites</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveSite(site.slug)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Landmark'}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[360px] shadow-2xl bg-stone-900">
        <img
          src={site.featuredImage}
          alt={site.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&q=80&w=1200';
          }}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white">
              {site.state} • {site.district}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
              {site.historicalPeriod}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ASI Monitored
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {site.name}
            </h1>
            {(site.nativeName || site.bengaliName) && (
              <p className="text-lg sm:text-xl text-amber-300 font-medium">{site.nativeName || site.bengaliName}</p>
            )}
          </div>

          <p className="text-sm sm:text-base text-stone-200 max-w-3xl line-clamp-2 leading-relaxed">
            {site.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Grid: Content (8 cols) & Meta sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Detailed Knowledge */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Audio Storytelling Module */}
          {site.audioStory && (
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md shrink-0"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                    Audio Storytelling Snippet
                  </h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                    {site.audioStory}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-200/60 dark:bg-amber-900 text-amber-900 dark:text-amber-200 shrink-0">
                {isPlayingAudio ? 'Playing...' : 'Tap to Listen'}
              </span>
            </div>
          )}

          {/* Detailed Historical Narrative */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Historical Documentation</span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              History & Origins
            </h2>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {site.detailedHistory}
            </p>
          </section>

          {/* Cultural & Architectural Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Cultural Significance
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {site.culturalSignificance}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Architectural Features
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {site.architecturalSignificance}
              </p>
            </div>
          </div>

          {/* Historical Personalities & Living Cultures */}
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Associated Figures & Living Traditions
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {site.historicalPersonalities.map(p => (
                <span key={p} className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>{p}</span>
                </span>
              ))}

              {site.associatedCultures.map(c => (
                <span key={c} className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{c}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Photo Gallery if present */}
          {distinctGallery.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Camera className="w-4 h-4" />
                  <span>Archival Visual Collection</span>
                </div>
                <span className="text-xs text-stone-500 font-medium">{distinctGallery.length} Archival Views</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Archival Photo Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {distinctGallery.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-stone-100 dark:bg-stone-800 cursor-pointer border border-stone-200 dark:border-stone-800"
                  >
                    <img 
                      src={img} 
                      alt={`${site.name} Archival View ${i + 1}`} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = site.featuredImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 text-white text-xs">
                      <span className="font-medium">View Photograph {i + 1}</span>
                      <Maximize2 className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Visiting Info & Nearby Connect */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Visiting Information Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider pb-2 border-b border-stone-100 dark:border-stone-800">
              Visitor Information
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">Opening Hours</span>
                  <span className="text-stone-500">{site.visitingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Ticket className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">Entry Fee</span>
                  <span className="text-stone-500">{site.entryFee}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Accessibility className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">Accessibility</span>
                  <span className="text-stone-500">{site.accessibilityInfo}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">Location</span>
                  <span className="text-stone-500">{site.address}</span>
                  <div className="mt-1 font-mono text-[10px] text-amber-700 dark:text-amber-400">
                    {site.coordinates.lat.toFixed(4)}°N, {site.coordinates.lng.toFixed(4)}°E
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nearby Verified Guides */}
          {nearbyGuides.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Verified Guides in {site.district}
              </h4>
              <div className="space-y-2.5">
                {nearbyGuides.map(guide => (
                  <Link
                    key={guide.id}
                    href="/guides"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    <img src={guide.photo} alt={guide.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-bold text-stone-900 dark:text-stone-100 truncate">{guide.name}</div>
                      <div className="text-stone-400 text-[11px]">₹{guide.chargePerDay}/day • ★ {guide.rating}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Food/Sweets */}
          {nearbyFoods.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Authentic Food Nearby
              </h4>
              <div className="space-y-2.5">
                {nearbyFoods.map(food => (
                  <Link
                    key={food.id}
                    href="/food"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    <img src={food.images[0]} alt={food.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-bold text-stone-900 dark:text-stone-100 truncate">{food.name}</div>
                      <div className="text-stone-400 text-[11px]">₹{food.price} • {food.merchantName}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Archival Photo Lightbox Modal */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-stone-900 shadow-2xl border border-white/10 max-h-[80vh]">
              <img 
                src={activeImage} 
                alt={site.name} 
                className="w-full h-full max-h-[80vh] object-contain"
              />
            </div>
            <div className="text-center mt-3 space-y-1">
              <p className="text-white font-semibold text-sm">{site.name}</p>
              <p className="text-stone-400 text-xs">Archival Photography Collection • {site.district}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
