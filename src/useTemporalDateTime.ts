import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalDateTime: Normalizes various date/time inputs to a Temporal.PlainDateTime.
 * - If input is undefined, returns the current Temporal.PlainDateTime (live, recalculated each render).
 * - If input is a string or Date, converts to Temporal.PlainDateTime.
 * - If input is a Temporal object, coerces to PlainDateTime if needed.
 */
export default function useTemporalDateTime(
  input?: string | Date | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant
): Temporal.PlainDateTime {
  return useMemo(() => {
    if (input === undefined) {
      return Temporal.Now.plainDateTimeISO();
    }
    if (typeof input === "string") {
      // Try parsing as ISO string
      try {
        return Temporal.PlainDateTime.from(input);
      } catch {
        // fallback: try parsing as Date
        const date = new Date(input);
        return Temporal.PlainDateTime.from({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          millisecond: date.getMilliseconds(),
        });
      }
    }
    if (input instanceof Date) {
      return Temporal.PlainDateTime.from({
        year: input.getFullYear(),
        month: input.getMonth() + 1,
        day: input.getDate(),
        hour: input.getHours(),
        minute: input.getMinutes(),
        second: input.getSeconds(),
        millisecond: input.getMilliseconds(),
      });
    }
    // If already Temporal
    if (typeof Temporal.PlainDateTime !== "undefined" && input instanceof Temporal.PlainDateTime) {
      return input as Temporal.PlainDateTime;
    }
    if (typeof Temporal.ZonedDateTime !== "undefined" && input instanceof Temporal.ZonedDateTime) {
      return input.toPlainDateTime();
    }
    if (typeof Temporal.Instant !== "undefined" && input instanceof Temporal.Instant) {
      // Convert to PlainDateTime in system time zone
      return input.toZonedDateTimeISO(Temporal.Now.timeZoneId()).toPlainDateTime();
    }
    throw new Error("Unsupported input type for useTemporalDateTime");
  }, [input]);
}
