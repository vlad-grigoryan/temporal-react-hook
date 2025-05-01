import { useMemo } from 'react';
import { Temporal } from '@js-temporal/polyfill';

export type IsSameUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

/**
 * useIsSame
 * Checks if two Temporal date/time objects are the same for a given unit (like moment(date1).isSame(date2, unit)).
 * Supports: year, month, week (ISO), day, hour, minute, second.
 *
 * @param a First Temporal object (PlainDateTime, ZonedDateTime, or Instant)
 * @param b Second Temporal object
 * @param unit The unit to compare by
 * @returns boolean
 */
export default function useIsSame(
  a: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  b: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  unit: IsSameUnit
): boolean {
  return useMemo(() => {
    if (!a || !b) return false;
    // Convert both to PlainDateTime in local time zone for comparison
    const toPlain = (d: any): Temporal.PlainDateTime => {
      if (typeof d.toPlainDateTime === 'function') return d.toPlainDateTime();
      if (typeof d.toZonedDateTimeISO === 'function') return d.toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDateTime();
      if (typeof d.toZonedDateTime === 'function') return d.toZonedDateTime(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDateTime();
      return d;
    };
    const da = toPlain(a);
    const db = toPlain(b);
    switch (unit) {
      case 'year':
        return da.year === db.year;
      case 'month':
        return da.year === db.year && da.month === db.month;
      case 'week': {
        // ISO week: get week number and year
        const getISOWeek = (d: Temporal.PlainDateTime) => {
          const plain = Temporal.PlainDate.from(d);
          const temp = plain.with({ day: plain.day });
          const thursday = temp.add({ days: 3 - ((temp.dayOfWeek + 6) % 7) });
          const week1 = Temporal.PlainDate.from({ year: thursday.year, month: 1, day: 4 });
          return 1 + Math.floor((thursday.since(week1).days) / 7);
        };
        return da.year === db.year && getISOWeek(da) === getISOWeek(db);
      }
      case 'day':
        return da.year === db.year && da.month === db.month && da.day === db.day;
      case 'hour':
        return da.year === db.year && da.month === db.month && da.day === db.day && da.hour === db.hour;
      case 'minute':
        return da.year === db.year && da.month === db.month && da.day === db.day && da.hour === db.hour && da.minute === db.minute;
      case 'second':
        return da.year === db.year && da.month === db.month && da.day === db.day && da.hour === db.hour && da.minute === db.minute && da.second === db.second;
      default:
        return false;
    }
  }, [a, b, unit]);
}
