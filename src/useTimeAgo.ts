import { useEffect, useState } from "react";
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

function getTimeAgoString(from: Temporal.Instant, to: Temporal.Instant): string {
  // Use 'largestUnit: "hours"' to avoid TS error ("day" not assignable)
  const duration = from.until(to, { largestUnit: "hours" });
  const seconds = duration.total({ unit: "seconds" });
  const absSeconds = Math.abs(seconds);
  const absMinutes = Math.abs(duration.total({ unit: "minutes" }));
  const absHours = Math.abs(duration.total({ unit: "hours" }));
  // For days, use Math.floor(absHours / 24)
  const absDays = Math.floor(absHours / 24);

  if (absSeconds < 45) return "just now";
  if (absMinutes < 2) return `${Math.round(absMinutes)} minute${Math.round(absMinutes) !== 1 ? 's' : ''} ago`;
  if (absHours < 2) return `${Math.round(absHours)} hour${Math.round(absHours) !== 1 ? 's' : ''} ago`;
  if (absDays < 2) return `${Math.round(absDays)} day${Math.round(absDays) !== 1 ? 's' : ''} ago`;
  if (absDays < 7) return `${Math.round(absDays)} days ago`;
  // Fallback: show ISO date
  return from.toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId).toPlainDate().toString();
}

export default function useTimeAgo(
  input: TemporalInput,
  refreshIntervalMs: number = 10000
): string {
  const [timeAgo, setTimeAgo] = useState(() => {
    const now = Temporal.Now.instant();
    return getTimeAgoString(getInstant(input), now);
  });

  useEffect(() => {
    const update = () => {
      const now = Temporal.Now.instant();
      setTimeAgo(getTimeAgoString(getInstant(input), now));
    };
    update();
    const id = setInterval(update, refreshIntervalMs);
    return () => clearInterval(id);
  }, [input, refreshIntervalMs]);

  return timeAgo;
}
