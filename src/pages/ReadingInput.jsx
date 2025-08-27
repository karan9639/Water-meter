"use client";

import { useState } from "react";
import NumberStepper from "../components/NumberStepper.jsx";
import DecimalDisplay from "../components/DecimalDisplay.jsx";
import { saveReading } from "../utils/api.js";

function ReadingInput() {
  const [treatedWater, setTreatedWater] = useState("");
  const [wastedWater, setWastedWater] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const treatedValue =
      treatedWater === "" ? 0 : Number.parseFloat(treatedWater);
    const wastedValue = wastedWater === "" ? 0 : Number.parseFloat(wastedWater);

    if (isNaN(treatedValue) || treatedValue < 0) {
      newErrors.treatedWater = "Treated water must be a valid positive number";
    }
    if (isNaN(wastedValue) || wastedValue < 0) {
      newErrors.wastedWater = "Wasted water must be a valid positive number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await saveReading({
        treatedWater: treatedValue,
        wastedWater: wastedValue,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      setTreatedWater("");
      setWastedWater("");
    } catch (error) {
      setErrors({ general: "Failed to save reading. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Water Reading Input
        </h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Current Values Preview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DecimalDisplay
              value={treatedWater === "" ? 0 : Number.parseFloat(treatedWater)}
              label="Treated Water Reading"
              description="Clean water processed and ready for distribution"
              maxDecimals={2}
            />
            <DecimalDisplay
              value={wastedWater === "" ? 0 : Number.parseFloat(wastedWater)}
              label="Wasted Water Reading"
              description="Water lost during treatment or distribution process"
              maxDecimals={2}
            />
          </div>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Reading saved successfully!
          </div>
        )}

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treated Water Unit
            </label>
            <NumberStepper
              value={treatedWater}
              onChange={setTreatedWater}
              error={errors.treatedWater}
            />
            {errors.treatedWater && (
              <p className="mt-1 text-sm text-red-600">{errors.treatedWater}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wasted Water Unit
            </label>
            <NumberStepper
              value={wastedWater}
              onChange={setWastedWater}
              error={errors.wastedWater}
            />
            {errors.wastedWater && (
              <p className="mt-1 text-sm text-red-600">{errors.wastedWater}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Reading"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReadingInput;
