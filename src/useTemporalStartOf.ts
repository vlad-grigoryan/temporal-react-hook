import { useCallback } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalStartOf
 * Returns a function to get the start of a given unit (second, minute, hour, day, week, month, year) for a Temporal.PlainDateTime.
 * Example: const startOf = useTemporalStartOf(); startOf(date, 'week')
 */
export type StartOfUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export default function useTemporalStartOf() {
  return useCallback(
    (
      date: Temporal.PlainDateTime,
      unit: StartOfUnit
    ): Temporal.PlainDateTime => {
      // operate directly on the provided ISO PlainDateTime
      switch (unit) {
        case 'second':
          return date.with({ millisecond: 0 });
        case 'minute':
          return date.with({ second: 0, millisecond: 0 });
        case 'hour':
          return date.with({ minute: 0, second: 0, millisecond: 0 });
        case 'day':
          return date.with({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        case 'week': {
          const dayOfWeek = date.dayOfWeek || date.toPlainDate().dayOfWeek; // ISO: 1=Monday
          const startOfWeek = date.subtract({ days: dayOfWeek - 1 });
          return startOfWeek.with({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        }
        case 'month':
          return date.with({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
        case 'quarter': {
          const month = date.month;
          const quarterStartMonth = Math.floor((month - 1) / 3) * 3 + 1;
          return date.with({
            month: quarterStartMonth,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          });
        }
        case 'year':
          return date.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
        default:
          return date;
      }
    },
    []
  );
}
