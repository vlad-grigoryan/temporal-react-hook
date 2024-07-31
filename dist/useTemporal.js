"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const polyfill_1 = require("@js-temporal/polyfill");
const useTemporal = () => {
    const [now, setNow] = (0, react_1.useState)(polyfill_1.Temporal.Now.plainDateTimeISO());
    (0, react_1.useEffect)(() => {
        const intervalId = setInterval(() => {
            setNow(polyfill_1.Temporal.Now.plainDateTimeISO());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return now;
};
exports.default = useTemporal;
