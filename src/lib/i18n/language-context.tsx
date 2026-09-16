'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  TRANSLATIONS, 
  TranslationKey, 
  LanguageMeta 
} from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguageMeta: LanguageMeta;
  t: (key: TranslationKey, fallback?: string) => string;
  supportedLanguages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function triggerGoogleTranslate(lang: SupportedLanguage) {
  if (typeof window === 'undefined') return;

  try {
    const hostname = window.location.hostname;
    if (lang === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=/en/en; path=/;`;
      if (hostname) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
        document.cookie = `googtrans=/en/en; domain=${hostname}; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostname}; path=/;`;
        document.cookie = `googtrans=/en/en; domain=.${hostname}; path=/;`;
      }

      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // If the DOM was translated by Google Translate, reloading gives back the exact original English DOM
      const isTranslated = document.documentElement.classList.contains('translated-ltr') ||
                           document.documentElement.classList.contains('translated-rtl') ||
                           document.body.classList.contains('translated-ltr');
      if (isTranslated) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } else {
      const cookieValue = `/en/${lang}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      if (hostname) {
        document.cookie = `googtrans=${cookieValue}; domain=${hostname}; path=/;`;
        document.cookie = `googtrans=${cookieValue}; domain=.${hostname}; path=/;`;
      }
    }

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } catch (err) {
    console.error('Failed to trigger Google Translate:', err);
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('parampara_preferred_lang') as SupportedLanguage;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
        if (saved !== 'en') {
          setTimeout(() => {
            triggerGoogleTranslate(saved);
          }, 600);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('parampara_preferred_lang', lang);
      document.documentElement.lang = lang;
      triggerGoogleTranslate(lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict[key]) return langDict[key];
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return fallback || key;
  };

  const currentLanguageMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      currentLanguageMeta,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return graceful default if called outside provider
    return {
      language: 'en' as SupportedLanguage,
      setLanguage: () => {},
      currentLanguageMeta: SUPPORTED_LANGUAGES[0],
      t: (key: TranslationKey, fallback?: string) => TRANSLATIONS.en[key] || fallback || key,
      supportedLanguages: SUPPORTED_LANGUAGES
    };
  }
  return context;
}
