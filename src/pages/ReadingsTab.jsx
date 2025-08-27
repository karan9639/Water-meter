"use client";

import { useState, useEffect } from "react";
import { getReadings } from "../utils/api.js";
import { formatDateTime } from "../utils/dateTime.js";
import DecimalDisplay from "../components/DecimalDisplay.jsx";

function ReadingsTab() {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        setIsLoading(true);
        const data = await getReadings();
        console.log("[v0] Fetched readings data:", data);
        setReadings(data || []);
      } catch (err) {
        setError("Failed to load readings");
        console.error("Error fetching readings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadings();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center py-8">Loading readings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center py-8 text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Water Readings History
        </h1>

        {readings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No readings recorded yet.
          </p>
        ) : (
          <div className="space-y-6">
            {readings.map((reading, index) => {
              const { date, time } = formatDateTime(
                reading.createdAt || reading.date
              );
              return (
                <div
                  key={reading._id || reading.id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {date}{" "}
                      <span className="font-medium ml-4">Time:</span> {time}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DecimalDisplay
                      value={
                        reading.treatedWaterReading || reading.treatedWater
                      }
                      label="Treated Water Reading"
                      description="Clean water processed and ready for distribution"
                      maxDecimals={2}
                    />
                    <DecimalDisplay
                      value={reading.wastedWaterReading || reading.wastedWater}
                      label="Wasted Water Reading"
                      description="Water lost during treatment or distribution process"
                      maxDecimals={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingsTab;
