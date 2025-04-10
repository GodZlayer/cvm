import { useState } from "react";
import { generatePDF } from "@/utils/pdfGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PersonalDetails from "./sections/PersonalDetails";
import WorkExperience from "./sections/WorkExperience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import ResumePreview from "./ResumePreview";
import ColorPalette from "./ColorPalette";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "../LanguageToggle";
import { TemplateType, templateNames, ColorScheme } from "./templates";

export type ResumeData = {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    summary: string;
    photo: string | null;
  };
  workExperience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: string[];
  template: TemplateType;
  colorScheme: ColorScheme;
};

const defaultResumeData: ResumeData = {
  personalDetails: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    summary: "",
    photo: null,
  },
  workExperience: [],
  education: [],
  skills: [],
  template: "modern",
  colorScheme: "blue",
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState("personal");

  const updatePersonalDetails = (details: ResumeData["personalDetails"]) => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: details,
    }));
  };

  const updateWorkExperience = (experience: ResumeData["workExperience"]) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: experience,
    }));
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({
      ...prev,
      education,
    }));
  };

  const updateSkills = (skills: ResumeData["skills"]) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateTemplate = (template: TemplateType) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  };

  const updateColorScheme = (colorScheme: ColorScheme) => {
    setResumeData((prev) => ({
      ...prev,
      colorScheme,
    }));
  };

  const handleNext = () => {
    if (activeTab === "personal") setActiveTab("work");
    else if (activeTab === "work") setActiveTab("education");
    else if (activeTab === "education") setActiveTab("skills");
    else if (activeTab === "skills") setActiveTab("template");
  };

  const handlePrevious = () => {
    if (activeTab === "skills") setActiveTab("education");
    else if (activeTab === "education") setActiveTab("work");
    else if (activeTab === "work") setActiveTab("personal");
  };

  const handleExportPDF = () => {
    generatePDF(
      "resume-to-print",
      `${resumeData.personalDetails.fullName || "resume"}.pdf`,
    );
  };

  const { t } = useI18n();

  return (
    <div className="container mx-auto py-8 bg-background">
      <LanguageToggle />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
        {t.resumeBuilder}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="personal">{t.personal}</TabsTrigger>
              <TabsTrigger value="work">{t.work}</TabsTrigger>
              <TabsTrigger value="education">{t.education}</TabsTrigger>
              <TabsTrigger value="skills">{t.skills}</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalDetails
                data={resumeData.personalDetails}
                updateData={updatePersonalDetails}
              />
            </TabsContent>

            <TabsContent value="work">
              <WorkExperience
                data={resumeData.workExperience}
                updateData={updateWorkExperience}
              />
            </TabsContent>

            <TabsContent value="education">
              <Education
                data={resumeData.education}
                updateData={updateEducation}
              />
            </TabsContent>

            <TabsContent value="skills">
              <Skills data={resumeData.skills} updateData={updateSkills} />
            </TabsContent>

            <TabsContent value="template">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Escolha um template</h2>
                  <RadioGroup
                    value={resumeData.template}
                    onValueChange={(value) =>
                      updateTemplate(value as TemplateType)
                    }
                    className="space-y-3"
                  >
                    {Object.entries(templateNames).map(([key, name]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={`template-${key}`} />
                        <Label htmlFor={`template-${key}`}>{name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator className="my-4" />

                <ColorPalette
                  selectedColor={resumeData.colorScheme}
                  onColorChange={updateColorScheme}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeTab === "personal"}
            >
              {t.previous}
            </Button>

            {activeTab === "template" ? (
              <Button onClick={handleExportPDF}>{t.exportPDF}</Button>
            ) : (
              <Button onClick={handleNext}>{t.next}</Button>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">{t.preview}</h2>
          <div className="bg-white rounded border p-6">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
