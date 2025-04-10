import { createContext, useContext, useState, ReactNode } from "react";
import { ptBR, enUS, Translation } from "../locales/pt-BR";

type Language = "pt-BR" | "en-US";

type I18nContextType = {
  language: Language;
  t: Translation;
  changeLanguage: (lang: Language) => void;
};

const translations = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");
  const t = translations[language];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
