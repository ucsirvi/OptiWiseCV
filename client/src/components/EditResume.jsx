import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/FormSection.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import GlobalApi from "../../service/GlobalApi.js";
import { ResumeInfoContext } from "../context/ResumeInfoContext.jsx";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    getResumeInfo();
  }, [resumeId]);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        setResumeInfo(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching resume info:", error);
      });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="container mx-auto p-5 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-5 text-white">
          Edit Resume
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-8">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resume Form
            </h2>
            <FormSection />
          </div>
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resume Preview
            </h2>
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
