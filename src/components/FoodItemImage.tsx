'use client';

import React, { useState } from 'react';
import { FoodItem } from '@/types';
import { Utensils } from 'lucide-react';

interface FoodItemImageProps {
  food: FoodItem;
  className?: string;
  alt?: string;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  SWEET: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
  TRADITIONAL_MEAL: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
  STREET_FOOD: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Vada_pav_01.jpg',
  SNACK: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  BEVERAGE: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80'
};

const DEFAULT_FOOD_FALLBACK = 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80';

export function FoodItemImage({
  food,
  className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500',
  alt
}: FoodItemImageProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const candidates: string[] = [
    ...(food.images || []),
    CATEGORY_FALLBACKS[food.category],
    DEFAULT_FOOD_FALLBACK
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
      <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 text-stone-200 p-4 text-center">
        <Utensils className="w-8 h-8 mb-2 text-rose-400" />
        <span className="text-xs font-bold leading-tight line-clamp-2">{food.name}</span>
        <span className="text-[10px] text-amber-300/80 mt-1">{food.district}, {food.state}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-100 dark:bg-stone-800">
      {/* Skeleton Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-stone-400 dark:text-stone-600 animate-bounce" />
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt || food.name}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
}
