export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "N/A"
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Ho_Chi_Minh"
  }).format(new Date(date))
}
