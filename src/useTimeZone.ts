import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';

const useTimeZone = () => {
    const [timeZone, setTimeZone] = useState(
        () => Temporal.Now.zonedDateTimeISO().timeZoneId
    );

    useEffect(() => {
        setTimeZone(Temporal.Now.zonedDateTimeISO().timeZoneId);
    }, []);

    const convertToTimeZone = (dateTime: Temporal.PlainDateTime, targetTimeZone: string) => {
        // Convert PlainDateTime in current zone to target zone (same instant)
        const zoned = dateTime.toZonedDateTime(timeZone);
        const instant = zoned.toInstant();
        return instant.toZonedDateTimeISO(targetTimeZone);
    };

    return { timeZone, convertToTimeZone };
};

export default useTimeZone;
