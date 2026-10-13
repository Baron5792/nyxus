import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from '../assets/css/Translator.module.css';
import { useTheme } from '../context/ThemeContext';

// Declare Google Translate types
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: TranslateElementOptions,
          element: string | HTMLElement
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

interface TranslateElementOptions {
  pageLanguage: string;
  autoDisplay: boolean;
  includedLanguages: string;
  gaTrack: boolean;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'us' },
  // { code: 'en', name: 'English', flag: 'us' },
  { code: 'es', name: 'Spanish', flag: 'es' },
  { code: 'fr', name: 'French', flag: 'fr' },
  { code: 'de', name: 'German', flag: 'de' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: 'cn' },
  { code: 'ja', name: 'Japanese', flag: 'jp' },
  { code: 'ar', name: 'Arabic', flag: 'sa' },
  { code: 'ru', name: 'Russian', flag: 'ru' },
  { code: 'pt', name: 'Portuguese', flag: 'pt' },
  { code: 'hi', name: 'Hindi', flag: 'in' },
];

interface GoogleTranslateCustomProps {
  textColor?: boolean;
}

const GoogleTranslateCustom: React.FC<GoogleTranslateCustomProps> = ({ textColor }: { textColor?: boolean }) => {
  const [isGoogleReady, setIsGoogleReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const { theme } = useTheme();

  const scriptLoadedRef = useRef<boolean>(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isChangingLanguageRef = useRef<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Function to click the hidden Google Translate dropdown
  const triggerGoogleChange = useCallback((langCode: string): void => {
    setError(null);
    if (!langCode) return;

    if (!isGoogleReady) {
      setError('Translator not ready. Please wait.');
      return;
    }

    if (isChangingLanguageRef.current) return;
    isChangingLanguageRef.current = true;

    const selectors: string[] = ['select.goog-te-combo', 'select[id*="language"]'];
    const maxAttempts: number = 20;
    let attempts: number = 0;

    const tryChangeLanguage = (): void => {
      let googleDropdown: HTMLSelectElement | null = null;

      // Check main document
      for (const selector of selectors) {
        googleDropdown = document.querySelector(selector);
        if (googleDropdown) break;
      }

      // Check within iframe if needed
      if (!googleDropdown) {
        const iframe = document.querySelector('.goog-te-banner-frame, iframe[id*="google"]') as HTMLIFrameElement | null;
        if (iframe && iframe.contentDocument) {
          googleDropdown = iframe.contentDocument.querySelector('select.goog-te-combo');
        }
      }

      if (googleDropdown) {
        const option = googleDropdown.querySelector(`option[value="${langCode}"]`) as HTMLOptionElement | null;
        
        if (option) {
          googleDropdown.value = langCode;
          googleDropdown.dispatchEvent(new Event('change', { bubbles: true }));
          
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          isChangingLanguageRef.current = false;
        } else {
          console.warn(`Target language option for ${langCode} not found in Google dropdown.`);
          if (attempts >= maxAttempts) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            isChangingLanguageRef.current = false;
            setError('Failed to trigger translation.');
          } else {
            attempts++;
          }
        }
      } else if (attempts >= maxAttempts) {
        setError('Google Translate dropdown not found.');
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        isChangingLanguageRef.current = false;
      } else {
        attempts++;
      }
    };

    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    pollIntervalRef.current = setInterval(tryChangeLanguage, 500);
    tryChangeLanguage();

    setTimeout(() => {
      if (isChangingLanguageRef.current) {
        isChangingLanguageRef.current = false;
      }
    }, 10000);
  }, [isGoogleReady]);

  const handleLanguageSelect = (lang: Language): void => {
    setCurrentLang(lang);
    setIsDropdownOpen(false);
    triggerGoogleChange(lang.code);
  };

  const handleOutsideClick = useCallback((event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Click outside effect
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // Initial load effect for Google Translate script
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement && elementRef.current) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages: languages.filter(lang => lang.code).map(lang => lang.code).join(','),
              gaTrack: false,
            },
            elementRef.current
          );
          setIsGoogleReady(true);
        } else {
          throw new Error('Google Translate not available');
        }
      } catch (err) {
        console.error('Google Translate initialization failed:', err);
        setError('Failed to initialize translator.');
      }
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => setError('Failed to load translator.');
    document.head.appendChild(script);

    const timeout = setTimeout(() => {
      if (!window.google?.translate) {
        setError('Translator took too long to load.');
        setIsGoogleReady(false);
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // Filter out the placeholder language
  const displayLanguages: Language[] = languages.filter(lang => lang.code !== '');

  return (
    <div className={styles.translateWrapper}>
      {/* Custom Flag Dropdown */}
      <div ref={dropdownRef} className={styles.customDropdown}>
        <button
          className={`${styles.dropdownButton} ${textColor ? 'text-secondary' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={!isGoogleReady || !!error}
          type="button"
        >
          {currentLang.flag && (
            <span className={`${styles.flagIcon} fi fi-${currentLang.flag}`}></span>
          )}
          {currentLang.name}
          <span className={styles.arrowIcon}>{isDropdownOpen ? '▲' : '▼'}</span>
        </button>

        {isDropdownOpen && (
          <ul className={theme === 'dark' ? styles['dark-dropdownList'] : styles.dropdownList}>
            {displayLanguages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className={currentLang.code === lang.code ? styles.selected : ''}
                role="option"
                aria-selected={currentLang.code === lang.code}
              >
                <span className={`${styles.flagIcon} fi fi-${lang.flag}`}></span>
                {lang.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hidden container for Google Translate Widget */}
      <div 
        ref={elementRef} 
        className={styles.hiddenGoogleWidget} 
      />

      {error && <div className={styles.errorText}>{error}</div>}
      {!isGoogleReady && !error && (
        <div className={styles.loadingText}>Loading translator...</div>
      )}
    </div>
  );
};

export default GoogleTranslateCustom;