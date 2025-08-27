"use client"

import { useState } from "react"
import { useReadings } from "../App.jsx"

const ReadingInput = () => {
  const [reading, setReading] = useState("")
  const [message, setMessage] = useState("")
  const { addReading } = useReadings()

  const handleInputChange = (e) => {
    const value = e.target.value
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setReading(value)
    }
  }

  const handleIncrement = () => {
    const currentValue = Number.parseFloat(reading) || 0
    setReading((currentValue + 1).toString())
  }

  const handleDecrement = () => {
    const currentValue = Number.parseFloat(reading) || 0
    setReading(Math.max(0, currentValue - 1).toString())
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!reading || reading === "") {
      setMessage("Please enter a reading value")
      return
    }

    const numericReading = Number.parseFloat(reading)
    if (isNaN(numericReading)) {
      setMessage("Please enter a valid number")
      return
    }

    addReading(numericReading)
    setReading("")
    setMessage("Reading submitted successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Enter Reading</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="reading" className="block text-sm font-medium text-gray-700">
              Reading Value
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={handleDecrement}
                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <span className="text-lg font-bold">−</span>
              </button>
              <input
                type="text"
                name="reading"
                id="reading"
                className="flex-1 min-w-0 block w-full px-3 py-2 border-t border-b border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg font-medium"
                placeholder="0.0"
                value={reading}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <span className="text-lg font-bold">+</span>
              </button>
            </div>
          </div>

          {message && (
            <div className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReadingInput
