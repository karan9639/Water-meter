"use client";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth.js";

function Navbar() {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      console.log("[v0] Initiating logout...");
      await logout();
      console.log("[v0] Logout completed, redirecting to login");
      window.location.href = "/login";
    } catch (error) {
      console.error("[v0] Logout error:", error);
      // Force redirect even if logout fails
      window.location.href = "/login";
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === "/"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Input Reading
            </Link>
            <Link
              to="/readings"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === "/readings"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              View Readings
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
