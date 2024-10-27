import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <main className="bg-gray-900 min-h-screen flex justify-center items-center text-white">
      <SignIn
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        appearance={{
          variables: {
            colorPrimary: "#38b2ac",
            colorText: "#f7fafc",
            colorBackground: "#2d3748",
          },
          elements: {
            card: "rounded-lg border border-gray-600",
            buttonPrimary:
              "bg-teal-500 hover:bg-teal-400 text-white rounded-full px-4 py-2 transition duration-300",
            input:
              "border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400",
          },
        }}
      />
    </main>
  );
}

export default SignInPage;
