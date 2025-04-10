import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { language, changeLanguage } = useI18n();

  const toggleLanguage = () => {
    changeLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50"
    >
      {language === "pt-BR" ? "English" : "Português"}
    </Button>
  );
}
