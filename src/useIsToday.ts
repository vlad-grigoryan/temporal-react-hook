import { Temporal } from '@js-temporal/polyfill';

export default function useIsToday(date: Temporal.PlainDateTime): boolean {
  const now = Temporal.Now.plainDateTimeISO();
  return date.year === now.year && date.month === now.month && date.day === now.day;
}
