import { Temporal } from '@js-temporal/polyfill';

export default function useIsThisYear(date: Temporal.PlainDateTime): boolean {
  const now = Temporal.Now.plainDateTimeISO();
  return date.year === now.year;
}
