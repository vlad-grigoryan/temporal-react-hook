import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

type FormatPreset = 'short' | 'medium' | 'long' | 'full';

export interface DynamicRules {
  recent?: {
    format: Intl.DateTimeFormatOptions;
    threshold: {
      years?: number;
      months?: number;
      weeks?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    };
  };
  today?: {
    format: Intl.DateTimeFormatOptions;
  };
  thisWeek?: {
    format: Intl.DateTimeFormatOptions;
  };
  thisMonth?: {
    format: Intl.DateTimeFormatOptions;
  };
  thisYear?: {
    format: Intl.DateTimeFormatOptions;
  };
  older?: {
    format: Intl.DateTimeFormatOptions;
  };
}

type FormatOptions = Intl.DateTimeFormatOptions | FormatPreset | {
  preset?: FormatPreset;
  dynamic?: DynamicRules;
  format?: Intl.DateTimeFormatOptions;
};

/**
 * useTemporalFormat
 * Formats Temporal objects (PlainDate, PlainDateTime, ZonedDateTime, Instant) to a string using Intl.DateTimeFormat options,
 * preset, or dynamic rules based on the temporal distance.
 *
 * @param date Temporal object to format
 * @param options Can be:
 *               - A preset string ('short', 'medium', 'long', 'full')
 *               - Intl.DateTimeFormatOptions object
 *               - An object containing dynamic formatting rules
 * @param locale Optional locale string (default: system locale)
 * @returns Formatted string
 */
export default function useTemporalFormat(
  date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
  options?: FormatOptions,
  locale?: string
): string {
  return useMemo(() => {
    if (!date) return '';

    // Convert to ZonedDateTime for consistent comparison
    const now = Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId());
    let zonedDateTime: Temporal.ZonedDateTime;

    if (date instanceof Temporal.Instant) {
      zonedDateTime = date.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    } else if (date instanceof Temporal.ZonedDateTime) {
      zonedDateTime = date;
    } else if (date instanceof Temporal.PlainDateTime) {
      zonedDateTime = date.toZonedDateTime(Temporal.Now.timeZoneId());
    } else if (date instanceof Temporal.PlainDate) {
      // Convert PlainDate to PlainDateTime at start of day, then to ZonedDateTime
      const dateTime = date.toPlainDateTime(Temporal.PlainTime.from({ hour: 0, minute: 0, second: 0 }));
      zonedDateTime = dateTime.toZonedDateTime(Temporal.Now.timeZoneId());
    } else {
      return String(date);
    }

    // Convert ZonedDateTime to ISO string that JavaScript Date can parse
    const jsDate = new Date(zonedDateTime.toInstant().toString());

    // Handle dynamic formatting
    if (options && typeof options === 'object' && 'dynamic' in options && options.dynamic) {
      const { dynamic } = options;
      
      // Check if within recent threshold
      if (dynamic.recent) {
        const diff = now.since(zonedDateTime);
        const threshold = Temporal.Duration.from(dynamic.recent.threshold);
        if (Temporal.Duration.compare(diff.abs(), threshold) < 0) {
          return new Intl.DateTimeFormat(locale, dynamic.recent.format).format(jsDate);
        }
      }

      // Check if today
      if (dynamic.today && zonedDateTime.toPlainDate().equals(now.toPlainDate())) {
        return new Intl.DateTimeFormat(locale, dynamic.today.format).format(jsDate);
      }

      // Check if this week
      if (dynamic.thisWeek) {
        const startOfWeek = now.subtract({ days: now.dayOfWeek });
        const endOfWeek = startOfWeek.add({ days: 7 });
        if (Temporal.ZonedDateTime.compare(zonedDateTime, startOfWeek) >= 0 && 
            Temporal.ZonedDateTime.compare(zonedDateTime, endOfWeek) < 0) {
          return new Intl.DateTimeFormat(locale, dynamic.thisWeek.format).format(jsDate);
        }
      }

      // Check if this month
      if (dynamic.thisMonth && zonedDateTime.year === now.year && zonedDateTime.month === now.month) {
        return new Intl.DateTimeFormat(locale, dynamic.thisMonth.format).format(jsDate);
      }

      // Check if this year
      if (dynamic.thisYear && zonedDateTime.year === now.year) {
        return new Intl.DateTimeFormat(locale, dynamic.thisYear.format).format(jsDate);
      }

      // Fallback to older format
      if (dynamic.older) {
        return new Intl.DateTimeFormat(locale, dynamic.older.format).format(jsDate);
      }
    }

    // Handle existing preset string case
    if (typeof options === 'string') {
      let resolvedOptions: Intl.DateTimeFormatOptions = {};
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
      }
      return new Intl.DateTimeFormat(locale, resolvedOptions).format(jsDate);
    }

    // Handle Intl.DateTimeFormatOptions case
    if (!options || !('dynamic' in options)) {
      return new Intl.DateTimeFormat(locale, options as Intl.DateTimeFormatOptions).format(jsDate);
    }

    // Handle new object format
    if (options.preset) {
      let resolvedOptions: Intl.DateTimeFormatOptions = {};
      switch (options.preset) {
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
      }
      return new Intl.DateTimeFormat(locale, resolvedOptions).format(jsDate);
    }

    return new Intl.DateTimeFormat(locale, options.format || {}).format(jsDate);
  }, [date, options, locale]);
}
