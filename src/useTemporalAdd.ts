import { useCallback } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalAdd
 * Returns a function to add a specified amount of seconds, minutes, hours, days, weeks, months, or years to a Temporal.PlainDateTime.
 * 
 * @example
 * ```typescript
 * const add = useTemporalAdd();
 * 
 * // Add multiple duration units
 * const futureDate = add(now, {
 *   years: 1,    // Add 1 year
 *   months: 6,   // and 6 months
 *   days: 15,    // and 15 days
 *   hours: 3     // and 3 hours
 * });
 * ```
 */
export default function useTemporalAdd() {
  return useCallback((date: Temporal.PlainDateTime, amount: Partial<Temporal.DurationLike>) => {
    // Validate date input
    if (!date) {
      throw new Error('Date is required. Please provide a valid Temporal.PlainDateTime object.');
    }

    if (!(date instanceof Temporal.PlainDateTime)) {
      throw new Error('Invalid date type. Expected Temporal.PlainDateTime but received: ' + 
        ((date as any)?.constructor?.name || typeof date));
    }

    // Validate amount input
    if (!amount || typeof amount !== 'object') {
      throw new Error('Duration amount is required. Please provide an object with duration values ' +
        '(e.g., { days: 1, hours: 2 })');
    }

    // Validate duration values
    const validKeys = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds'];
    const invalidKeys = Object.keys(amount).filter(key => !validKeys.includes(key));
    
    if (invalidKeys.length > 0) {
      throw new Error(`Invalid duration units found: ${invalidKeys.join(', ')}. ` +
        `Valid units are: ${validKeys.join(', ')}`);
    }

    // Validate duration values are numbers
    for (const [key, value] of Object.entries(amount)) {
      if (typeof value !== 'number') {
        throw new Error(`Invalid value for ${key}: ${value}. Duration values must be numbers.`);
      }
    }

    try {
      return date.add(amount);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to add duration: ${err.message}. ` +
        'Please check that your duration values are within valid ranges.');
    }
  }, []);
}
