import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

function getCalendarTimeString(input: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainDate) {
  // Always convert to PlainDateTime for comparison
  let date: Temporal.PlainDateTime;
  if (input instanceof Temporal.PlainDateTime) {
    date = input;
  } else if (input instanceof Temporal.ZonedDateTime) {
    date = input.toPlainDateTime();
  } else if (input instanceof Temporal.PlainDate) {
    date = input.toPlainDateTime({ hour: 0, minute: 0 });
  } else {
    throw new Error("Unsupported type for calendar time");
  }

  const now = Temporal.Now.plainDateTimeISO();
  const today = now.toPlainDate();
  const target = date.toPlainDate();
  const diffDays = Temporal.PlainDate.compare(target, today);

  // Format time part as HH:mm
  const timeString = date.toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" });

  if (diffDays === 0) {
    return `Today at ${timeString}`;
  } else if (diffDays === -1) {
    return `Yesterday at ${timeString}`;
  } else if (diffDays > -7 && diffDays < 0) {
    // Get weekday name
    const weekday = date.toLocaleString(undefined, { weekday: "long" });
    return `Last ${weekday} at ${timeString}`;
  } else {
    // For older dates, just show the date
    return date.toLocaleString();
  }
}

export default function useCalendarTime(
  input: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainDate
): string {
  return useMemo(() => getCalendarTimeString(input), [input]);
}
