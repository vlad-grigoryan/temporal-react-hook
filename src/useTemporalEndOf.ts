import { useCallback } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { StartOfUnit } from "./useTemporalStartOf";

/**
 * useTemporalEndOf
 * Returns a function to get the end of a given unit (second, minute, hour, day, week, month, year) for a Temporal.PlainDateTime.
 * Example: const endOf = useTemporalEndOf(); endOf(date, 'month')
 */
export default function useTemporalEndOf() {
  return useCallback((date: Temporal.PlainDateTime, unit: StartOfUnit): Temporal.PlainDateTime => {
    switch (unit) {
      case 'second':
        return date.with({ millisecond: 999 });
      case 'minute':
        return date.with({ second: 59, millisecond: 999 });
      case 'hour':
        return date.with({ minute: 59, second: 59, millisecond: 999 });
      case 'day':
        return date.with({ hour: 23, minute: 59, second: 59, millisecond: 999 });
      case 'week': {
        const dayOfWeek = date.dayOfWeek || date.toPlainDate().dayOfWeek; // ISO: 1=Monday
        const endOfWeek = date.add({ days: 7 - dayOfWeek });
        return endOfWeek.with({ hour: 23, minute: 59, second: 59, millisecond: 999 });
      }
      case 'month': {
        const daysInMonth = date.daysInMonth || date.toPlainDate().daysInMonth;
        return date.with({ day: daysInMonth, hour: 23, minute: 59, second: 59, millisecond: 999 });
      }
      case 'year':
        return date.with({ month: 12, day: 31, hour: 23, minute: 59, second: 59, millisecond: 999 });
      default:
        return date;
    }
  }, []);
}
