"use client";
import { createContext, useContext, useState } from "react";
import type { Lang } from "../data/translations";
import { translations } from "../data/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.ENG;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ENG",
  setLang: () => {},
  t: translations.ENG,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ENG");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
