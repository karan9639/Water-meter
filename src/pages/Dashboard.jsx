"use client"

import { useState } from "react"
import { useAuth } from "../App.jsx"
import ReadingInput from "../components/ReadingInput.jsx"
import ReadingsTab from "../components/ReadingsTab.jsx"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("input")
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Reading Tracker</h1>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("input")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "input"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition duration-150 ease-in-out`}
            >
              Reading Input
            </button>
            <button
              onClick={() => setActiveTab("readings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "readings"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition duration-150 ease-in-out`}
            >
              Readings History
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{activeTab === "input" ? <ReadingInput /> : <ReadingsTab />}</div>
      </main>
    </div>
  )
}

export default Dashboard
