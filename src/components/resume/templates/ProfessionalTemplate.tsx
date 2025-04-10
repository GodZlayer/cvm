import { useI18n } from "@/lib/i18n";
import { TemplateProps } from ".";
import { colorSchemeValues } from ".";

export default function ProfessionalTemplate({ data }: TemplateProps) {
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
    text: { color: colors.text },
    background: { backgroundColor: colors.background },
  };

  return (
    <div
      className="font-sans text-sm"
      id="resume-to-print"
      style={styles.background}
    >
      {/* Header with sidebar layout */}
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-1/3 p-6" style={styles.primaryBg}>
          {personalDetails.photo && (
            <div className="flex justify-center mb-6">
              <img
                src={personalDetails.photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-white shadow-md"
              />
            </div>
          )}

          <div className="text-white">
            <h1 className="text-2xl font-bold mb-1 text-white">
              {personalDetails.fullName || t.yourName}
            </h1>
            <p className="text-lg font-medium mb-4 text-white/90">
              {personalDetails.title || t.professionalTitleDefault}
            </p>

            <div className="space-y-3 mb-6">
              {personalDetails.email && (
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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

            {/* Skills in sidebar */}
            {skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/30 pb-1">
                  {t.skillsPreviewTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white/20 text-white px-2 py-1 rounded-sm text-xs inline-block mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="w-2/3 p-6" style={styles.text}>
          {/* Summary */}
          {personalDetails.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2" style={styles.primary}>
                {t.summary}
              </h2>
              <p className="text-justify">{personalDetails.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-lg font-semibold mb-4 pb-1 border-b"
                style={{ ...styles.primary, ...styles.primaryBorderBottom }}
              >
                {t.workExperienceTitle}
              </h2>
              <div className="space-y-4">
                {workExperience.map((job) => (
                  <div key={job.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold" style={styles.primary}>
                        {job.position}
                      </h3>
                      <span className="text-gray-600 text-sm">
                        {job.startDate} -{" "}
                        {job.current ? t.present : job.endDate}
                      </span>
                    </div>
                    <p className="font-medium">{job.company}</p>
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
                className="text-lg font-semibold mb-4 pb-1 border-b"
                style={{ ...styles.primary, ...styles.primaryBorderBottom }}
              >
                {t.educationPreviewTitle}
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold" style={styles.primary}>
                        {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                      </h3>
                      <span className="text-gray-600 text-sm">
                        {edu.startDate} -{" "}
                        {edu.current ? t.present : edu.endDate}
                      </span>
                    </div>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="mt-1 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
