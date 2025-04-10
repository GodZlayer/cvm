import { ResumeData } from "./ResumeBuilder";
import { useI18n } from "@/lib/i18n";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  // Render the selected template based on the template property in data
  switch (data.template) {
    case "classic":
      return <ClassicTemplate data={data} />;
    case "minimal":
      return <MinimalTemplate data={data} />;
    case "professional":
      return <ProfessionalTemplate data={data} />;
    case "creative":
      return <CreativeTemplate data={data} />;
    case "modern":
    default:
      return <ModernTemplate data={data} />;
  }
}
