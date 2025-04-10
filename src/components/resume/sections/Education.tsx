import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { ResumeData } from "../ResumeBuilder";

interface EducationProps {
  data: ResumeData["education"];
  updateData: (data: ResumeData["education"]) => void;
}

export default function Education({ data, updateData }: EducationProps) {
  const [educationList, setEducationList] = useState(data);
  const [isAdding, setIsAdding] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    id: "",
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleAddNew = () => {
    setIsAdding(true);
    setCurrentEducation({
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
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
    setCurrentEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentEducation((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleSave = () => {
    if (educationList.some((edu) => edu.id === currentEducation.id)) {
      // Update existing
      const updatedEducation = educationList.map((edu) =>
        edu.id === currentEducation.id ? currentEducation : edu,
      );
      setEducationList(updatedEducation);
      updateData(updatedEducation);
    } else {
      // Add new
      const updatedEducation = [...educationList, currentEducation];
      setEducationList(updatedEducation);
      updateData(updatedEducation);
    }
    setIsAdding(false);
  };

  const handleEdit = (id: string) => {
    const educationToEdit = educationList.find((edu) => edu.id === id);
    if (educationToEdit) {
      setCurrentEducation(educationToEdit);
      setIsAdding(true);
    }
  };

  const handleDelete = (id: string) => {
    const updatedEducation = educationList.filter((edu) => edu.id !== id);
    setEducationList(updatedEducation);
    updateData(updatedEducation);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
        {!isAdding && (
          <Button onClick={handleAddNew} variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        )}
      </div>

      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentEducation.id ? "Edit" : "Add"} Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  value={currentEducation.institution}
                  onChange={handleChange}
                  placeholder="University or School Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  value={currentEducation.degree}
                  onChange={handleChange}
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                name="field"
                value={currentEducation.field}
                onChange={handleChange}
                placeholder="Computer Science, Business, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="month"
                  value={currentEducation.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className={
                    currentEducation.current ? "text-muted-foreground" : ""
                  }
                >
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="month"
                  value={currentEducation.endDate}
                  onChange={handleChange}
                  disabled={currentEducation.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={currentEducation.current}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="current">I am currently studying here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentEducation.description}
                onChange={handleChange}
                placeholder="Describe your studies, achievements, etc..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </CardContent>
        </Card>
      ) : educationList.length > 0 ? (
        <div className="space-y-4">
          {educationList.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                    <p className="mt-2">{edu.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(edu.id)}
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
                      onClick={() => handleDelete(edu.id)}
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
          <p className="text-muted-foreground">No education added yet.</p>
          <p className="text-muted-foreground text-sm">
            Click "Add Education" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
