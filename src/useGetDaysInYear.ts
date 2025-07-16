import { useMemo } from 'react';
import { Temporal } from '@js-temporal/polyfill';

/**
 * @name useGetDaysInYear
 * @description A hook that returns the total number of days in the year for a given date.
 * @param {string | Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime} date - The date for which to get the number of days in the year.
 * @returns {number} The number of days in the year (365 or 366 for leap years).
 */
const useGetDaysInYear = (date: string | Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime): number => {
  const daysInYear = useMemo(() => {
    try {
      // Convert to PlainDate which has the daysInYear property
      let plainDate: Temporal.PlainDate;
      
      if (typeof date === 'string') {
        // Try to parse as ISO string
        plainDate = Temporal.PlainDate.from(date);
      } else if (date instanceof Date) {
        // Convert JS Date to PlainDate
        plainDate = Temporal.PlainDate.from({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        });
      } else if (date instanceof Temporal.PlainDate) {
        plainDate = date;
      } else if (date instanceof Temporal.PlainDateTime) {
        plainDate = date.toPlainDate();
      } else if (date instanceof Temporal.ZonedDateTime) {
        plainDate = date.toPlainDate();
      } else {
        throw new Error('Invalid date input');
      }
      
      return plainDate.daysInYear;
    } catch (error) {
      console.error('Error in useGetDaysInYear:', error);
      return 365; // Default fallback
    }
  }, [date]);

  return daysInYear;
};

export default useGetDaysInYear;
