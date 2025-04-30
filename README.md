<div>
    <h1>temporal-react-hook</h1>
    <h6>react-temporal-hooks is a React library that provides hooks for handling date and time operations using the Temporal API.</h6> 
</div>

## 🖥️ [Live Demo](https://vlad-grigoryan.github.io/temporal-react-hook/)

## Available hooks: 
#### [useCurrentDateTime](#usecurrentdatetime-hook)
#### [useTimeZone](#usetimezone-hook)
#### [useDuration](#useduration-hook)
#### [useRelativeTime](#userelativetime-hook)
#### [useLocaleDateTime](#uselocaledatetime-hook)
#### [useTimeAgo](#usetimeago-hook)
#### [useIsToday](#useistoday-hook)
#### [useIsThisWeek](#useisthisweek-hook)
#### [useIsThisMonth](#useisthismonth-hook)
#### [useIsThisYear](#useisthisyear-hook)
#### [useTemporalAdd](#usetemporaladd-hook)
#### [useTemporalSubtract](#usetemporalsubtract-hook)
#### [useTemporalFormat](#usetemporalformat-hook)
#### [useTemporalStartOf](#usetemporalstartof-hook)
#### [useTemporalEndOf](#usetemporalendof-hook)


### Description for Hooks

### `useCurrentDateTime hook`
<p>The <b>useCurrentDateTime</b> hook provides the current date and time using the Temporal API. It automatically updates the date and time every second, ensuring that the component using this hook always displays the most recent time.</p>

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
import { useCurrentDateTime } from 'your-package-name';

