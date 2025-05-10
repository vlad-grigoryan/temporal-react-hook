import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';

/**
 * Options for time zone conversion
 */
export interface ConversionOptions {
  /**
   * Output format for the conversion
   * - 'zoned': Returns a ZonedDateTime (default)
   * - 'plain': Returns a PlainDateTime
   * - 'instant': Returns an Instant
   * - 'string': Returns a formatted string
   */
  outputFormat?: 'zoned' | 'plain' | 'instant' | 'string';
  
  /**
   * If true, preserves the wall-clock time when converting
   * If false (default), preserves the exact instant in time
   */
  preserveWallTime?: boolean;
  
  /**
   * Format options for string output (only used when outputFormat is 'string')
   */
  formatOptions?: {
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    [key: string]: any;
  };
  
  /**
   * Locale for string formatting (only used when outputFormat is 'string')
   */
  locale?: string;
}

/**
 * Hook for working with time zones using the Temporal API
 * Provides the current time zone and functions to convert between time zones
 */
const useTimeZone = () => {
    const [timeZone, setTimeZone] = useState(
        () => Temporal.Now.zonedDateTimeISO().timeZoneId
    );

    useEffect(() => {
        setTimeZone(Temporal.Now.zonedDateTimeISO().timeZoneId);
    }, []);

    /**
     * Converts a datetime to a different time zone
     * @param dateTime The datetime to convert
     * @param targetTimeZone The target time zone to convert to
     * @param options Conversion options
     * @returns The converted datetime in the requested format
     */
    const convertToTimeZone = (
        dateTime: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant, 
        targetTimeZone: string,
        options: ConversionOptions = {}
    ) => {
        const {
            outputFormat = 'zoned',
            preserveWallTime = false,
            formatOptions = { dateStyle: 'medium', timeStyle: 'medium' } as any,
            locale
        } = options;
        
        let result;
        
        if (preserveWallTime) {
            // Preserve wall-clock time (e.g., 3:00 PM in New York becomes 3:00 PM in London)
            if (dateTime instanceof Temporal.PlainDateTime) {
                // If it's already a PlainDateTime, just use it directly
                result = dateTime;
            } else if (dateTime instanceof Temporal.ZonedDateTime) {
                // Extract the wall time from the ZonedDateTime
                result = dateTime.toPlainDateTime();
            } else if (dateTime instanceof Temporal.Instant) {
                // Convert the instant to the source time zone first to get wall time
                result = dateTime.toZonedDateTimeISO(timeZone).toPlainDateTime();
            } else {
                throw new Error('Unsupported input type for convertToTimeZone');
            }
            
            // For wall time preservation, we just create a new ZonedDateTime with the same wall time
            if (outputFormat === 'zoned') {
                return result.toZonedDateTime(targetTimeZone);
            }
        } else {
            // Preserve the exact instant (default behavior)
            let instant: Temporal.Instant;
            
            if (dateTime instanceof Temporal.PlainDateTime) {
                // Convert PlainDateTime in current zone to an instant
                const zoned = dateTime.toZonedDateTime(timeZone);
                instant = zoned.toInstant();
            } else if (dateTime instanceof Temporal.ZonedDateTime) {
                // Extract the instant from the ZonedDateTime
                instant = dateTime.toInstant();
            } else if (dateTime instanceof Temporal.Instant) {
                // Use the instant directly
                instant = dateTime;
            } else {
                throw new Error('Unsupported input type for convertToTimeZone');
            }
            
            // Convert to target time zone
            const zonedResult = instant.toZonedDateTimeISO(targetTimeZone);
            
            if (outputFormat === 'zoned') {
                return zonedResult;
            } else if (outputFormat === 'instant') {
                return instant;
            } else if (outputFormat === 'plain') {
                return zonedResult.toPlainDateTime();
            }
            
            result = zonedResult;
        }
        
        // Handle string output format
        if (outputFormat === 'string') {
            if (result instanceof Temporal.PlainDateTime) {
                // Convert to ZonedDateTime for proper formatting with time zone
                result = result.toZonedDateTime(targetTimeZone);
            }
            return result.toLocaleString(locale, formatOptions);
        }
        
        // Default return for plain format in wall time preservation mode
        return result;
    };

    return { timeZone, convertToTimeZone };
};

export default useTimeZone;
