"use client"

import { useState } from "react"
import NumberStepper from "../components/NumberStepper.jsx"
import { saveReading } from "../utils/readings.js"

function ReadingInput() {
  const [treatedWater, setTreatedWater] = useState(0)
  const [wastedWater, setWastedWater] = useState(0)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (treatedWater < 0) {
      newErrors.treatedWater = "Treated water cannot be negative"
    }
    if (wastedWater < 0) {
      newErrors.wastedWater = "Wasted water cannot be negative"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save reading
    saveReading({
      treatedWater: Number.parseFloat(treatedWater),
      wastedWater: Number.parseFloat(wastedWater),
      date: new Date().toISOString(),
    })

    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)

    // Reset form
    setTreatedWater(0)
    setWastedWater(0)
    setErrors({})
  }

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Water Reading Input</h1>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Reading saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Treated Water Unit</label>
            <NumberStepper value={treatedWater} onChange={setTreatedWater} error={errors.treatedWater} />
            {errors.treatedWater && <p className="mt-1 text-sm text-red-600">{errors.treatedWater}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wasted Water Unit</label>
            <NumberStepper value={wastedWater} onChange={setWastedWater} error={errors.wastedWater} />
            {errors.wastedWater && <p className="mt-1 text-sm text-red-600">{errors.wastedWater}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Reading
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReadingInput
