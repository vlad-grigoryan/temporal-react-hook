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
declare const useTimeZone: () => {
    timeZone: string;
    convertToTimeZone: (dateTime: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant, targetTimeZone: string, options?: ConversionOptions) => string | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant;
};
export default useTimeZone;
