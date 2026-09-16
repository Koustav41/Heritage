'use client';

import React, { useState } from 'react';
import { HeritageSite } from '@/types';
import { Landmark } from 'lucide-react';

interface HeritageSiteImageProps {
  site: HeritageSite;
  className?: string;
  alt?: string;
}

// Authentic high-resolution Indian heritage fallbacks (tailored by category)
const CATEGORY_FALLBACKS: Record<string, string> = {
  MONUMENT: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
  ARCHITECTURE: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
  RELIGIOUS_SITE: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
  NATURAL_HERITAGE: 'https://images.unsplash.com/photo-1600100397608-f010f4439c09?auto=format&fit=crop&q=80&w=800',
  COLONIAL_HERITAGE: 'https://images.unsplash.com/photo-1545129139-1beb780cf337?auto=format&fit=crop&q=80&w=800',
  HISTORICAL_PERSONALITY: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
};

export function HeritageSiteImage({
  site,
  className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
  alt
}: HeritageSiteImageProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Progressive list of real image candidates for this specific heritage site
  const candidates: string[] = [
    site.featuredImage,
    ...(site.gallery || []),
    CATEGORY_FALLBACKS[site.siteType] || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'
  ].filter(Boolean);

  if (hasFailedAll || candidates.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-800/80 to-stone-900 text-stone-200 p-4 text-center">
        <Landmark className="w-8 h-8 mb-2 text-amber-300/80" />
        <span className="text-xs font-bold leading-tight line-clamp-2">{site.name}</span>
        <span className="text-[10px] text-amber-200/70 mt-1">{site.district}, {site.state}</span>
      </div>
    );
  }

  const currentSrc = candidates[srcIndex];

  return (
    <img
      src={currentSrc}
      alt={alt || site.name}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => {
        if (srcIndex < candidates.length - 1) {
          setSrcIndex((prev) => prev + 1);
        } else {
          setHasFailedAll(true);
        }
      }}
      className={className}
    />
  );
}
