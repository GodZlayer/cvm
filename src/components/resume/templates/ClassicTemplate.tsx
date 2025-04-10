import { useI18n } from "@/lib/i18n";
import { TemplateProps } from ".";
import { colorSchemeValues } from ".";

export default function ClassicTemplate({ data }: TemplateProps) {
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
      className="font-serif text-sm"
      id="resume-to-print"
      style={{ color: colors.text, backgroundColor: colors.background }}
    >
      {/* Header - Classic centered style */}
      <div
        className="text-center mb-6 pb-4 border-b-2"
        style={styles.primaryBorderBottom}
      >
        <h1
          className="text-3xl font-bold uppercase tracking-wider mb-1"
          style={styles.primary}
        >
          {personalDetails.fullName || t.yourName}
        </h1>
        <p className="text-lg font-medium text-gray-700 mb-2">
          {personalDetails.title || t.professionalTitleDefault}
        </p>

        <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-gray-600">
          {personalDetails.email && <div>{personalDetails.email}</div>}
          {personalDetails.phone && <div>{personalDetails.phone}</div>}
          {personalDetails.address && <div>{personalDetails.address}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Summary */}
        {personalDetails.summary && (
          <div>
            <h2
              className="text-lg font-semibold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ ...styles.primary, borderBottomColor: colors.primary }}
            >
              {t.summary}
            </h2>
            <p className="text-justify">{personalDetails.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ ...styles.primary, borderBottomColor: colors.primary }}
            >
              {t.workExperienceTitle}
            </h2>
            <div className="space-y-4">
              {workExperience.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold" style={styles.primary}>
                      {job.position}
                    </h3>
                    <span className="text-gray-600 italic">
                      {job.startDate} - {job.current ? t.present : job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold">{job.company}</p>
                  <p className="mt-1 text-sm text-justify">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ ...styles.primary, borderBottomColor: colors.primary }}
            >
              {t.educationPreviewTitle}
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold" style={styles.primary}>
                      {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                    </h3>
                    <span className="text-gray-600 italic">
                      {edu.startDate} - {edu.current ? t.present : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="mt-1 text-sm text-justify">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ ...styles.primary, borderBottomColor: colors.primary }}
            >
              {t.skillsPreviewTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="border px-3 py-1 rounded-sm text-sm"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
