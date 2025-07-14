import { Temporal } from '@js-temporal/polyfill';
import { useMemo } from 'react';

type DateInput = Temporal.ZonedDateTime | string;

/**
 * The unit to calculate the difference in.
 */
type DifferenceUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond' | 'microsecond' | 'nanosecond';

interface UseDifferenceOptions {
  /** The first date. */
  dateLeft: DateInput;
  /** The second date, which will be subtracted from the first. */
  dateRight: DateInput;
  /** The unit to return the difference in. */
  unit: DifferenceUnit;
}

const normalizeDate = (date: DateInput): Temporal.ZonedDateTime => {
  if (date instanceof Temporal.ZonedDateTime) {
    return date;
  }
  try {
    return Temporal.ZonedDateTime.from(date);
  } catch (error) {
    throw new Error(`Invalid date input: ${date}. Please provide a valid ISO 8601 string or a Temporal.ZonedDateTime object.`);
  }
};

/**
 * Calculates the numerical difference between two dates in a specified unit.
 *
 * @param {UseDifferenceOptions} options - The options for the hook.
 * @returns {number} The total difference between the two dates in the specified unit.
 */
const useDifference = ({ dateLeft, dateRight, unit }: UseDifferenceOptions): number => {
  const difference = useMemo(() => {
    const zonedDateLeft = normalizeDate(dateLeft);
    const zonedDateRight = normalizeDate(dateRight);

    // Calculate the duration between the two dates.
    // `dateLeft.since(dateRight)` is equivalent to `dateLeft - dateRight`.
    const duration = zonedDateLeft.since(zonedDateRight);

    // Return the total duration in the specified unit.
    return duration.total({ unit });
  }, [dateLeft, dateRight, unit]);

  return difference;
};

export default useDifference;
