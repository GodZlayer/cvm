import { ResumeData } from "./ResumeBuilder";
import { useI18n } from "@/lib/i18n";

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalDetails, workExperience, education, skills } = data;
  const { t } = useI18n();

  return (
    <div className="font-sans text-sm" id="resume-to-print">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        {personalDetails.photo && (
          <div className="flex-shrink-0">
            <img
              src={personalDetails.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
          </div>
        )}
        <div className={personalDetails.photo ? "flex-grow" : "w-full"}>
          <h1 className="text-2xl font-bold">
            {personalDetails.fullName || t.yourName}
          </h1>
          <p className="text-lg font-medium text-gray-700">
            {personalDetails.title || t.professionalTitleDefault}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
            {personalDetails.email && <div>{personalDetails.email}</div>}
            {personalDetails.phone && <div>{personalDetails.phone}</div>}
            {personalDetails.address && <div>{personalDetails.address}</div>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">
            {t.summary}
          </h2>
          <p>{personalDetails.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">
            {t.workExperienceTitle}
          </h2>
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{job.position}</h3>
                  <span className="text-gray-600">
                    {job.startDate} - {job.current ? t.present : job.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{job.company}</p>
                <p className="mt-1 text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">
            {t.educationPreviewTitle}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                  </h3>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.current ? t.present : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="mt-1 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">
            {t.skillsPreviewTitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
