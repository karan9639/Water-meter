function DecimalDisplay({ value, label, description, maxDecimals = 2 }) {
  // Format the number to show exactly 2 decimal places
  const formatDecimal = (num) => {
    return Number(num).toFixed(2);
  };

  const formattedValue = formatDecimal(value);
  const [integerPart, decimalPart] = formattedValue.split(".");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      <div className="flex items-baseline mb-2">
        <span className="text-2xl font-bold text-gray-900">{integerPart}</span>
        {decimalPart && (
          <>
            <span className="text-2xl font-bold text-blue-600 mx-1">.</span>
            <span className="text-2xl font-bold text-gray-900">
              {decimalPart}
            </span>
          </>
        )}
        <span className="text-sm text-gray-500 ml-2">units</span>
      </div>
      {description && (
        <div className="text-xs text-gray-500">{description}</div>
      )}
    </div>
  );
}

export default DecimalDisplay;
