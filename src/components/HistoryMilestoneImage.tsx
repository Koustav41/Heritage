'use client';

import React, { useState } from 'react';
import { HistoricalMilestone } from '@/types';
import { Landmark, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface HistoryMilestoneImageProps {
  milestone: HistoricalMilestone;
  className?: string;
  onOpenLightbox?: (image: string, title: string, caption?: string) => void;
}

const ERA_FALLBACKS: Record<string, string> = {
  ANCIENT: 'https://images.unsplash.com/photo-1600100397608-f010f4439c09?auto=format&fit=crop&q=80&w=1280',
  MEDIEVAL: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1280',
  NAWABI: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1280',
  COLONIAL_RENAISSANCE: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=1280',
  FREEDOM_STRUGGLE: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1280',
  CONTEMPORARY: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1280'
};

export function HistoryMilestoneImage({
  milestone,
  className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
  onOpenLightbox
}: HistoryMilestoneImageProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Progressive list of candidate URLs for this milestone
  const candidates: string[] = [
    milestone.image,
    milestone.fallbackImage,
    ERA_FALLBACKS[milestone.era],
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1280'
  ].filter(Boolean) as string[];

  const currentSrc = candidates[srcIndex];

  const handleImageError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((prev) => prev + 1);
      setIsLoaded(false);
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll || candidates.length === 0) {
    return (
      <div className="w-full h-full min-h-[220px] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-amber-900/80 via-stone-900 to-amber-950 text-stone-100 p-6 text-center border border-amber-800/40">
        <Landmark className="w-10 h-10 mb-2 text-amber-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
          {milestone.era.replace('_', ' ')}
        </span>
        <h4 className="text-sm font-extrabold leading-tight text-white line-clamp-2 max-w-[240px]">
          {milestone.title}
        </h4>
        <span className="text-[11px] text-stone-300 mt-2 font-mono">
          {milestone.yearRange}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group bg-stone-100 dark:bg-stone-800 cursor-pointer"
      onClick={() => onOpenLightbox && onOpenLightbox(currentSrc, milestone.title, milestone.imageCaption)}
      title="Click to view full photograph"
    >
      {/* Skeleton / Shimmer background until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-stone-400 dark:text-stone-600 animate-bounce" />
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentSrc}
        alt={milestone.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />

      {/* Glassmorphic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 opacity-75 group-hover:opacity-90 transition-opacity pointer-events-none" />

      {/* Top Era Tag Badge */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/50 backdrop-blur-md text-amber-300 border border-white/10 shadow-xs">
          {milestone.era.replace('_', ' ')}
        </span>
      </div>

      {/* Top Right Zoom Icon Indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="p-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white/90 shadow-sm flex items-center justify-center hover:bg-amber-600 transition-colors">
          <Maximize2 className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Bottom Caption Pill */}
      {milestone.imageCaption && (
        <div className="absolute bottom-3 inset-x-3 pointer-events-none">
          <div className="px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium leading-snug line-clamp-1 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{milestone.imageCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
}
