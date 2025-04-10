import { useI18n } from "@/lib/i18n";
import { TemplateProps } from ".";
import { colorSchemeValues } from ".";

export default function MinimalTemplate({ data }: TemplateProps) {
  const {
    personalDetails,
    workExperience,
    education,
    skills,
    colorScheme = "blue",
  } = data;
  const { t } = useI18n();
  const colors = colorSchemeValues[colorScheme];

  const styles = {
    primary: { color: colors.primary },
    primaryBg: { backgroundColor: colors.primary },
    primaryBorder: { borderColor: colors.primary },
    primaryBorderBottom: { borderBottomColor: colors.primary },
    accent: { color: colors.accent },
    accentBg: { backgroundColor: colors.accent },
  };

  return (
    <div
      className="font-sans text-sm"
      id="resume-to-print"
      style={{ color: colors.text, backgroundColor: colors.background }}
    >
      {/* Header - Minimal and clean */}
      <div className="mb-8">
        <h1
          className="text-2xl font-light tracking-wide mb-1"
          style={styles.primary}
        >
          {personalDetails.fullName || t.yourName}
        </h1>
        <p
          className="text-md font-light text-gray-700 border-b pb-2"
          style={styles.primaryBorderBottom}
        >
          {personalDetails.title || t.professionalTitleDefault}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
          {personalDetails.email && <div>{personalDetails.email}</div>}
          {personalDetails.phone && <div>{personalDetails.phone}</div>}
          {personalDetails.address && <div>{personalDetails.address}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Summary */}
        {personalDetails.summary && (
          <div>
            <h2 className="text-md font-medium mb-3" style={styles.primary}>
              {t.summary}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-md font-medium mb-3" style={styles.primary}>
              {t.workExperienceTitle}
            </h2>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium" style={styles.primary}>
                      {job.position}
                    </h3>
                    <span className="text-gray-500 text-xs">
                      {job.startDate} - {job.current ? t.present : job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-md font-medium mb-3" style={styles.primary}>
              {t.educationPreviewTitle}
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium" style={styles.primary}>
                      {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                    </h3>
                    <span className="text-gray-500 text-xs">
                      {edu.startDate} - {edu.current ? t.present : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-md font-medium mb-3" style={styles.primary}>
              {t.skillsPreviewTitle}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((skill, index) => (
                <span key={index} style={styles.primary} className="text-xs">
                  {skill}
                  {index < skills.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
