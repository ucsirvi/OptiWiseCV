import { useEffect, useState } from "react";
import AddResume from "../components/AddResume.jsx";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi.js";
import ResumeCardItem from "../components/ResumeCardItem.jsx";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isLoaded && user) {
      getResumesList();
    }
  }, [isLoaded, user]);

  const getResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setResumeList(resp.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        setError("Failed to fetch resumes. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <div className="p-16 mt-6  md:px-20 lg:px-32 bg-gray-900 text-white min-h-screen">
      <h2 className="font-bold text-3xl">My Resumes</h2>
      <p className="text-gray-400">
        Start creating your AI-powered resume for your next job role.
      </p>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        {loading ? (
          [1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[280px] rounded-lg bg-slate-700 animate-pulse"
              key={index}
            ></div>
          ))
        ) : resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              key={resume.id}
              refreshData={getResumesList}
            />
          ))
        ) : (
          <div className="col-span-full text-center">
            <p>No resumes available. Start by creating a new resume!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