const App: React.FC = () => {
  const now = useCurrentDateTime();

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
import { useCurrentDateTime, useTimeZone } from 'your-package-name';

const App: React.FC = () => {
    const now = useCurrentDateTime();
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
import { useCurrentDateTime, useTimeZone, useDuration } from 'react-temporal-hooks';

const App: React.FC = () => {
    const now = useCurrentDateTime();
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

### `useRelativeTime hook`
The `useRelativeTime` hook returns a human-friendly string representing how much time has passed since (or until) a given date/time.

This hook is great for chat apps, notifications, activity feeds, or anywhere you want to show time in a user-friendly way!

**Example Usage:**
```tsx
import { useRelativeTime } from 'your-package-name';

const messageTime = Temporal.Now.plainDateTimeISO().subtract({ minutes: 3 });
const relative = useRelativeTime(messageTime);
// Output: "3 minutes ago"
```

### `useLocaleDateTime hook`
<p>The <b>useLocaleDateTime</b> hook formats a Temporal date/time object as a localized string using the browser's locale (or a provided locale) and Intl.DateTimeFormat options. It supports <code>Temporal.PlainDateTime</code>, <code>Temporal.ZonedDateTime</code>, and <code>Temporal.Instant</code>.</p>

#### Features:
- __Locale-aware formatting:__ Uses Intl.DateTimeFormat for robust, localized output.
- __Flexible input:__ Accepts all major Temporal types.
- __Customizable:__ Pass your own locale and formatting options.

#### Example Usage:

```tsx
import { useLocaleDateTime } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const dateTime = Temporal.Now.plainDateTimeISO();
const formatted = useLocaleDateTime(dateTime, 'fr-FR', { dateStyle: 'full', timeStyle: 'short' });
// formatted: "mercredi 23 avril 2025 à 19:48"
```

#### Use Cases:
- **Internationalized UIs:** Display dates and times in the user’s preferred language and format.
- **Dashboards:** Show real-time or historical timestamps in a locale-appropriate way.
- **Event Schedulers:** Present event times in the user’s local format for clarity.
- **Reports and Exports:** Format Temporal values for PDF/CSV/Excel output in any locale.
- **Accessibility:** Improve accessibility by respecting user locale and formatting conventions.

### `useTimeAgo hook`
<p>The <b>useTimeAgo</b> hook returns a live-updating, human-friendly string representing how long ago a Temporal date/time occurred (e.g., "just now", "5 minutes ago", "2 days ago"). It supports <code>Temporal.PlainDateTime</code>, <code>Temporal.ZonedDateTime</code>, and <code>Temporal.Instant</code>.</p>

#### Features:
- __Live updating:__ The string updates automatically as time passes.
- __Flexible input:__ Accepts all major Temporal types.
- __Customizable interval:__ Choose how often the string updates.

#### Example Usage:

```tsx
import { useTimeAgo } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const dateTime = Temporal.Now.plainDateTimeISO().subtract({ hours: 2 });
const timeAgo = useTimeAgo(dateTime);
// timeAgo: "2 hours ago"
```

#### Use Cases:
- **Activity feeds:** Show when posts, comments, or messages were created ("5 minutes ago").
- **Notifications:** Display how recently something happened ("just now", "yesterday").
- **Audit logs:** Human-readable timestamps for events.
- **Real-time dashboards:** Auto-updating event recency.
- **Chat apps:** Indicate when a message was sent.

---

## 🆕 New Date Range Hooks

### `useIsToday(date: Temporal.PlainDateTime): boolean`
Returns `true` if the provided date is today.

### `useIsThisWeek(date: Temporal.PlainDateTime): boolean`
Returns `true` if the provided date is within the current week (ISO week).

### `useIsThisMonth(date: Temporal.PlainDateTime): boolean`
Returns `true` if the provided date is within the current month.

### `useIsThisYear(date: Temporal.PlainDateTime): boolean`
Returns `true` if the provided date is within the current year.

#### Example Usage
```jsx
import { useIsToday, useIsThisWeek, useIsThisMonth, useIsThisYear } from 'your-package-name';
import { Temporal } from '@js-temporal/polyfill';

const date = Temporal.Now.plainDateTimeISO();

const isToday = useIsToday(date);
const isThisWeek = useIsThisWeek(date);
const isThisMonth = useIsThisMonth(date);
const isThisYear = useIsThisYear(date);

return (
  <div>
    <div>Is Today? {String(isToday)}</div>
    <div>Is This Week? {String(isThisWeek)}</div>
    <div>Is This Month? {String(isThisMonth)}</div>
    <div>Is This Year? {String(isThisYear)}</div>
  </div>
);
```

#### Use Cases:
- Highlighting events or items that are today/this week/this month/this year
- Filtering data by date ranges
- Smart date grouping in UIs

---

## `useTemporalAdd` Hook

Adds a specified amount of seconds, minutes, hours, days, weeks, months, or years to a `Temporal.PlainDateTime`.

**Signature:**
```ts
const add = useTemporalAdd();
const result = add(date, { days: 1, hours: 2 });
```

**Parameters:**
- `date`: `Temporal.PlainDateTime` — The base date/time.
- `amount`: `Partial<Temporal.DurationLike>` — Object with any combination of `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years`.

**Returns:**
- `Temporal.PlainDateTime` — The new date/time after addition.

**Example:**
```tsx
import { useTemporalAdd } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const add = useTemporalAdd();
const base = Temporal.PlainDateTime.from('2025-04-27T12:00');
const next = add(base, { days: 2, hours: 3 });
// next.toString() === '2025-04-29T15:00:00'
```

---

## `useTemporalSubtract` Hook

Subtracts a specified amount of seconds, minutes, hours, days, weeks, months, or years from a `Temporal.PlainDateTime`.

**Signature:**
```ts
const subtract = useTemporalSubtract();
const result = subtract(date, { months: 1 });
```

**Parameters:**
- `date`: `Temporal.PlainDateTime` — The base date/time.
- `amount`: `Partial<Temporal.DurationLike>` — Object with any combination of `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years`.

**Returns:**
- `Temporal.PlainDateTime` — The new date/time after subtraction.

**Example:**
```tsx
import { useTemporalSubtract } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const subtract = useTemporalSubtract();
const base = Temporal.PlainDateTime.from('2025-04-27T12:00');
const prev = subtract(base, { months: 1, days: 5 });
// prev.toString() === '2025-03-22T12:00:00'
```

---

## `useTemporalFormat` Hook

Formats Temporal objects (`PlainDate`, `PlainDateTime`, `ZonedDateTime`, `Instant`) into a localized string using Intl.DateTimeFormat options or a preset.

**Signature:**
```ts
const formatted = useTemporalFormat(date, options?, locale?)
```

**Parameters:**
- `date`: Temporal object to format (required)
- `options`: Intl.DateTimeFormat options or preset string (`'short'`, `'medium'`, `'long'`, `'full'`)
- `locale`: Optional locale string (default: system locale)

**Returns:**
- `string` — The formatted date/time string

**Example Usage:**
```tsx
import { useTemporalFormat } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const date = Temporal.Now.plainDateTimeISO();
const formatted = useTemporalFormat(date, 'long', 'fr-FR');
// e.g., '28 avril 2025 à 00:36:00'
```

**Presets:**
- `'short'`: Short date and time
- `'medium'`: Medium date and time
- `'long'`: Long date and time
- `'full'`: Full date and time

**Use Cases:**
- Displaying dates/times in user-friendly formats
- Supporting multiple locales in your UI
- Showing event times, logs, or timestamps in various styles

---

## `useTemporalStartOf` Hook

Returns the start of a specified unit (`second`, `minute`, `hour`, `day`, `week`, `month`, `year`) for a Temporal.PlainDateTime.

**Signature:**
```ts
const startOf = useTemporalStartOf();
const result = startOf(date, 'week');
```

**Parameters:**
- `date`: `Temporal.PlainDateTime` — The base date/time.
- `unit`: `'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'` — The unit to get the start of.

**Returns:**
- `Temporal.PlainDateTime` — The start of the specified unit.

**Example Usage:**
```tsx
import { useTemporalStartOf } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const startOf = useTemporalStartOf();
const now = Temporal.Now.plainDateTimeISO();
const weekStart = startOf(now, 'week');
// weekStart is the start of the current ISO week
```

---

## `useTemporalEndOf` Hook

Returns the end of a specified unit (`second`, `minute`, `hour`, `day`, `week`, `month`, `year`) for a Temporal.PlainDateTime.

**Signature:**
```ts
const endOf = useTemporalEndOf();
const result = endOf(date, 'month');
```

**Parameters:**
- `date`: `Temporal.PlainDateTime` — The base date/time.
- `unit`: `'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'` — The unit to get the end of.

**Returns:**
- `Temporal.PlainDateTime` — The end of the specified unit.

**Example Usage:**
```tsx
import { useTemporalEndOf } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const endOf = useTemporalEndOf();
const now = Temporal.Now.plainDateTimeISO();
const monthEnd = endOf(now, 'month');
// monthEnd is the last moment of the current month
```

**Use Cases:**
- Calendar and scheduling UIs (highlighting current week/month)
- Time-based filtering (e.g., show all events in the current week)
- Generating date/time ranges for reports or charts

---
