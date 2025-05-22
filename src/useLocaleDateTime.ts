import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

type TemporalInput = Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant;

/**
 * Custom formatter function type that allows users to provide their own formatting logic
 */
type CustomFormatterFn = (date: Date, locale: string, originalValue: TemporalInput) => string;

function isPlainDateTime(input: any): input is Temporal.PlainDateTime {
  return (
    typeof input === "object" &&
    typeof input.year === "number" &&
    typeof input.month === "number" &&
    typeof input.day === "number" &&
    typeof input.hour === "number" &&
    typeof input.minute === "number" &&
    typeof input.second === "number" &&
    typeof input.toZonedDateTime === "function"
  );
}

function isZonedDateTime(input: any): input is Temporal.ZonedDateTime {
  return (
    typeof input === "object" &&
    typeof input.epochMilliseconds === "number" &&
    typeof input.timeZoneId === "string"
  );
}

function isInstant(input: any): input is Temporal.Instant {
  return (
    typeof input === "object" &&
    (typeof input.epochMilliseconds === "bigint" || typeof input.epochMilliseconds === "number") &&
    typeof input.toZonedDateTimeISO === "function"
  );
}

function isCustomFormatter(input: any): input is CustomFormatterFn {
  return typeof input === "function";
}

function toJSDate(input: TemporalInput): Date {
  if (isZonedDateTime(input)) {
    return new Date(input.epochMilliseconds);
  } else if (isPlainDateTime(input)) {
    const zoned = input.toZonedDateTime(Temporal.Now.zonedDateTimeISO().timeZoneId);
    return new Date(zoned.toInstant().epochMilliseconds);
  } else if (isInstant(input)) {
    return new Date(Number(input.epochMilliseconds));
  }
  throw new Error("Unsupported Temporal type");
}

/**
 * Hook for formatting Temporal date/time objects as localized strings
 * 
 * @param value - A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)
 * @param locale - Optional locale string (e.g., 'en-US', 'fr-FR')
 * @param options - Either Intl.DateTimeFormatOptions or a custom formatter function
 * @returns A formatted string based on the locale and options/formatter
 * 
 * @example
 * // Using Intl.DateTimeFormatOptions
 * const formatted = useLocaleDateTime(now, 'en-US', { dateStyle: 'full', timeStyle: 'short' });
 * 
 * @example
 * // Using a custom formatter function
 * const formatted = useLocaleDateTime(now, 'en-US', (date, locale, original) => {
 *   // Custom formatting logic
 *   return `Year: ${original.year}, Month: ${original.month}`;
 * });
 */
export function useLocaleDateTime(
  value: TemporalInput,
  locale: string = typeof navigator !== 'undefined' ? navigator.language : 'en-US',
  options?: Intl.DateTimeFormatOptions | CustomFormatterFn
): string {
  const jsDate = useMemo(() => toJSDate(value), [value]);
  
  return useMemo(() => {
    // If options is a function, use it as a custom formatter
    if (isCustomFormatter(options)) {
      return options(jsDate, locale, value);
    }
    
    // Otherwise, use Intl.DateTimeFormat with the provided options
    return new Intl.DateTimeFormat(locale, options).format(jsDate);
  }, [jsDate, locale, options, value]);
}

export default useLocaleDateTime;
