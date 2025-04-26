import { Temporal } from '@js-temporal/polyfill';

export default function useIsThisMonth(date: Temporal.PlainDateTime): boolean {
  const now = Temporal.Now.plainDateTimeISO();
  return date.year === now.year && date.month === now.month;
}
