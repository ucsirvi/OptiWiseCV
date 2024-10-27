import PropTypes from "prop-types";

function SkillsPreview({ resumeInfo }) {

  if (!resumeInfo || !resumeInfo.skills || resumeInfo.skills.length === 0) {
    return (
      <div className="text-center text-red-500">
        No skills information available.
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo.themeColor }} />
      <div className="my-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-600">Skills</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {" "}
          {resumeInfo.skills.map((skill) => (
            <div key={skill.id} className="flex justify-items-center ">
              <span className="text-black">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


SkillsPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, 
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired, 
      })
    ),
  }),
};

export default SkillsPreview;
