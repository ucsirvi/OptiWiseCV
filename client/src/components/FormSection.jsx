import { useState } from "react";
import PersonalDetail from "../components/forms/PersonalDetail.jsx";
import { Button } from "../components/button.jsx";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Summary from "../components/forms/Summary.jsx";
import Experience from "../components/forms/Experience.jsx";
import Education from "../components/forms/Education.jsx";
import Project from "../components/forms/Project.jsx";
import Skills from "../components/forms/Skills.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor.jsx";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button aria-label="Go to Dashboard">
              <Home />
            </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 2 && (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 3 && <Education />}
      {activeFormIndex === 4 && <Experience />}

      {activeFormIndex === 5 && <Project />}
      {activeFormIndex === 6 && <Skills />}
      {activeFormIndex === 7 && <Navigate to={`/my-resume/${resumeId}/view`} />}
    </div>
  );
}

export default FormSection;
