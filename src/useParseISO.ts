import { Temporal } from '@js-temporal/polyfill';
import { useMemo } from 'react';

/**
 * Parse an ISO-8601 date/time string into a `Temporal.PlainDateTime` instance.
 *
 * The hook memoises the parsed value and re-computes only when `isoString` changes.
 * If the string is invalid, the hook returns `null`.
 *
 * @param isoString – A string in ISO-8601 format (e.g. "2025-07-21T15:30:00Z").
 * @returns `Temporal.PlainDateTime` when parsable, otherwise `null`.
 */
export default function useParseISO(isoString: string): Temporal.PlainDateTime | null {
  const parsed = useMemo(() => {
    if (!isoString) return null;
    try {
      // Temporal.PlainDateTime.from parses ISO 8601 strings.
      return Temporal.PlainDateTime.from(isoString);
    } catch {
      return null;
    }
  }, [isoString]);

  return parsed;
}
