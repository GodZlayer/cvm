import { useI18n } from "@/lib/i18n";
import { TemplateProps } from ".";
import { colorSchemeValues } from ".";

export default function CreativeTemplate({ data }: TemplateProps) {
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
      {/* Header with accent color block */}
      <div className="relative mb-8">
        <div
          className="absolute top-0 left-0 w-1/3 h-full"
          style={styles.primaryBg}
        ></div>
        <div className="relative flex items-center p-6">
          {personalDetails.photo && (
            <div className="mr-6">
              <img
                src={personalDetails.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1 text-white">
              {personalDetails.fullName || t.yourName}
            </h1>
            <p className="text-xl font-medium mb-3 text-white">
              {personalDetails.title || t.professionalTitleDefault}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {personalDetails.email && (
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={styles.primary}
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
                    style={styles.primary}
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
                    style={styles.primary}
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
      </div>

      <div className="px-6">
        {/* Summary with creative styling */}
        {personalDetails.summary && (
          <div
            className="mb-8 p-4 rounded-lg"
            style={{ backgroundColor: `${colors.primary}10` }}
          >
            <h2 className="text-lg font-semibold mb-2" style={styles.primary}>
              {t.summary}
            </h2>
            <p className="leading-relaxed">{personalDetails.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h2
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={styles.primary}
              >
                <span
                  className="w-8 h-1 inline-block"
                  style={styles.primaryBg}
                ></span>
                {t.workExperienceTitle}
              </h2>
              <div className="space-y-5">
                {workExperience.map((job) => (
                  <div
                    key={job.id}
                    className="relative pl-6 border-l-2"
                    style={styles.primaryBorder}
                  >
                    <div
                      className="absolute top-0 left-[-5px] w-2 h-2 rounded-full"
                      style={styles.primaryBg}
                    ></div>
                    <h3 className="font-bold" style={styles.primary}>
                      {job.position}
                    </h3>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-gray-600 text-xs mb-2">
                      {job.startDate} - {job.current ? t.present : job.endDate}
                    </p>
                    <p className="text-sm">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right column with Education and Skills */}
          <div>
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={styles.primary}
                >
                  <span
                    className="w-8 h-1 inline-block"
                    style={styles.primaryBg}
                  ></span>
                  {t.educationPreviewTitle}
                </h2>
                <div className="space-y-5">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-6 border-l-2"
                      style={styles.primaryBorder}
                    >
                      <div
                        className="absolute top-0 left-[-5px] w-2 h-2 rounded-full"
                        style={styles.primaryBg}
                      ></div>
                      <h3 className="font-bold" style={styles.primary}>
                        {edu.degree} {edu.field ? `em ${edu.field}` : ""}
                      </h3>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-gray-600 text-xs mb-2">
                        {edu.startDate} -{" "}
                        {edu.current ? t.present : edu.endDate}
                      </p>
                      <p className="text-sm">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={styles.primary}
                >
                  <span
                    className="w-8 h-1 inline-block"
                    style={styles.primaryBg}
                  ></span>
                  {t.skillsPreviewTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
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
      </div>
    </div>
  );
}
