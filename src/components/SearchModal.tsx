'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Landmark, Sparkles, Compass, Utensils, ShoppingBag, BookOpen } from 'lucide-react';
import { CANONICAL_HERITAGE_SITES } from '@/lib/data/heritage-sites';
import { CANONICAL_CULTURE_ENTRIES } from '@/lib/data/culture';
import { CANONICAL_FOOD_ITEMS } from '@/lib/data/food-items';
import { CANONICAL_PRODUCTS } from '@/lib/data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedSites = q ? CANONICAL_HERITAGE_SITES.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.bengaliName?.includes(q) || 
    s.district.toLowerCase().includes(q) ||
    s.shortDescription.toLowerCase().includes(q)
  ).slice(0, 5) : [];

  const matchedCultures = q ? CANONICAL_CULTURE_ENTRIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.bengaliName?.includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.shortDescription.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const matchedFoods = q ? CANONICAL_FOOD_ITEMS.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.bengaliName?.includes(q) ||
    f.district.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedProducts = q ? CANONICAL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.craftHeritage.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const totalResults = matchedSites.length + matchedCultures.length + matchedFoods.length + matchedProducts.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 55+ heritage sites, festivals, crafts, sweets, guides..."
            className="w-full bg-transparent border-none outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400 text-base"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-5 text-sm">
          {!query && (
            <div className="py-8 text-center">
              <Compass className="w-10 h-10 mx-auto text-amber-600/40 mb-3" />
              <p className="font-medium text-stone-700 dark:text-stone-300">Discover West Bengal’s Living Heritage</p>
              <p className="text-xs text-stone-400 mt-1">Try typing &quot;Bishnupur&quot;, &quot;Durga Puja&quot;, &quot;Rosogolla&quot;, &quot;Darjeeling&quot;, or &quot;Santiniketan&quot;</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Victoria Memorial', 'Terracotta', 'Sundarbans', 'Dokra', 'Baluchari', 'Baul'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800/40"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center text-stone-500">
              <p>No results matching &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 mt-1">Explore all sites in the Heritage Explorer directory.</p>
            </div>
          )}

          {/* Heritage Sites */}
          {matchedSites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                <Landmark className="w-4 h-4" />
                <span>Heritage Sites ({matchedSites.length})</span>
              </div>
              <div className="space-y-1">
                {matchedSites.map(site => (
                  <Link
                    key={site.id}
                    href={`/heritage/${site.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                        {site.name} {site.bengaliName && <span className="text-xs text-stone-400 font-normal">({site.bengaliName})</span>}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">{site.shortDescription}</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0 ml-3">
                      {site.district}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cultures & Traditions */}
          {matchedCultures.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Cultures & Living Traditions ({matchedCultures.length})</span>
              </div>
              <div className="space-y-1">
                {matchedCultures.map(culture => (
                  <Link
                    key={culture.id}
                    href={`/culture/${culture.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-orange-700 dark:group-hover:text-orange-400">
                        {culture.name} {culture.bengaliName && <span className="text-xs text-stone-400 font-normal">({culture.bengaliName})</span>}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">{culture.shortDescription}</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 shrink-0 ml-3">
                      {culture.category.replace('_', ' ')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Food & Sweets */}
          {matchedFoods.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2">
                <Utensils className="w-4 h-4" />
                <span>Local Food & Sweets ({matchedFoods.length})</span>
              </div>
              <div className="space-y-1">
                {matchedFoods.map(food => (
                  <Link
                    key={food.id}
                    href="/food"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400">
                        {food.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">{food.merchantName} • {food.district}</div>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      ₹{food.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Handcraft Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Handcrafted Items ({matchedProducts.length})</span>
              </div>
              <div className="space-y-1">
                {matchedProducts.map(prod => (
                  <Link
                    key={prod.id}
                    href="/local-items"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {prod.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">{prod.craftHeritage}</div>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      ₹{prod.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 dark:bg-stone-950/60 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>55 Canonical Sites • 15 Living Cultures Verified</span>
          </div>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
