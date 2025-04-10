import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { ResumeData } from "../ResumeBuilder";
import { useI18n } from "@/lib/i18n";

interface PersonalDetailsProps {
  data: ResumeData["personalDetails"];
  updateData: (data: ResumeData["personalDetails"]) => void;
}

export default function PersonalDetails({
  data,
  updateData,
}: PersonalDetailsProps) {
  const { t } = useI18n();
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    // Update parent component when form data changes
    updateData(formData);
  }, [formData, updateData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t.personalDetails}
      </h2>
      <p className="text-muted-foreground mb-6">
        {t.personalDetailsDescription}
      </p>

      <div className="flex justify-center mb-6">
        <ImageUpload
          onImageChange={(imageData) => {
            setFormData((prev) => ({
              ...prev,
              photo: imageData,
            }));
          }}
          currentImage={formData.photo}
          aria-label="Upload profile photo"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t.fullNamePlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">{t.professionalTitle}</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t.professionalTitlePlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">{t.address}</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder={t.addressPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">{t.professionalSummary}</Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder={t.professionalSummaryPlaceholder}
          rows={4}
        />
      </div>
    </div>
  );
}
