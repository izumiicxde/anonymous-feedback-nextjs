import { IMessage } from "@/models/user.model";

export function sortItemsByDateDescending(
  items: IMessage[] | undefined
): IMessage[] | undefined {
  if (items)
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function formatDate(isoDateString: string | Date): string {
  const date = new Date(isoDateString);

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // For 12-hour format with AM/PM
  };

  // Create a formatter with the desired locale and options
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date
  return formatter.format(date);
}
