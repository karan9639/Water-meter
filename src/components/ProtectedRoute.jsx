import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    console.log("[v0] Authentication failed, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
