import { useEffect, useState, useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

type TemporalInput = Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant;

interface TimeAgoOptions {
  /**
   * Locale for formatting the time ago string
   * @default 'en-US'
   */
  locale?: string | string[];
  
  /**
   * Maximum number of days to show as relative time
   * After this threshold, it will show the date in ISO format
   * @default 7
   */
  maxDays?: number;
  
  /**
   * Format for dates beyond the maxDays threshold
   * If provided, this function will be used instead of the default ISO date
   */
  fallbackFormatter?: (date: Temporal.Instant, locale: string) => string;
  
  /**
   * Style for the relative time format
   * @default 'long'
   */
  style?: 'long' | 'short' | 'narrow';
  
  /**
   * Whether to include the numeric value in the formatted string
   * @default 'always'
   */
  numeric?: 'always' | 'auto';
  
  /**
   * Whether to omit the suffix/prefix (e.g., "ago" or "in")
   * @default false
   */
  withoutSuffix?: boolean;
  
  /**
   * Whether to use calendar-relative formatting when possible
   * (e.g., "yesterday", "today", "tomorrow")
   * @default false
   */
  useCalendarFormat?: boolean;
  
  /**
   * Custom reference time to compare against instead of "now"
   * If not provided, the current time will be used
   */
  referenceTime?: Temporal.Instant | Temporal.PlainDateTime | Temporal.ZonedDateTime;
}

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

function getInstant(input: TemporalInput): Temporal.Instant {
  if (isZonedDateTime(input)) {
    return input.toInstant();
  } else if (isPlainDateTime(input)) {
    const zoned = input.toZonedDateTime(Temporal.Now.zonedDateTimeISO().timeZoneId);
    return zoned.toInstant();
  } else if (isInstant(input)) {
    return input;
  }
  throw new Error("Unsupported Temporal type");
}

function getTimeAgoString(
  from: Temporal.Instant, 
  to: Temporal.Instant, 
  options: TimeAgoOptions = {}
): string {
  const { 
    locale = 'en-US', 
    maxDays = 7, 
    style = 'long', 
    numeric = 'always',
    fallbackFormatter,
    withoutSuffix = false,
    useCalendarFormat = false
  } = options;
  
  // Calculate time difference in seconds
  const seconds = (to.epochMilliseconds - from.epochMilliseconds) / 1000;
  const isPast = seconds > 0;
  
  // Get absolute values for calculations
  const absSeconds = Math.abs(seconds);
  const absMinutes = absSeconds / 60;
  const absHours = absSeconds / 3600;
  const absDays = absSeconds / 86400;
  const absWeeks = absSeconds / 604800;
  const absMonths = absSeconds / 2592000; // Approximate 30-day month
  const absYears = absSeconds / 31536000; // 365-day year
  
  // Special case for very recent times
  if (absSeconds < 45) {
    return "just now";
  }
  
  // Calendar-relative formatting for yesterday, today, tomorrow if enabled
  if (useCalendarFormat && absDays < 2) {
    // Convert both times to calendar dates in the local timezone
    const fromZoned = from.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    const toZoned = to.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    const fromDate = fromZoned.toPlainDate();
    const toDate = toZoned.toPlainDate();
    
    // Check if the dates are on the same day
    if (fromDate.equals(toDate)) {
      return "today";
    }
    
    // Check for yesterday/tomorrow
    const dayDiff = Temporal.PlainDate.compare(fromDate, toDate);
    if (dayDiff === -1 && isPast) {
      return "yesterday";
    } else if (dayDiff === 1 && !isPast) {
      return "tomorrow";
    }
  }
  
  // Use Intl.RelativeTimeFormat for localized strings
  // @ts-ignore - TypeScript may not recognize RelativeTimeFormat in some environments
  const rtf = new Intl.RelativeTimeFormat(locale, { 
    style, 
    numeric,
    // Apply withoutSuffix option if available in the browser
    ...(withoutSuffix ? { displayName: 'withoutSuffix' } : {})
  });
  
  // Determine the appropriate unit and value
  let value: number;
  // Define the unit type since TypeScript may not have it built-in
  let unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  
  if (absSeconds < 90) {
    value = Math.round(isPast ? -absSeconds : absSeconds);
    unit = 'second';
  } else if (absMinutes < 90) {
    value = Math.round(isPast ? -absMinutes : absMinutes);
    unit = 'minute';
  } else if (absHours < 36) {
    value = Math.round(isPast ? -absHours : absHours);
    unit = 'hour';
  } else if (absDays < 7) {
    value = Math.round(isPast ? -absDays : absDays);
    unit = 'day';
  } else if (absDays < 30 && absDays <= maxDays) {
    value = Math.round(isPast ? -absWeeks : absWeeks);
    unit = 'week';
  } else if (absDays < 365 && absDays <= maxDays * 30) {
    value = Math.round(isPast ? -absMonths : absMonths);
    unit = 'month';
  } else if (absDays <= maxDays * 365) {
    value = Math.round(isPast ? -absYears : absYears);
    unit = 'year';
  } else {
    // Beyond the threshold, use the fallback formatter or default to ISO date
    if (fallbackFormatter) {
      return fallbackFormatter(from, Array.isArray(locale) ? locale[0] : locale);
    }
    return from.toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDate().toString();
  }
  
  // If withoutSuffix is true and the browser doesn't support it via options,
  // we need to manually handle it by removing the suffix/prefix
  let result = rtf.format(value, unit);
  
  if (withoutSuffix) {
    // This is a simple approach that works for English
    // For proper internationalization, we'd need more sophisticated handling
    result = result.replace(/ ago$/, '').replace(/^in /, '');
  }
  
  return result;
}

/**
 * A hook that provides a localized, automatically updating "time ago" string
 * for a given Temporal date/time object.
 * 
 * @param input - A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)
 * @param refreshIntervalMs - How often to refresh the time ago string (in milliseconds)
 * @param options - Configuration options for formatting
 * @returns A formatted time ago string that updates automatically
 */
export default function useTimeAgo(
  input: TemporalInput,
  refreshIntervalMs: number = 10000,
  options: TimeAgoOptions = {}
): string {
  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [
    options.locale,
    options.maxDays,
    options.style,
    options.numeric,
    options.withoutSuffix,
    options.useCalendarFormat,
    // We don't include function properties in the dependency array
    // as they would likely cause unnecessary re-renders
  ]);
  
  const [timeAgo, setTimeAgo] = useState(() => {
    // Use the provided reference time or default to current time
    const referenceTime = options.referenceTime 
      ? getInstant(options.referenceTime) 
      : Temporal.Now.instant();
      
    return getTimeAgoString(getInstant(input), referenceTime, memoizedOptions);
  });

  useEffect(() => {
    const update = () => {
      // Use the provided reference time or default to current time
      const referenceTime = options.referenceTime 
        ? getInstant(options.referenceTime) 
        : Temporal.Now.instant();
        
      setTimeAgo(getTimeAgoString(getInstant(input), referenceTime, memoizedOptions));
    };
    
    update();
    
    // Only set up the interval if we're using the current time (not a fixed reference time)
    // or if the reference time is dynamic (e.g., from another hook)
    const shouldRefresh = !options.referenceTime || typeof options.referenceTime === 'function';
    
    if (shouldRefresh) {
      const id = setInterval(update, refreshIntervalMs);
      return () => clearInterval(id);
    }
    
    return undefined;
  }, [input, refreshIntervalMs, memoizedOptions, options.referenceTime]);

  return timeAgo;
}
