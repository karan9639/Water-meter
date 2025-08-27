"use client";

function NumberStepper({ value, onChange, error }) {
  const handleIncrement = () => {
    const currentValue =
      value === "" || isNaN(Number.parseFloat(value))
        ? 0
        : Number.parseFloat(value);
    const newValue = (currentValue + 0.01).toFixed(2);
    onChange(Number.parseFloat(newValue));
  };

  const handleDecrement = () => {
    const currentValue =
      value === "" || isNaN(Number.parseFloat(value))
        ? 0
        : Number.parseFloat(value);
    const newValue = currentValue - 0.01;
    if (newValue >= 0) {
      onChange(Number.parseFloat(newValue.toFixed(2)));
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === "") {
      onChange("");
      return;
    }

    // Check if input matches pattern for up to 2 decimal places
    const decimalPattern = /^\d*\.?\d{0,2}$/;

    if (decimalPattern.test(inputValue) && Number.parseFloat(inputValue) >= 0) {
      onChange(inputValue);
    }
  };

  const displayValue =
    value === "" || isNaN(Number.parseFloat(value)) ? "" : value;

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={displayValue <= 0}
      >
        −
      </button>
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        placeholder="0.00"
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
  );
}

export default NumberStepper;
