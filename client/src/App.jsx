import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage.jsx";
import Home from "./Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditResume from "./components/EditResume.jsx";
import ViewResume from "./ViewResume.jsx";
import Header from "./components/Header.jsx";
import { Toaster } from "sonner";
import AboutPage from "./pages/About.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/resume/:resumeId/edit"
            element={<EditResume />}
          />
          <Route path="/my-resume/:resumeId/view" element={<ViewResume />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
