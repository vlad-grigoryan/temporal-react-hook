"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const polyfill_1 = require("@js-temporal/polyfill");
const useTimeZone = () => {
    const [timeZone, setTimeZone] = (0, react_1.useState)(() => polyfill_1.Temporal.Now.zonedDateTimeISO().getTimeZone());
    (0, react_1.useEffect)(() => {
        // Effect to set the initial time zone
        setTimeZone(polyfill_1.Temporal.Now.zonedDateTimeISO().getTimeZone());
    }, []);
    const convertToTimeZone = (dateTime, targetTimeZone) => {
        const targetZone = polyfill_1.Temporal.TimeZone.from(targetTimeZone);
        const zonedDateTime = polyfill_1.Temporal.ZonedDateTime.from({
            year: dateTime.year,
            month: dateTime.month,
            day: dateTime.day,
            hour: dateTime.hour,
            minute: dateTime.minute,
            second: dateTime.second,
            millisecond: dateTime.millisecond,
            timeZone
        });
        return zonedDateTime.withTimeZone(targetZone);
    };
    return { timeZone, convertToTimeZone };
};
exports.default = useTimeZone;
