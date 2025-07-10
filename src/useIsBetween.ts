import { Temporal } from '@js-temporal/polyfill';
import { useMemo } from 'react';

type DateInput = Temporal.ZonedDateTime | string;
type Inclusivity = '()' | '[]' | '[)' | '(]';

const check = (
  date: Temporal.ZonedDateTime,
  start: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
  inclusivity: Inclusivity
): boolean => {
  const afterStart =
    inclusivity[0] === '['
      ? Temporal.ZonedDateTime.compare(date, start) >= 0
      : Temporal.ZonedDateTime.compare(date, start) > 0;

  const beforeEnd =
    inclusivity[1] === ']'
      ? Temporal.ZonedDateTime.compare(date, end) <= 0
      : Temporal.ZonedDateTime.compare(date, end) < 0;

  return afterStart && beforeEnd;
};

interface UseIsBetweenOptions {
  date: DateInput;
  startDate: DateInput;
  endDate: DateInput;
  inclusivity?: Inclusivity;
}

const useIsBetween = ({
  date,
  startDate,
  endDate,
  inclusivity = '()',
}: UseIsBetweenOptions): boolean => {
  const isBetween = useMemo(() => {
    try {
      const d = typeof date === 'string' ? Temporal.ZonedDateTime.from(date) : date;
      let start = typeof startDate === 'string' ? Temporal.ZonedDateTime.from(startDate) : startDate;
      let end = typeof endDate === 'string' ? Temporal.ZonedDateTime.from(endDate) : endDate;

      if (Temporal.ZonedDateTime.compare(start, end) > 0) {
        [start, end] = [end, start];
      }

      return check(d, start, end, inclusivity);
    } catch (error) {
      console.error('Invalid date provided to useIsBetween:', { date, startDate, endDate, error });
      return false;
    }
  }, [date, startDate, endDate, inclusivity]);

  return isBetween;
};

export default useIsBetween;
