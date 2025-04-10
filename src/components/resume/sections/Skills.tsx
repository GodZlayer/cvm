import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ResumeData } from "../ResumeBuilder";

interface SkillsProps {
  data: ResumeData["skills"];
  updateData: (data: ResumeData["skills"]) => void;
}

export default function Skills({ data, updateData }: SkillsProps) {
  const [skills, setSkills] = useState<string[]>(data);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    updateData(skills);
  }, [skills, updateData]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your professional skills and competencies.
        </p>
      </div>

      <div className="flex space-x-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
        />
        <Button onClick={handleAddSkill} type="button">
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 text-sm"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-muted-foreground">
            No skills added yet. Add some skills to showcase your expertise.
          </p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Suggested Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "React",
            "TypeScript",
            "HTML",
            "CSS",
            "Node.js",
            "Python",
            "SQL",
            "Project Management",
            "Communication",
            "Leadership",
            "Problem Solving",
          ]
            .filter((skill) => !skills.includes(skill))
            .map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => {
                  if (!skills.includes(skill)) {
                    setSkills([...skills, skill]);
                  }
                }}
              >
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
