import { Temporal } from '@js-temporal/polyfill';
declare const useDuration: () => {
    duration: Temporal.Duration | null;
    createDuration: (options: Temporal.DurationLike) => Temporal.Duration;
    addDuration: (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => Temporal.PlainDateTime;
    subtractDuration: (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => Temporal.PlainDateTime;
    formatDuration: (duration: Temporal.Duration) => string;
};
export default useDuration;
