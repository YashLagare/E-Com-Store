import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorState = ({ message = "Something went wrong..." }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-gray-300 px-6">
      <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
      <h2 className="text-xl font-semibold text-red-400 mb-2">Oops! 😒</h2>
      <p className="mb-6 text-sm">{message}</p>
      <Link
        to="/"
        className="bg-gray-700 hover:bg-gray-600 text-emerald-400 px-4 py-2 rounded-lg font-semibold transition"
      >
        Go Back Home😔
      </Link>
    </div>
  );
};

export default ErrorState;