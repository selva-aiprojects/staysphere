'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageConfig } from '../lib/i18n';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  theme: 'pearl' | 'dark';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isPearl = theme === 'pearl';
  const activeConfig = SUPPORTED_LANGUAGES[currentLanguage];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
          isPearl
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            : 'bg-[#002B4D] hover:bg-[#003866] border-white/20 text-slate-200'
        }`}
        title="Select Language / Sprache / Idioma / Langue / لغة"
      >
        <span className="text-sm">{activeConfig.flag}</span>
        <span className="font-mono uppercase text-[11px] font-bold">{activeConfig.code}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl z-50 overflow-hidden py-1 backdrop-blur-xl animate-scale-in ${
            isPearl
              ? 'bg-white/95 border-slate-300 text-slate-800'
              : 'bg-[#001D38]/95 border-white/15 text-slate-100'
          }`}
        >
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#00A9A5]" />
            <span>Select Language</span>
          </div>

          <div className="divide-y divide-white/5">
            {Object.values(SUPPORTED_LANGUAGES).map((lang: LanguageConfig) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                  currentLanguage === lang.code
                    ? 'bg-[#00A9A5]/20 text-[#00A9A5] font-bold'
                    : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-xs text-white">{lang.nativeName}</div>
                    <div className="text-[10px] text-slate-400">{lang.name}</div>
                  </div>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-3.5 h-3.5 text-[#00A9A5]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
