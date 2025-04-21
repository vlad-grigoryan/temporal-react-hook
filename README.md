<div>
    <h1>temporal-react-hook</h1>
    <h6>react-temporal-hooks is a React library that provides hooks for handling date and time operations using the Temporal API.</h6> 
</div>

## Available hooks: 
#### [useTemporal](#usetemporal-hook)
#### [useTimeZone](#usetimezone-hook)
#### [useDuration](#useduration-hook)


### Description for Hooks

### `useTemporal hook`
<p>The <b>useTemporal</b> hook provides the current date and time using the Temporal API. It automatically updates the date and time every second, ensuring that the component using this hook always displays the most recent time.</p>

#### Features:

- __Real-time Updates:__ The hook updates the current date and time every second.
- __Temporal API Integration:__ Utilizes the Temporal API for precise and reliable date and time handling.
- __Ease of Use:__ Simple to integrate and use in any React component.

#### Example Usage:

```jsx
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporal } from 'your-package-name';

const App: React.FC = () => {
  const now = useTemporal();

  return (
    <div>
      <h1>Current Date and Time</h1>
      <p>{now.toString()}</p>
    </div>
  );
};

export default App;
```
### Benefits

- __Accuracy__: Temporal API provides nanosecond precision and handles time zones and calendar systems better than the traditional Date object.
- __Simplicity__: The hook abstracts the complexity of handling real-time updates, making it easy to display current date and time in your React application.
- __Immutable__: Temporal objects are immutable, ensuring that each update generates a new instance without modifying the original object.

### Potential Use Cases
- __Clock Display__: Displaying a real-time clock in your application.
- __Time-based Events__: Triggering actions or displaying messages based on the current time.
- __Logging and Monitoring__: Showing timestamps for logs or monitoring data in real-time applications.


### `useTimeZone hook`
<p>The <b>useTimeZone</b> hook provides the current time zone and a function to convert a given date-time to a different time zone using the Temporal API.</p>

#### Features:
- __Current Time Zone:__ Provides the current time zone.
- __Time Zone Conversion:__ Converts a given PlainDateTime to a specified time zone, preserving the instant in time (not just the wall clock time).

### Example Usage

```jsx
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporal, useTimeZone } from 'your-package-name';

const App: React.FC = () => {
    const now = useTemporal();
    const { timeZone, convertToTimeZone } = useTimeZone();

    // Convert to New York time, preserving the instant
    const newYorkDateTime = convertToTimeZone(now, 'America/New_York');

    return (
        <div>
            <div>Current time in your zone: {now.toString()}</div>
            <div>Current time in New York: {newYorkDateTime.toString()}</div>
        </div>
    );
};
```

### Benefits
- __Current Time Zone Information__  The hook provides easy access to the current time zone of the user's environment, allowing your application to adapt to the user's locale without additional configuration.
- __Time Zone Conversion:__ The hook includes a built-in function to convert any given date-time to a specified target time zone, which simplifies handling global time zones in applications. This is particularly useful for applications that display events or schedules across different time zones.
- __Simplifies Complex Logic:__  By abstracting the complexity of time zone handling, this hook makes it easier for developers to implement and maintain code that involves date-time manipulations across different time zones.


### `useDuration hook`
<p>The <b>useDuration</b> hook provides utilities for working with durations using the Temporal API. This hook allows users to create durations, perform operations like adding or subtracting them from date-times, and format durations in a human-readable string.</p>

#### Features:
- __Create Durations:__ Easily create durations from various units (e.g., hours, minutes, days).
- __Add or Subtract Durations:__ Perform addition or subtraction of durations to/from date-times.
- __Format Durations:__ Format durations in a human-readable string..

### Example Usage

```jsx
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporal, useTimeZone, useDuration } from 'react-temporal-hooks';

const App: React.FC = () => {
    const now = useTemporal();
    const { timeZone, convertToTimeZone } = useTimeZone();
    const { createDuration, addDuration, subtractDuration, formatDuration } = useDuration();

    const newYorkDateTime = convertToTimeZone(now, 'America/New_York');

    const duration = createDuration({ hours: 2, minutes: 30 });
    const addedDateTime = addDuration(now, duration);
    const subtractedDateTime = subtractDuration(now, duration);

    return (
        <div>
            <h1>Current Date and Time</h1>
            <p>{now.toString()}</p>
            <h2>Time Zone</h2>
            <p>{timeZone.toString()}</p>
            <h2>New York Time</h2>
            <p>{newYorkDateTime.toString()}</p>
            <h2>Duration</h2>
            <p>{formatDuration(duration)}</p>
            <h2>Added Duration</h2>
            <p>{addedDateTime.toString()}</p>
            <h2>Subtracted Duration</h2>
            <p>{subtractedDateTime.toString()}</p>
        </div>
    );
};

export default App;

```

### Benefits
- __Simplified Duration Management:__  Easily create and manage durations using the Temporal API.
- __Duration Operations:__ Perform addition and subtraction operations with durations, enhancing date-time manipulation capabilities.
- __Improved User Experience:__  Provides precise duration handling, which is essential for applications that involve scheduling, timers, and time calculations.

---

## Compatibility

This library is compatible with @js-temporal/polyfill v0.5.x and above. If you are upgrading from an earlier version, please check the [Temporal polyfill changelog](https://github.com/js-temporal/temporal-polyfill/blob/main/CHANGELOG.md) for breaking changes and migration tips.
