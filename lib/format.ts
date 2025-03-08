export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  return formattedDate;
};

export enum FormatType {
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  DATETIME_VN = "DATETIME_VN",
}

export function formatFromISOStringVN(
  input: string | Date,
  type: FormatType = FormatType.DATE
): string {
  if (!input) return "";

  // Chuyển đổi input thành đối tượng Date nếu nó là string
  const date = typeof input === "string" ? new Date(input) : input;

  // Check if date is valid
  if (isNaN(date.getTime())) return typeof input === "string" ? input : "";

  // Tiếp tục xử lý định dạng như trước đây
  switch (type) {
    case FormatType.DATE:
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }); // Format: DD/MM/YYYY

    case FormatType.DATETIME:
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); // Format: DD/MM/YYYY HH:MM

    case FormatType.TIME:
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); // Format: HH:MM

    default:
      return date.toLocaleString("vi-VN");
  }
}

export function formatFromISOString(
  isoString: string | Date,
  format: FormatType
): string {
  const date = new Date(isoString);
  let formattedDateTime = "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  switch (format) {
    case FormatType.DATE:
      formattedDateTime = date.toLocaleDateString("en-US", dateOptions);
      break;
    case FormatType.TIME:
      formattedDateTime = date.toLocaleTimeString("en-US", timeOptions);
      break;
    case FormatType.DATETIME:
      formattedDateTime = date.toLocaleString("en-US", {
        ...dateOptions,
        ...timeOptions,
      });
      break;
    default:
      throw new Error("Invalid format type");
  }

  return formattedDateTime;
}

export function formatPriceToVND(price: number): string {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
