import { Temporal } from '@js-temporal/polyfill';

export default function useIsThisWeek(date: Temporal.PlainDateTime): boolean {
  const now = Temporal.Now.plainDateTimeISO();
  // ISO week: get weekOfYear for both
  // Temporal.PlainDateTime does not have weekOfYear, so convert to PlainDate
  const datePlain = Temporal.PlainDate.from(date);
  const nowPlain = Temporal.PlainDate.from(now);
  // Use toString to get YYYY-MM-DD, then use Temporal.PlainDate.from
  const getISOWeek = (d: Temporal.PlainDate) => {
    // Algorithm from ISO week date
    const temp = d.with({ day: d.day });
    const thursday = temp.add({ days: 3 - ((temp.dayOfWeek + 6) % 7) });
    const week1 = Temporal.PlainDate.from({ year: thursday.year, month: 1, day: 4 });
    return 1 + Math.floor((thursday.since(week1).days) / 7);
  };
  return datePlain.year === nowPlain.year && getISOWeek(datePlain) === getISOWeek(nowPlain);
}
