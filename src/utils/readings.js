const READINGS_KEY = "water_readings"

export const saveReading = (reading) => {
  const readings = getReadings()
  readings.push(reading)
  localStorage.setItem(READINGS_KEY, JSON.stringify(readings))
}

export const getReadings = () => {
  const readings = localStorage.getItem(READINGS_KEY)
  return readings ? JSON.parse(readings) : []
}
