import { useState, useEffect, useCallback } from 'react';
import { Temporal } from '@js-temporal/polyfill';

export interface TimeZoneOffsetOptions {
  /**
   * If true, the hook returns the offset as a signed number of minutes.
   * If false (default), it returns a formatted string such as "UTC+04:00".
   */
  asMinutes?: boolean;
  /**
   * Interval, in milliseconds, at which to re-evaluate the offset.
   * Defaults to 60 000 ms (one minute) which is ample to capture DST jumps.
   */
  updateOnTick?: number;
}

/**
 * React hook that returns the current UTC offset for a given IANA time-zone and
 * keeps it up-to-date as Daylight Saving Time transitions occur.
 *
 * @param zone  IANA time-zone identifier. Defaults to the system zone.
 * @param opts  Behavioural options – see {@link TimeZoneOffsetOptions}.
 * @returns     Either a formatted offset string (e.g. "UTC+02:00") or a signed
 *              number of minutes east of UTC, depending on `opts.asMinutes`.
 */
export default function useTimeZoneOffset(
  zone: string | Temporal.TimeZoneLike | undefined = Temporal.Now.timeZoneId(),
  opts: TimeZoneOffsetOptions = {}
): string | number {
  const { asMinutes = false, updateOnTick = 60_000 } = opts;

  const calcOffset = useCallback(() => {
    const zdt = Temporal.Now.zonedDateTimeISO(zone as any);
    const minutes = zdt.offsetNanoseconds / 60_000_000_000;
    return asMinutes ? minutes : formatOffset(minutes);
  }, [zone, asMinutes]);

  const [offset, setOffset] = useState<string | number>(() => calcOffset());

  useEffect(() => {
    setOffset(calcOffset()); // sync immediately when deps change
    const id = window.setInterval(() => setOffset(calcOffset()), updateOnTick);
    return () => window.clearInterval(id);
  }, [calcOffset, updateOnTick]);

  return offset;
}

function formatOffset(totalMinutes: number): string {
  const sign = totalMinutes >= 0 ? '+' : '−'; // U+2212 minus sign for aesthetics
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (abs % 60).toString().padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}
