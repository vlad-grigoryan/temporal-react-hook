import { useEffect, useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';

/**
 * useRelativeTime - React hook for human-friendly relative time strings.
 * @param input Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant
 * @returns string (e.g. "3 minutes ago", "in 2 hours")
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

function getRelativeString(from: Temporal.Instant, to: Temporal.Instant): string {
  // Fix: largestUnit must be one of the allowed units (e.g., 'hour', not 'days')
  const duration = from.until(to, { largestUnit: 'hour' });
  const seconds = duration.total({ unit: 'seconds' });
  const absSeconds = Math.abs(seconds);
  const absMinutes = Math.abs(duration.total({ unit: 'minutes' }));
  const absHours = Math.abs(duration.total({ unit: 'hours' }));
  const absDays = Math.abs(duration.total({ unit: 'hours' }) / 24);

  if (absSeconds < 45) return 'just now';
  if (absMinutes < 2) return seconds < 0 ? 'in a minute' : 'a minute ago';
  if (absMinutes < 60) return seconds < 0 ? `in ${Math.round(absMinutes)} minutes` : `${Math.round(absMinutes)} minutes ago`;
  if (absHours < 2) return seconds < 0 ? 'in an hour' : 'an hour ago';
  if (absHours < 24) return seconds < 0 ? `in ${Math.round(absHours)} hours` : `${Math.round(absHours)} hours ago`;
  if (absDays < 2) return seconds < 0 ? 'tomorrow' : 'yesterday';
  if (absDays < 7) return seconds < 0 ? `in ${Math.round(absDays)} days` : `${Math.round(absDays)} days ago`;
  // Fallback: show ISO date
  return from.epochNanoseconds < to.epochNanoseconds
    ? from.toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDate().toString()
    : to.toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDate().toString();
}

export default function useRelativeTime(
  input: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant,
  options?: { refreshIntervalMs?: number }
): string {
  const refreshMs = options?.refreshIntervalMs ?? 10000;
  const [relative, setRelative] = useState(() => {
    const now = Temporal.Now.instant();
    return getRelativeString(getInstant(input), now);
  });

  useEffect(() => {
    const update = () => {
      const now = Temporal.Now.instant();
      setRelative(getRelativeString(getInstant(input), now));
    };
    update();
    const id = setInterval(update, refreshMs);
    return () => clearInterval(id);
  }, [input, refreshMs]);

  return relative;
}
