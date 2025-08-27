export const formatDateTime = (isoString) => {
  const date = new Date(isoString)

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return {
    date: formattedDate,
    time: formattedTime,
  }
}
