"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const polyfill_1 = require("@js-temporal/polyfill");
const useDuration = () => {
    const [duration, setDuration] = (0, react_1.useState)(null);
    const createDuration = (options) => {
        const newDuration = polyfill_1.Temporal.Duration.from(options);
        setDuration(newDuration);
        return newDuration;
    };
    const compareDurations = (a, b) => {
        // Returns negative if a < b, positive if a > b, 0 if equal
        return a.total('seconds') - b.total('seconds');
    };
    const getTotalSeconds = (duration) => {
        return duration.total('seconds');
    };
    const addDuration = (dateTime, duration) => {
        return dateTime.add(duration);
    };
    const subtractDuration = (dateTime, duration) => {
        return dateTime.subtract(duration);
    };
    const formatDuration = (duration) => {
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
exports.default = useDuration;
