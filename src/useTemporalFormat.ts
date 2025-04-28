import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

/**
 * useTemporalFormat
 * Formats Temporal objects (PlainDate, PlainDateTime, ZonedDateTime, Instant) to a string using Intl.DateTimeFormat options or a preset.
 *
 * @param date Temporal object to format
 * @param options Intl.DateTimeFormat options or preset string ('short', 'medium', 'long', 'full')
 * @param locale Optional locale string (default: system locale)
 * @returns Formatted string
 */
export default function useTemporalFormat(
  date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  options?: Intl.DateTimeFormatOptions | 'short' | 'medium' | 'long' | 'full',
  locale?: string
): string {
  return useMemo(() => {
    if (!date) return '';
    let jsDate: Date;
    if ('toZonedDateTimeISO' in date && typeof date.toZonedDateTimeISO === 'function') {
      jsDate = new Date(date.toString());
    } else if ('toString' in date && typeof date.toString === 'function') {
      jsDate = new Date(date.toString());
    } else {
      return String(date);
    }
    let resolvedOptions: Intl.DateTimeFormatOptions = {};
    if (typeof options === 'string') {
      // Preset
      switch (options) {
        case 'short':
          resolvedOptions = { dateStyle: 'short', timeStyle: 'short' } as Intl.DateTimeFormatOptions;
          break;
        case 'medium':
          resolvedOptions = { dateStyle: 'medium', timeStyle: 'medium' } as Intl.DateTimeFormatOptions;
          break;
        case 'long':
          resolvedOptions = { dateStyle: 'long', timeStyle: 'long' } as Intl.DateTimeFormatOptions;
          break;
        case 'full':
          resolvedOptions = { dateStyle: 'full', timeStyle: 'full' } as Intl.DateTimeFormatOptions;
          break;
        default:
          resolvedOptions = {};
      }
    } else if (options) {
      resolvedOptions = options;
    }
    return new Intl.DateTimeFormat(locale, resolvedOptions).format(jsDate);
  }, [date, options, locale]);
}
