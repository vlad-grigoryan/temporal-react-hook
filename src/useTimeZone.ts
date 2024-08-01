import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';

const useTimeZone = () => {
    const [timeZone, setTimeZone] = useState(
        () => Temporal.Now.zonedDateTimeISO().getTimeZone()
    );

    useEffect(() => {
        // Effect to set the initial time zone
        setTimeZone(Temporal.Now.zonedDateTimeISO().getTimeZone());
    }, []);

    const convertToTimeZone = (dateTime: Temporal.PlainDateTime, targetTimeZone: string) => {
        const targetZone = Temporal.TimeZone.from(targetTimeZone);
        const zonedDateTime = Temporal.ZonedDateTime.from({
            year : dateTime.year,
            month: dateTime.month,
            day: dateTime.day,
            hour: dateTime.hour,
            minute: dateTime.minute,
            second: dateTime.second,
            millisecond: dateTime.millisecond,
            timeZone});
        return zonedDateTime.withTimeZone(targetZone);
    };

    return { timeZone, convertToTimeZone };
};

export default useTimeZone;
