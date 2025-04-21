"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const polyfill_1 = require("@js-temporal/polyfill");
const useTimeZone = () => {
    const [timeZone, setTimeZone] = (0, react_1.useState)(() => polyfill_1.Temporal.Now.zonedDateTimeISO().timeZoneId);
    (0, react_1.useEffect)(() => {
        setTimeZone(polyfill_1.Temporal.Now.zonedDateTimeISO().timeZoneId);
    }, []);
    const convertToTimeZone = (dateTime, targetTimeZone) => {
        // Convert PlainDateTime in current zone to target zone (same instant)
        const zoned = dateTime.toZonedDateTime(timeZone);
        const instant = zoned.toInstant();
        return instant.toZonedDateTimeISO(targetTimeZone);
    };
    return { timeZone, convertToTimeZone };
};
exports.default = useTimeZone;
