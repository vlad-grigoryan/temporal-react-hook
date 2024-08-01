import { Temporal } from '@js-temporal/polyfill';
declare const useTimeZone: () => {
    timeZone: Temporal.TimeZoneProtocol;
    convertToTimeZone: (dateTime: Temporal.PlainDateTime, targetTimeZone: string) => Temporal.ZonedDateTime;
};
export default useTimeZone;
