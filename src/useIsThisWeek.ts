import { Temporal } from '@js-temporal/polyfill';
import { useMemo } from 'react';

export default function useIsThisWeek(
  dateTime: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant,
  timeZone?: string
): boolean {
  const currentTimeZone = useMemo(() => timeZone || Temporal.Now.timeZoneId(), [timeZone]);

  const todayInTargetTimeZone = useMemo(() => {
    return Temporal.Now.zonedDateTimeISO(currentTimeZone).toPlainDate();
  }, [currentTimeZone]);

  const inputDateInTargetTimeZone = useMemo(() => {
    if (dateTime instanceof Temporal.PlainDateTime) {
      return dateTime.toZonedDateTime(currentTimeZone).toPlainDate();
    } else if (dateTime instanceof Temporal.ZonedDateTime) {
      return dateTime.withTimeZone(currentTimeZone).toPlainDate();
    } else if (dateTime instanceof Temporal.Instant) {
      return dateTime.toZonedDateTimeISO(currentTimeZone).toPlainDate();
    }
    console.warn('useIsThisWeek received an unexpected Temporal type:', dateTime);
    return Temporal.PlainDate.from('0000-01-01'); // Fallback
  }, [dateTime, currentTimeZone]);

  // Get the start of the week for both dates (Monday as first day of week for ISO 8601)
  // dayOfWeek is 1 for Monday, 7 for Sunday
  const startOfWeekInput = inputDateInTargetTimeZone.subtract({ days: inputDateInTargetTimeZone.dayOfWeek - 1 });
  const startOfWeekToday = todayInTargetTimeZone.subtract({ days: todayInTargetTimeZone.dayOfWeek - 1 });

  return startOfWeekInput.equals(startOfWeekToday);
}
