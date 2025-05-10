"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const polyfill_1 = require("@js-temporal/polyfill");
/**
 * Hook for working with time zones using the Temporal API
 * Provides the current time zone and functions to convert between time zones
 */
const useTimeZone = () => {
    const [timeZone, setTimeZone] = (0, react_1.useState)(() => polyfill_1.Temporal.Now.zonedDateTimeISO().timeZoneId);
    (0, react_1.useEffect)(() => {
        setTimeZone(polyfill_1.Temporal.Now.zonedDateTimeISO().timeZoneId);
    }, []);
    /**
     * Converts a datetime to a different time zone
     * @param dateTime The datetime to convert
     * @param targetTimeZone The target time zone to convert to
     * @param options Conversion options
     * @returns The converted datetime in the requested format
     */
    const convertToTimeZone = (dateTime, targetTimeZone, options = {}) => {
        const { outputFormat = 'zoned', preserveWallTime = false, formatOptions = { dateStyle: 'medium', timeStyle: 'medium' }, locale } = options;
        let result;
        if (preserveWallTime) {
            // Preserve wall-clock time (e.g., 3:00 PM in New York becomes 3:00 PM in London)
            if (dateTime instanceof polyfill_1.Temporal.PlainDateTime) {
                // If it's already a PlainDateTime, just use it directly
                result = dateTime;
            }
            else if (dateTime instanceof polyfill_1.Temporal.ZonedDateTime) {
                // Extract the wall time from the ZonedDateTime
                result = dateTime.toPlainDateTime();
            }
            else if (dateTime instanceof polyfill_1.Temporal.Instant) {
                // Convert the instant to the source time zone first to get wall time
                result = dateTime.toZonedDateTimeISO(timeZone).toPlainDateTime();
            }
            else {
                throw new Error('Unsupported input type for convertToTimeZone');
            }
            // For wall time preservation, we just create a new ZonedDateTime with the same wall time
            if (outputFormat === 'zoned') {
                return result.toZonedDateTime(targetTimeZone);
            }
        }
        else {
            // Preserve the exact instant (default behavior)
            let instant;
            if (dateTime instanceof polyfill_1.Temporal.PlainDateTime) {
                // Convert PlainDateTime in current zone to an instant
                const zoned = dateTime.toZonedDateTime(timeZone);
                instant = zoned.toInstant();
            }
            else if (dateTime instanceof polyfill_1.Temporal.ZonedDateTime) {
                // Extract the instant from the ZonedDateTime
                instant = dateTime.toInstant();
            }
            else if (dateTime instanceof polyfill_1.Temporal.Instant) {
                // Use the instant directly
                instant = dateTime;
            }
            else {
                throw new Error('Unsupported input type for convertToTimeZone');
            }
            // Convert to target time zone
            const zonedResult = instant.toZonedDateTimeISO(targetTimeZone);
            if (outputFormat === 'zoned') {
                return zonedResult;
            }
            else if (outputFormat === 'instant') {
                return instant;
            }
            else if (outputFormat === 'plain') {
                return zonedResult.toPlainDateTime();
            }
            result = zonedResult;
        }
        // Handle string output format
        if (outputFormat === 'string') {
            if (result instanceof polyfill_1.Temporal.PlainDateTime) {
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
exports.default = useTimeZone;
