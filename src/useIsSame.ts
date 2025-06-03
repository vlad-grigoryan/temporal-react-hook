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
/**
 * Helper function to convert various Temporal objects to PlainDateTime.
 * If a timeZone is provided, Instant and ZonedDateTime will be converted to PlainDateTime
 * in that specified time zone. Otherwise, the system's current time zone is used.
 */
function toTemporalPlainDateTime( 
  temporalObject: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant,
  timeZone?: string
): Temporal.PlainDateTime {
  if (temporalObject instanceof Temporal.PlainDateTime) {
    return temporalObject;
  } else if (temporalObject instanceof Temporal.ZonedDateTime) {
    // Convert ZonedDateTime to PlainDateTime in the specified or its own time zone
    return temporalObject.toPlainDateTime();
  } else if (temporalObject instanceof Temporal.Instant) {
    // Convert Instant to PlainDateTime in the specified time zone or system's current time zone
    const targetTimeZone = timeZone || Temporal.Now.timeZoneId();
    return temporalObject.toZonedDateTimeISO(targetTimeZone).toPlainDateTime();
  }
  throw new Error('Invalid Temporal object provided.');
}

/**
 * useIsSame
 * Checks if two Temporal date/time objects are the same for a given unit (like moment(date1).isSame(date2, unit)).
 * Supports: year, month, week (ISO), day, hour, minute, second.
 *
 * @param a First Temporal object (PlainDateTime, ZonedDateTime, or Instant)
 * @param b Second Temporal object
 * @param unit The unit to compare by
 * @param timeZone Optional: The time zone to use for comparison. If not provided, the system's current time zone is used.
 * @returns boolean
 */
export default function useIsSame(
  a: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  b: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  unit: IsSameUnit,
  timeZone?: string
): boolean {
  return useMemo(() => {
    if (!a || !b) return false;

    const aPlain = toTemporalPlainDateTime(a, timeZone);
    const bPlain = toTemporalPlainDateTime(b, timeZone);

    switch (unit) {
      case 'year':
        return aPlain.year === bPlain.year;
      case 'month':
        return aPlain.year === bPlain.year && aPlain.month === bPlain.month;
      case 'week': {
        // ISO week: get week number and year
        const getISOWeek = (d: Temporal.PlainDateTime) => {
          const plain = Temporal.PlainDate.from(d);
          const temp = plain.with({ day: plain.day });
          const thursday = temp.add({ days: 3 - ((temp.dayOfWeek + 6) % 7) });
          const week1 = Temporal.PlainDate.from({ year: thursday.year, month: 1, day: 4 });
          return 1 + Math.floor((thursday.since(week1).days) / 7);
        };
        return aPlain.year === bPlain.year && getISOWeek(aPlain) === getISOWeek(bPlain);
      }
      case 'day':
        return aPlain.year === bPlain.year && aPlain.month === bPlain.month && aPlain.day === bPlain.day;
      case 'hour':
        return aPlain.year === bPlain.year && aPlain.month === bPlain.month && aPlain.day === bPlain.day && aPlain.hour === bPlain.hour;
      case 'minute':
        return aPlain.year === bPlain.year && aPlain.month === bPlain.month && aPlain.day === bPlain.day && aPlain.hour === bPlain.hour && aPlain.minute === bPlain.minute;
      case 'second':
        return aPlain.year === bPlain.year && aPlain.month === bPlain.month && aPlain.day === bPlain.day && aPlain.hour === bPlain.hour && aPlain.minute === bPlain.minute && aPlain.second === bPlain.second;
      default:
        return false;
    }
  }, [a, b, unit, timeZone]);
}
