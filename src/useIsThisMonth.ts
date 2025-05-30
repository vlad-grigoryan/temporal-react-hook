import { Temporal } from '@js-temporal/polyfill';
import { useMemo } from 'react';

export default function useIsThisMonth(
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
    console.warn('useIsThisMonth received an unexpected Temporal type:', dateTime);
    return Temporal.PlainDate.from('0000-01-01'); // Fallback
  }, [dateTime, currentTimeZone]);

  return inputDateInTargetTimeZone.year === todayInTargetTimeZone.year &&
         inputDateInTargetTimeZone.month === todayInTargetTimeZone.month;
}
