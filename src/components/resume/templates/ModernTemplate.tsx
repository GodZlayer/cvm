import { useI18n } from "@/lib/i18n";
import { TemplateProps } from ".";
import { colorSchemeValues } from ".";

export default function ModernTemplate({ data }: TemplateProps) {
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
    primaryBgLight: { backgroundColor: `${colors.primary}1a` }, // 10% opacity
    accent: { color: colors.accent },
    accentBg: { backgroundColor: colors.accent },
  };

  return (
    <div
      className="font-sans text-sm"
      id="resume-to-print"
      style={{ color: colors.text, backgroundColor: colors.background }}
    >
      {/* Header - Modern with photo */}
      <div className="mb-6 flex items-start gap-4">
        {personalDetails.photo && (
          <div className="flex-shrink-0">
            <img
              src={personalDetails.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 shadow-md"
              style={{ borderColor: colors.primary }}
            />
          </div>
        )}
        <div className={personalDetails.photo ? "flex-grow" : "w-full"}>
          <h1 className="text-2xl font-bold" style={styles.primary}>
            {personalDetails.fullName || t.yourName}
          </h1>
          <p className="text-lg font-medium text-gray-700">
            {personalDetails.title || t.professionalTitleDefault}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
            {personalDetails.email && (
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {personalDetails.email}
              </div>
            )}
            {personalDetails.phone && (
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {personalDetails.phone}
              </div>
            )}
            {personalDetails.address && (
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {personalDetails.address}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalDetails.summary && (
        <div
          className="mb-6 bg-gray-50 p-4 rounded-lg border-l-4"
          style={styles.primaryBorder}
        >
          <h2 className="text-lg font-semibold mb-2" style={styles.primary}>
            {t.summary}
          </h2>
          <p>{personalDetails.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold border-b-2 pb-1 mb-4"
              style={{ ...styles.primary, ...styles.primaryBorder }}
            >
              {t.workExperienceTitle}
            </h2>
            <div className="space-y-4">
              {workExperience.map((job) => (
                <div
                  key={job.id}
                  className="pl-4 border-l-2 border-gray-200 hover:border-primary transition-colors duration-300"
                  style={{ borderLeftColor: colors.primary }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium" style={styles.primary}>
                      {job.position}
                    </h3>
                    <span className="text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs">
                      {job.startDate} - {job.current ? t.present : job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{job.company}</p>
                  <p className="mt-1 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold border-b-2 pb-1 mb-4"
              style={{ ...styles.primary, ...styles.primaryBorder }}
            >
              {t.educationPreviewTitle}
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="pl-4 border-l-2 border-gray-200 hover:border-primary transition-colors duration-300"
                  style={{ borderLeftColor: colors.primary }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium" style={styles.primary}>
                      {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                    </h3>
                    <span className="text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs">
                      {edu.startDate} - {edu.current ? t.present : edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{edu.institution}</p>
                  <p className="mt-1 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold border-b-2 pb-1 mb-4"
              style={{ ...styles.primary, ...styles.primaryBorder }}
            >
              {t.skillsPreviewTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${colors.primary}1a`,
                    color: colors.primary,
                  }}
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
