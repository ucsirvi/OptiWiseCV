import { createContext } from "react";

export const ResumeInfoContext = createContext({
  firstName: "",
  lastName: "",
  jobTitle: "",
  experience: [],
  project: [],
  education: [],
  skills: [],
});
