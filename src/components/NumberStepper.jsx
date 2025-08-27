"use client"

function NumberStepper({ value, onChange, error }) {
  const handleIncrement = () => {
    onChange(Number.parseFloat(value) + 1)
  }

  const handleDecrement = () => {
    const newValue = Number.parseFloat(value) - 1
    if (newValue >= 0) {
      onChange(newValue)
    }
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (inputValue === "" || (!isNaN(inputValue) && Number.parseFloat(inputValue) >= 0)) {
      onChange(inputValue === "" ? 0 : Number.parseFloat(inputValue))
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={value <= 0}
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min="0"
        step="0.1"
        className={`w-24 px-3 py-2 text-center border ${
          error ? "border-red-300" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        +
      </button>
    </div>
  )
}

export default NumberStepper
