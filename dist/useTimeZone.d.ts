import { Temporal } from '@js-temporal/polyfill';
declare const useTimeZone: () => {
    timeZone: string;
    convertToTimeZone: (dateTime: Temporal.PlainDateTime, targetTimeZone: string) => Temporal.ZonedDateTime;
};
export default useTimeZone;
