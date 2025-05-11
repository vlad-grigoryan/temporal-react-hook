import { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';

const useDuration = () => {
    const [duration, setDuration] = useState<Temporal.Duration | null>(null);

    const createDuration = (options: Temporal.DurationLike) => {
        const newDuration = Temporal.Duration.from(options);
        setDuration(newDuration);
        return newDuration;
    };
    
    const compareDurations = (a: Temporal.Duration, b: Temporal.Duration): number => {
        // Returns negative if a < b, positive if a > b, 0 if equal
        return a.total('seconds') - b.total('seconds');
    };
    
    const getTotalSeconds = (duration: Temporal.Duration): number => {
        return duration.total('seconds');
    };

    const addDuration = (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => {
        return dateTime.add(duration);
    };

    const subtractDuration = (dateTime: Temporal.PlainDateTime, duration: Temporal.Duration) => {
        return dateTime.subtract(duration);
    };

    const formatDuration = (duration: Temporal.Duration) => {
        const parts = [];
        
        if (duration.years > 0) {
            parts.push(`${duration.years} ${duration.years === 1 ? 'year' : 'years'}`);
        }
        
        if (duration.months > 0) {
            parts.push(`${duration.months} ${duration.months === 1 ? 'month' : 'months'}`);
        }
        
        if (duration.days > 0) {
            parts.push(`${duration.days} ${duration.days === 1 ? 'day' : 'days'}`);
        }
        
        if (duration.hours > 0) {
            parts.push(`${duration.hours} ${duration.hours === 1 ? 'hour' : 'hours'}`);
        }
        
        if (duration.minutes > 0) {
            parts.push(`${duration.minutes} ${duration.minutes === 1 ? 'minute' : 'minutes'}`);
        }
        
        if (duration.seconds > 0) {
            parts.push(`${duration.seconds} ${duration.seconds === 1 ? 'second' : 'seconds'}`);
        }
        
        if (duration.milliseconds > 0) {
            parts.push(`${duration.milliseconds} ${duration.milliseconds === 1 ? 'millisecond' : 'milliseconds'}`);
        }
        
        if (parts.length === 0) {
            return 'zero duration';
        }
        
        return parts.join(', ');
    };

    return { 
        duration, 
        createDuration, 
        addDuration, 
        subtractDuration, 
        formatDuration,
        compareDurations,
        getTotalSeconds
    };
};

export default useDuration;
