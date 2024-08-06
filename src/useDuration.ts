import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';

const useDuration = () => {
    const [duration, setDuration] = useState<Temporal.Duration | null>(null);

    const createDuration = (options: Temporal.DurationLike) => {
        const newDuration = Temporal.Duration.from(options);
        setDuration(newDuration);
        return newDuration;
    };

    const addDuration = (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => {
        return dateTime.add(duration);
    };

    const subtractDuration = (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => {
        return dateTime.subtract(duration);
    };

    const formatDuration = (duration: Temporal.Duration) => {
        return duration.toString(); // ISO 8601 duration string
    };

    return { duration, createDuration, addDuration, subtractDuration, formatDuration };
};

export default useDuration;
