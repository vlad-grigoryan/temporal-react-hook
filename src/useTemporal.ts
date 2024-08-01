import { useState, useEffect } from 'react';
import { Temporal } from '@js-temporal/polyfill';

const useTemporal = () => {
    const [now, setNow] = useState(Temporal.Now.plainDateTimeISO());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(Temporal.Now.plainDateTimeISO());
            Temporal.Now.plainDateTimeISO().day
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return now;
};

export default useTemporal;
