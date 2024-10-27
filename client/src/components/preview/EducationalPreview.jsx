import PropTypes from "prop-types";

function EducationalPreview({ resumeInfo }) {
  const educationList = Array.isArray(resumeInfo?.education)
    ? resumeInfo.education
    : [];

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {educationList.map((education) => (
        <div key={education.id || education.universityName} className="my-5">
          <h3
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {education.universityName}
          </h3>
          <h4 className="text-xs flex justify-between">
            {education?.degree} in {education?.major}
            <span>
              {education?.startDate} - {education?.endDate}
            </span>
          </h4>
          <p
            className="text-xs my-2  text-justify leading-tight"
            style={{
              wordBreak: "break-word",
              hyphens: "auto",
              lineHeight: "1.4",
              marginBottom: "0.5rem",
            }}
          >
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

EducationalPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        universityName: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        major: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ),
  }),
};

export default EducationalPreview;
