import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { ResumeData } from "../ResumeBuilder";
import { useI18n } from "@/lib/i18n";

interface WorkExperienceProps {
  data: ResumeData["workExperience"];
  updateData: (data: ResumeData["workExperience"]) => void;
}

export default function WorkExperience({
  data,
  updateData,
}: WorkExperienceProps) {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    id: "",
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleAddNew = () => {
    setIsAdding(true);
    setCurrentExperience({
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentExperience((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleSave = () => {
    if (experiences.some((exp) => exp.id === currentExperience.id)) {
      // Update existing
      const updatedExperiences = experiences.map((exp) =>
        exp.id === currentExperience.id ? currentExperience : exp,
      );
      setExperiences(updatedExperiences);
      updateData(updatedExperiences);
    } else {
      // Add new
      const updatedExperiences = [...experiences, currentExperience];
      setExperiences(updatedExperiences);
      updateData(updatedExperiences);
    }
    setIsAdding(false);
  };

  const handleEdit = (id: string) => {
    const experienceToEdit = experiences.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setCurrentExperience(experienceToEdit);
      setIsAdding(true);
    }
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    updateData(updatedExperiences);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t.workExperience}
        </h2>
        {!isAdding && (
          <Button onClick={handleAddNew} variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.addExperience}
          </Button>
        )}
      </div>

      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentExperience.id
                ? t.editWorkExperience
                : t.addWorkExperience}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">{t.company}</Label>
                <Input
                  id="company"
                  name="company"
                  value={currentExperience.company}
                  onChange={handleChange}
                  placeholder={t.companyPlaceholder}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">{t.position}</Label>
                <Input
                  id="position"
                  name="position"
                  value={currentExperience.position}
                  onChange={handleChange}
                  placeholder={t.positionPlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">{t.startDate}</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="month"
                  value={currentExperience.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className={
                    currentExperience.current ? "text-muted-foreground" : ""
                  }
                >
                  {t.endDate}
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="month"
                  value={currentExperience.endDate}
                  onChange={handleChange}
                  disabled={currentExperience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={currentExperience.current}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="current">{t.currentlyWorkHere}</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                name="description"
                value={currentExperience.description}
                onChange={handleChange}
                placeholder={t.workDescriptionPlaceholder}
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                {t.cancel}
              </Button>
              <Button onClick={handleSave}>{t.save}</Button>
            </div>
          </CardContent>
        </Card>
      ) : experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(exp.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">{t.noWorkExperience}</p>
          <p className="text-muted-foreground text-sm">
            {t.clickAddExperience}
          </p>
        </div>
      )}
    </div>
  );
}
