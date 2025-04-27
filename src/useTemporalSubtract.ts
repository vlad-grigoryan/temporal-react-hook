import { useCallback } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalSubtract
 * Returns a function to subtract a specified amount of seconds, minutes, hours, days, weeks, months, or years from a Temporal.PlainDateTime.
 * Example: const subtract = useTemporalSubtract(); subtract(date, { days: 1, hours: 2 })
 */
export default function useTemporalSubtract() {
  return useCallback((date: Temporal.PlainDateTime, amount: Partial<Temporal.DurationLike>) => {
    return date.subtract(amount);
  }, []);
}
