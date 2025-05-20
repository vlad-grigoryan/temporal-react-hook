import { useEffect, useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';

/**
 * useRelativeTime - React hook for human-friendly relative time strings.
 * @param input Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant
 * @param options Configuration options
 * @param options.refreshIntervalMs How often to refresh the relative time (default: 10000ms)
 * @param options.locale Locale for formatting (default: undefined, uses browser's locale)
 * @param options.style Formatting style - 'long' ("in 5 hours"), 'short' ("in 5 hr"), or 'narrow' ("in 5h")
 * @returns string (e.g. "3 minutes ago", "in 2 hours", "last month")
 */

function getInstant(input: any): Temporal.Instant {
  if (typeof input.toInstant === 'function') {
    return input.toInstant();
  } else if (typeof input.epochNanoseconds === 'bigint') {
    return input;
  } else {
    // Assume PlainDateTime in local zone
    return input.toZonedDateTime(Temporal.Now.zonedDateTimeISO().timeZoneId).toInstant();
  }
}

function getRelativeString(from: Temporal.Instant, to: Temporal.Instant, style?: string, locale?: string): string {
  // Use hour as largest unit as that's what Temporal allows
  const duration = from.until(to, { largestUnit: 'hour' });
  const seconds = duration.total({ unit: 'seconds' });
  
  if (Math.abs(seconds) < 45) return 'just now';
  
  // Use Intl.RelativeTimeFormat if available for proper localization
  const absSeconds = Math.abs(seconds);
  const isInFuture = seconds < 0; // If negative, the reference time is in the future
  
  // Create a RelativeTimeFormat instance if locale is provided and the browser supports it
  let rtf = null;
  if (locale && typeof Intl !== 'undefined' && 'RelativeTimeFormat' in Intl) {
    rtf = new (Intl as any).RelativeTimeFormat(locale, {
      numeric: 'always',
      style: style === 'narrow' ? 'narrow' : style === 'short' ? 'short' : 'long'
    });
  }
  
  // Create formatted strings based on style
  const formatValue = (value: number, unit: string): string => {
    const plural = value === 1 ? '' : 's';
    
    if (style === 'narrow') {
      // Very brief format: '5h', '2d'
      return `${value}${unit.charAt(0)}`;
    } else if (style === 'short') {
      // Short format: '5 hr', '2 days'
      const shortUnit = unit === 'hour' ? 'hr' : unit === 'minute' ? 'min' : unit;
      return `${value} ${shortUnit}${plural}`;
    } else {
      // Long format: '5 hours', '2 days'
      return `${value} ${unit}${plural}`;
    }
  };
  
  const formatRelative = (value: number, unit: string): string => {
    // If we have a RelativeTimeFormat instance and a valid unit, use it
    if (rtf && ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'].includes(unit)) {
      // Negate the value for future times (RTF expects negative for future)
      const rtfValue = isInFuture ? -value : value;
      // Use the unit directly - TypeScript doesn't recognize RelativeTimeFormatUnit
      return rtf.format(rtfValue, unit);
    }
    
    // Fallback to custom formatting if RTF is not available or unit is invalid
    const formatted = formatValue(value, unit);
    
    if (style === 'narrow') {
      return isInFuture ? `${formatted}` : `-${formatted}`;
    } else {
      return isInFuture ? `in ${formatted}` : `${formatted} ago`;
    }
  };
  
  // Handle different time scales
  if (absSeconds < 90) { // Less than 1.5 minutes
    return formatRelative(1, 'minute');
  }
  
  if (absSeconds < 3600) { // Less than 1 hour
    const minutes = Math.round(duration.total({ unit: 'minutes' }));
    return formatRelative(minutes, 'minute');
  }
  
  if (absSeconds < 86400) { // Less than 1 day
    const hours = Math.round(duration.total({ unit: 'hours' }));
    return formatRelative(hours, 'hour');
  }
  
  if (absSeconds < 604800) { // Less than 1 week
    const days = Math.round(absSeconds / 86400);
    return formatRelative(days, 'day');
  }
  
  if (absSeconds < 2592000) { // Less than 30 days (approx 1 month)
    const weeks = Math.round(absSeconds / 604800);
    return formatRelative(weeks, 'week');
  }
  
  if (absSeconds < 31536000) { // Less than 1 year
    const months = Math.round(absSeconds / 2592000);
    return formatRelative(months, 'month');
  }
  
  // More than 1 year
  const years = Math.round(absSeconds / 31536000);
  return formatRelative(years, 'year');
}

interface UseRelativeTimeOptions {
  refreshIntervalMs?: number;
  locale?: string;
  style?: 'long' | 'short' | 'narrow';
}

export default function useRelativeTime(
  input: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant,
  options?: UseRelativeTimeOptions
): string {
  const { 
    refreshIntervalMs = 10000, 
    locale, 
    style = 'long' 
  } = options || {};
  
  const [relative, setRelative] = useState(() => {
    const now = Temporal.Now.instant();
    return getRelativeString(getInstant(input), now, style, locale);
  });

  useEffect(() => {
    const update = () => {
      const now = Temporal.Now.instant();
      setRelative(getRelativeString(getInstant(input), now, style, locale));
    };
    
    update(); // Initial update
    
    // Calculate next meaningful refresh time based on the current relative time
    let nextRefresh = refreshIntervalMs;
    
    // For "just now", update more frequently
    if (relative === 'just now') {
      nextRefresh = Math.min(nextRefresh, 5000);
    }
    // For minute-level updates, refresh around minute boundaries
    else if (relative.includes('minute')) {
      nextRefresh = Math.min(nextRefresh, 30000);
    }
    
    const id = setInterval(update, nextRefresh);
    return () => clearInterval(id);
  }, [input, refreshIntervalMs, locale, style, relative]);

  return relative;
}
