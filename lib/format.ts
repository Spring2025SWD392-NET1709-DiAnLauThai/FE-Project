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
}

export function formatFromISOString(
  isoString: string | Date,
  format: FormatType
): string {
  const date = new Date(isoString);
  let formattedDateTime = "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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
