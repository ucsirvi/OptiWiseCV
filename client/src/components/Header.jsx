import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <header className="fixed top-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        <div className="text-xl font-bold tracking-wide text-teal-400">
          <Link to="/">OptiWiseCV</Link>
        </div>


        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-teal-400 transition duration-300 text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-teal-400 transition duration-300 text-lg font-medium"
          >
            About
          </Link>
          {isSignedIn && (
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-teal-400 transition duration-300 text-lg font-medium"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link to="/auth/sign-in">
              <button className="bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-600 transition duration-300 shadow-md">
                Sign In
              </button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 text-center rounded-lg shadow-lg">
          <Link
            to="/"
            className="block text-lg mb-2 text-gray-300 hover:text-teal-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-lg mb-2 text-gray-300 hover:text-teal-400 transition duration-300"
          >
            About
          </Link>
          {isSignedIn && (
            <Link
              to="/dashboard"
              className="block text-lg mb-2 text-gray-300 hover:text-teal-400 transition duration-300"
            >
              Dashboard
            </Link>
          )}
          {isSignedIn ? (
            <UserButton className="mt-2" />
          ) : (
            <Link to="/auth/sign-in">
              <button className="bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-600 transition duration-300 shadow-md">
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
