import { Button } from "./components/button.jsx";
import { ResumeInfoContext } from "./context/ResumeInfoContext.jsx";
import ResumePreview from "./components/ResumePreview.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../service/GlobalApi.js";
import { RWebShare } from "react-web-share";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
      .catch((err) => {
        console.error("Error fetching resume data", err);
      });
  };

  const handlePreview = () => {
    const element = document.getElementById("print-area");

    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setPreviewImage(imgData);
        setShowPreview(true);
      })
      .catch((err) => {
        console.error("Error generating preview", err);
      });
  };

  const handleDownload = () => {
    const element = document.getElementById("print-area");
    const opt = {
      margin: 0,
      filename: `${resumeInfo?.firstName || "Resume"}_${
        resumeInfo?.lastName || ""
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo }}>
      <div id="no-print" className="bg-gray-900 text-gray-300 min-h-screen p-8">
        <div className="my-10 mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold mb-4">
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Now you are ready to download your resume and you can share a unique
            resume URL with your friends and family.
          </p>
          <div className="flex justify-between my-10">
            <Button
              onClick={handlePreview}
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
            >
              Preview & Download
            </Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                url: `${
                  import.meta.env.VITE_BASE_URL
                }/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName || ""} ${
                  resumeInfo?.lastName || ""
                } resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white transition duration-200">
                Share
              </Button>
            </RWebShare>
          </div>
        </div>
        <div className="my-10 mx-auto h-full w-full max-w-[800px]">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>

        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-5 rounded-lg shadow-lg max-w-3xl w-full">
              <h3 className="text-lg font-bold mb-5 text-white">
                Resume Preview
              </h3>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Resume Preview"
                  className="w-full max-h-96 object-contain"
                />
              ) : (
                <p className="text-white">Generating preview...</p>
              )}
              <div className="flex justify-end mt-5">
                <Button
                  onClick={() => setShowPreview(false)}
                  className="bg-red-600 hover:bg-red-700 text-white transition duration-200"
                >
                  Close
                </Button>
                <Button
                  onClick={handleDownload}
                  className="ml-3 bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
