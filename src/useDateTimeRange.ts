import { useState, useMemo, useCallback } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import useTemporalDateTime from './useTemporalDateTime';

/** Smallest unit accepted by length/toArray helpers */
export type SmallestUnit = 'day' | 'hour' | 'minute' | 'second';

const pluralUnit: Record<SmallestUnit, keyof Temporal.DurationLike> = {
  day: 'days',
  hour: 'hours',
  minute: 'minutes',
  second: 'seconds',
};

export interface DateTimeRangeOptions {
  /** Clamp end so it never exceeds the live "now". */
  clampToNow?: boolean;
  /** Unit used by length / toArray calculations. */
  smallestUnit?: SmallestUnit;
}

export interface DateTimeRange {
  start: Temporal.PlainDateTime;
  end: Temporal.PlainDateTime;
}

export default function useDateTimeRange(
  initialStart?: Temporal.PlainDateTime,
  initialEnd?: Temporal.PlainDateTime,
  opts: DateTimeRangeOptions = {}
) {
  const now = useTemporalDateTime();
  const {
    clampToNow = false,
    smallestUnit = 'day',
  } = opts;

  const [range, setRange] = useState<DateTimeRange>(() => {
    const start = initialStart ?? now;
    const end = initialEnd ?? now;
    return Temporal.PlainDateTime.compare(start, end) <= 0 ? { start, end } : { start: end, end: start };
  });

  /** Ensure ordering & clamping rules */
  const normalise = useCallback((start: Temporal.PlainDateTime, end: Temporal.PlainDateTime): DateTimeRange => {
    if (Temporal.PlainDateTime.compare(start, end) > 0) {
      [start, end] = [end, start];
    }
    if (clampToNow && Temporal.PlainDateTime.compare(end, now) > 0) {
      end = now;
    }
    return { start, end };
  }, [clampToNow, now]);

  const setStart = useCallback((d: Temporal.PlainDateTime) => {
    setRange(r => normalise(d, r.end));
  }, [normalise]);

  const setEnd = useCallback((d: Temporal.PlainDateTime) => {
    setRange(r => normalise(r.start, d));
  }, [normalise]);

  const shiftBy = useCallback((dur: Temporal.DurationLike) => {
    setRange(r => {
      const start = r.start.add(dur);
      const end = r.end.add(dur);
      return normalise(start, end);
    });
  }, [normalise]);

  const length = useMemo(() => {
    const pluralField = pluralUnit[smallestUnit];
    const diff = range.start.until(range.end, { largestUnit: smallestUnit });
    return ((diff as any)[pluralField] as number) + 1;
  }, [range, smallestUnit]);

  const contains = useCallback((d: Temporal.PlainDateTime) => {
    return (
      Temporal.PlainDateTime.compare(d, range.start) >= 0 &&
      Temporal.PlainDateTime.compare(d, range.end) <= 0
    );
  }, [range]);

  const toArray = useCallback(() => {
    const out: Temporal.PlainDateTime[] = [];
    let cursor = range.start;
    const unitField = pluralUnit[smallestUnit];
    const step = Temporal.Duration.from({ [unitField]: 1 } as any);
    while (Temporal.PlainDateTime.compare(cursor, range.end) <= 0) {
      out.push(cursor);
      cursor = cursor.add(step);
    }
    return out;
  }, [range, smallestUnit]);

  return {
    range,
    setStart,
    setEnd,
    shiftBy,
    length,
    contains,
    toArray,
  } as const;
}
