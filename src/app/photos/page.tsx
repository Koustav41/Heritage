'use client';

import React, { useState } from 'react';
import { Camera, X, Heart, MapPin, Calendar, User, Eye, Compass } from 'lucide-react';
import { CANONICAL_PHOTOS } from '@/lib/data/photos';
import { PhotoArchiveItem } from '@/types';

export default function PhotoArchivePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoArchiveItem | null>(null);
  const [photos, setPhotos] = useState(CANONICAL_PHOTOS);
  const [filterDistrict, setFilterDistrict] = useState('ALL');

  const districts = ['ALL', ...Array.from(new Set(CANONICAL_PHOTOS.map(p => p.district)))];

  const filteredPhotos = filterDistrict === 'ALL' 
    ? photos 
    : photos.filter(p => p.district === filterDistrict);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Heritage • High-Resolution Curated Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Photo Archive of Bengal
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Stunning architectural photography, living cultural moments, religious ceremonies, and geographic landscapes captured by community contributors and heritage researchers.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {districts.map(d => (
          <button
            key={d}
            onClick={() => setFilterDistrict(d)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterDistrict === d 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
            }`}
          >
            {d === 'ALL' ? 'All Districts' : d}
          </button>
        ))}
      </div>

      {/* Photos Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs text-white font-medium flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Tap for Lightbox
                </span>
              </div>

              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                {photo.district}
              </span>

              <button
                onClick={(e) => handleLike(photo.id, e)}
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold hover:text-rose-400 transition-colors"
              >
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>{photo.likesCount}</span>
              </button>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                {photo.description}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span>By {photo.photographer}</span>
                <span>{photo.eraOrYear}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3 bg-stone-900 text-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-bold">
                  {selectedPhoto.district} District
                </span>
                <span className="text-xs text-stone-400">Photo Archive Ref: #{selectedPhoto.id}</span>
              </div>

              <h2 className="text-xl font-bold text-white">{selectedPhoto.title}</h2>
              <p className="text-sm text-stone-300 leading-relaxed">{selectedPhoto.description}</p>

              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
                <div className="flex items-center gap-4">
                  <span>Photographer: <strong>{selectedPhoto.photographer}</strong></span>
                  <span>Era: <strong>{selectedPhoto.eraOrYear}</strong></span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPhoto.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
