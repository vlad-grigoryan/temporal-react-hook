import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";

type TemporalInput = Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant;

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

export function useLocaleDateTime(
  value: TemporalInput,
  locale: string = typeof navigator !== 'undefined' ? navigator.language : 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const jsDate = useMemo(() => toJSDate(value), [value]);
  return useMemo(
    () => new Intl.DateTimeFormat(locale, options).format(jsDate),
    [jsDate, locale, options]
  );
}

export default useLocaleDateTime;
