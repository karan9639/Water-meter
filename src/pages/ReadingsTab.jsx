import { getReadings } from "../utils/readings.js"
import { formatDateTime } from "../utils/dateTime.js"

function ReadingsTab() {
  const readings = getReadings()

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Water Readings History</h1>

        {readings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No readings recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Treated Water
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wasted Water
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readings.map((reading, index) => {
                  const { date, time } = formatDateTime(reading.date)
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.treatedWater}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.wastedWater}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReadingsTab
