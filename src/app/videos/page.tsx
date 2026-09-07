'use client';

import React, { useState } from 'react';
import { Play, X, Video, Clock, MapPin, Tag } from 'lucide-react';
import { CANONICAL_VIDEOS } from '@/lib/data/videos';
import { VideoArchiveItem } from '@/types';

export default function VideoArchivePage() {
  const [activeVideo, setActiveVideo] = useState<VideoArchiveItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Video className="w-3.5 h-3.5" />
          <span>Cultural Film & Storytelling Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Cultural Video Archive
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          Watch documentary shorts and cultural performance recordings capturing master clay artisans of Kumartuli, Dokra metalsmiths, and mystic Baul melodies.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CANONICAL_VIDEOS.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideo(vid)}
            className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>

                <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[11px] font-mono font-bold bg-black/80 text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {vid.duration}
                </span>

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                  {vid.category}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {vid.district} District
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                  {vid.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs text-stone-400">
              <span>Curated by {vid.uploader}</span>
              <div className="flex gap-1">
                {vid.tags.slice(0, 2).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] bg-black">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-stone-900 text-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="text-amber-400 font-bold">{activeVideo.category} • {activeVideo.district}</span>
                <span>Duration: {activeVideo.duration}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{activeVideo.title}</h2>
              <p className="text-sm text-stone-300">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
