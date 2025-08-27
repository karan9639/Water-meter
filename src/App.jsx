import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import ReadingInput from "./pages/ReadingInput.jsx"
import ReadingsTab from "./pages/ReadingsTab.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Navbar from "./components/Navbar.jsx"
import { isAuthenticated } from "./utils/auth.js"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <ReadingInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/readings"
            element={
              <ProtectedRoute>
                <Navbar />
                <ReadingsTab />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
