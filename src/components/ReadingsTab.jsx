import { useReadings } from "../App.jsx"

const ReadingsTab = () => {
  const { readings } = useReadings()

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Readings History</h3>

        {readings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No readings recorded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Go to the Reading Input tab to add your first reading.</p>
          </div>
        ) : (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reading Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readings.map((reading) => (
                  <tr key={reading.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reading.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reading.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reading.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {readings.length > 0 && <div className="mt-4 text-sm text-gray-500">Total readings: {readings.length}</div>}
      </div>
    </div>
  )
}

export default ReadingsTab
