import { AtomIcon, Edit, Share2 } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Home() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="bg-gray-900 h-full min-h-screen flex flex-col items-center text-white">
      <section className="pb-10 9bg-gradient-to-r from-teal-500 to-purple-600 text-white w-full py-20">
        <div className="container mx-auto text-center px-4 lg:px-12">
          <h1 className="mb-6 pt-8 text-5xl font-extrabold tracking-tight leading-tight lg:text-7xl">
            Create a{" "}
            <span className="text-yellow-300">Professional Resume</span> in
            Minutes
          </h1>
          <p className="mb-12 text-xl font-normal lg:text-2xl sm:px-16 xl:px-48">
            Our AI-powered resume builder helps you craft the perfect resume
            effortlessly — just a few clicks, and you're done!
          </p>
          {isSignedIn ? (
            <div className="flex gap-4 justify-center items-center">
              <Link to="/dashboard">
                <button className="inline-block rounded-full bg-yellow-500 px-10 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:bg-yellow-400 transition-all duration-300">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth/sign-in">
              <button className="inline-block rounded-full bg-yellow-500 px-10 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:bg-yellow-400 transition-all duration-300">
                Get Started Now
              </button>
            </Link>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-800 w-full">
        <div className="container mx-auto text-center px-4 lg:px-12">
          <h2 className="mb-4 text-4xl font-bold text-white">How It Works</h2>
          <p className="text-lg text-gray-300 mb-12">
            Follow these simple steps to build and share your standout resume
          </p>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl bg-gray-700 p-8 shadow-lg hover:shadow-lg hover:shadow-teal-500/50 transition duration-300">
              <AtomIcon className="h-10 w-10 text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">
                Provide Your Details
              </h3>
              <p className="text-gray-300 text-sm">
                Fill in your personal information, skills, and experiences to
                create the foundation of your resume.
              </p>
            </div>

            <div className="block rounded-xl bg-gray-700 p-8 shadow-lg hover:shadow-lg hover:shadow-purple-500/50 transition duration-300">
              <Edit className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">
                Customize Your Resume
              </h3>
              <p className="text-gray-300 text-sm">
                Choose from professionally designed templates, adjust the
                layout, and personalize the content to suit your style.
              </p>
            </div>

            <div className="block rounded-xl bg-gray-700 p-8 shadow-lg hover:shadow-lg hover:shadow-green-500/50 transition duration-300">
              <Share2 className="h-10 w-10 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">
                Download & Share
              </h3>
              <p className="text-gray-300 text-sm">
                Once you're satisfied, download your resume or share it directly
                with potential employers and networking platforms.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
              <button className="inline-block rounded-full bg-blue-600 px-12 py-4 text-lg font-medium text-white shadow-lg hover:bg-blue-700 transition duration-300">
                Start Building Your Resume Today
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
