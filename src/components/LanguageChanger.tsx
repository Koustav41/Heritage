'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { SupportedLanguage } from '@/lib/i18n/translations';

interface LanguageChangerProps {
  compact?: boolean;
  align?: 'left' | 'right';
  className?: string;
}

export function LanguageChanger({ compact = false, align = 'right', className = '' }: LanguageChangerProps) {
  const { language, setLanguage, currentLanguageMeta, supportedLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-all shadow-2xs whitespace-nowrap shrink-0 ${
          isOpen ? 'ring-2 ring-amber-500 border-amber-500' : ''
        }`}
        title={t('select_language')}
      >
        <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
        
        {compact ? (
          <span className="font-bold font-mono text-[11px] text-amber-700 dark:text-amber-300">
            {currentLanguageMeta.scriptBadge}
          </span>
        ) : (
          <div className="flex items-center gap-1">
            <span className="font-bold text-[11px] text-amber-800 dark:text-amber-300">
              {currentLanguageMeta.nativeName}
            </span>
          </div>
        )}

        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-150 shrink-0 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="px-2 py-1.5 border-b border-stone-100 dark:border-stone-800 mb-2 flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('select_language')}</span>
              </p>
              <p className="text-[10px] text-stone-400">12 Official Indian Languages</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
              {currentLanguageMeta.scriptBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto pr-1">
            {supportedLanguages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-bold shadow-xs'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-1">
                    <div className="text-xs leading-snug flex items-center gap-1.5">
                      <span className="font-bold text-amber-700 dark:text-amber-400 text-[11px] shrink-0 font-mono">
                        {lang.scriptBadge}
                      </span>
                      <span className="truncate">{lang.nativeName}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 truncate pl-4">
                      {lang.name}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
