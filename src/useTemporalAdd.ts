import { useCallback } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalAdd
 * Returns a function to add a specified amount of seconds, minutes, hours, days, weeks, months, or years to a Temporal.PlainDateTime.
 * Example: const add = useTemporalAdd(); add(date, { days: 1, hours: 2 })
 */
export default function useTemporalAdd() {
  return useCallback((date: Temporal.PlainDateTime, amount: Partial<Temporal.DurationLike>) => {
    return date.add(amount);
  }, []);
}
