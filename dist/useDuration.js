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
    const addDuration = (dateTime, duration) => {
        return dateTime.add(duration);
    };
    const subtractDuration = (dateTime, duration) => {
        return dateTime.subtract(duration);
    };
    const formatDuration = (duration) => {
        return duration.toString(); // ISO 8601 duration string
    };
    return { duration, createDuration, addDuration, subtractDuration, formatDuration };
};
exports.default = useDuration;
