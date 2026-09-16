'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: any;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslateLoader() {
  useEffect(() => {
    // Define the global callback function required by Google Translate
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,or,as',
              autoDisplay: false,
            },
            'google_translate_element'
          );

          // If a language was previously saved in localStorage, apply it after init
          try {
            const savedLang = localStorage.getItem('parampara_preferred_lang');
            if (savedLang && savedLang !== 'en') {
              setTimeout(() => {
                const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
                if (select) {
                  select.value = savedLang;
                  select.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }, 300);
            }
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to initialize Google Translate element:', err);
      }
    };

    // Load Google Translate script if not already present
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        display: 'none',
        visibility: 'hidden',
        position: 'absolute',
        top: -9999,
        left: -9999,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
