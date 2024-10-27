import { ResumeInfoContext } from "../context/ResumeInfoContext.jsx";
import { useContext } from "react";
import PersonalDetailPreview from "../components/preview/PersonalDetailPreview.jsx";
import SummaryPreview from "../components/preview/SummaryPreview.jsx";
import ExperiencePreview from "../components/preview/ExperiencePreview.jsx";
import EducationalPreview from "../components/preview/EducationalPreview.jsx";
import SkillsPreview from "../components/preview/SkillsPreview.jsx";
import ProjectPreview from "../components/preview/ProjectPreview.jsx";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  if (!resumeInfo) {
    return (
      <div className="p-4 text-gray-300">No resume information available.</div>
    );
  }

  const { themeColor, experience, project, education, skills } = resumeInfo;

  return (
    <div
      className="shadow-lg h-auto p-14 border-t-[20px] bg-white text-black overflow-y-auto overflow-x-clip"
      style={{
        borderColor: themeColor || "transparent",
      }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      <SummaryPreview resumeInfo={resumeInfo} />

      {education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {project?.length > 0 && <ProjectPreview resumeInfo={resumeInfo} />}

      {skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
}

export default ResumePreview;
