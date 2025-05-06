<div>
    <h1>temporal-react-hook</h1>
    <h6>react-temporal-hooks is a React library that provides hooks for handling date and time operations using the Temporal API.</h6> 
</div>

## 🖥️ [Live Demo](https://vlad-grigoryan.github.io/temporal-react-hook/)

## Available hooks: 
#### [useTemporalDateTime](#usetemporaldatetime-hook)
#### [useTimeZone](#usetimezone-hook)
#### [useDuration](#useduration-hook)
#### [useRelativeTime](#userelativetime-hook)
#### [useLocaleDateTime](#uselocaledatetime-hook)
#### [useTimeAgo](#usetimeago-hook)
#### [useIsSame](#useissame-hook)
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

```bash
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useCurrentDateTime } from 'temporal-react-hook';

const App = () => {
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

```bash
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporalDateTime, useTimeZone } from 'temporal-react-hook';

const App = () => {
    const now = useTemporalDateTime();
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

```bash
npm install temporal-react-hook
```

```jsx
import React from 'react';
import { useTemporalDateTime, useTimeZone, useDuration } from 'temporal-react-hook';

const App = () => {
    const now = useTemporalDateTime();
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
import { useRelativeTime, useTemporalDateTime } from 'temporal-react-hook';

// Using current time minus 3 minutes
const now = useTemporalDateTime();
const messageTime = now.subtract({ minutes: 3 });
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
import { useLocaleDateTime, useTemporalDateTime } from 'temporal-react-hook';

// Get current date with locale formatting 
const now = useTemporalDateTime();
const formattedDate = useLocaleDateTime(now, 'en-US');
// Output: "5/2/2025, 8:59 AM" (based on user's locale)
```

#### Use Cases:
- **Internationalized UIs:** Display dates and times in the user’s preferred language and format.
- **Dashboards:** Show real-time or historical timestamps in a locale-appropriate way.
- **Event Schedulers:** Present event times in the user’s local format for clarity.
- **Reports and Exports:** Format Temporal values for PDF/CSV/Excel output in any locale.
- **Accessibility:** Improve accessibility by respecting user locale and formatting conventions.

### `useTimeAgo hook`
<p>The <b>useTimeAgo</b> hook returns a live-updating, human-friendly string representing how long ago a Temporal date/time occurred (e.g., "just now", "5 minutes ago", "2 days ago"). For dates older than 7 days or future dates, it returns a plain ISO date (YYYY-MM-DD). It supports <code>Temporal.PlainDateTime</code>, <code>Temporal.ZonedDateTime</code>, and <code>Temporal.Instant</code>.</p>

#### Features:
- __Live updating:__ The string updates automatically as time passes.
- __Flexible input:__ Accepts all major Temporal types.
- __Customizable interval:__ Choose how often the string updates.
- __Smart fallback:__ Returns ISO dates for future dates or dates older than 7 days.

#### Example Usage:

```tsx
import { useTimeAgo, useTemporalDateTime } from 'temporal-react-hook';

// Get time ago for current time minus 2 days
const now = useTemporalDateTime();
const twoDaysAgo = now.subtract({ days: 2 });
const timeAgo = useTimeAgo(twoDaysAgo);
// Output: "2 days ago"

// Future or old dates fall back to ISO format
const future = now.add({ days: 1 });
const futureAgo = useTimeAgo(future);
// Output: "2025-05-07"

const old = now.subtract({ days: 10 });
const oldAgo = useTimeAgo(old);
// Output: "2025-04-26"
```

#### Use Cases:
- **Activity feeds:** Show when posts, comments, or messages were created ("5 minutes ago").
- **Notifications:** Display how recently something happened ("just now", "yesterday").
- **Audit logs:** Human-readable timestamps for events.
- **Real-time dashboards:** Auto-updating event recency.
- **Chat apps:** Indicate when a message was sent.

---

### `useIsSame hook`
<p>The <b>useIsSame</b> hook compares two Temporal dates or times to determine if they are the same at the specified unit (year, month, week, day, hour, minute, second).</p>

#### Features:
- __Flexible Comparison:__ Compare dates at various granularity levels (year, month, day, etc.)
- __Type Safety:__ Works with Temporal.PlainDateTime objects for safe comparison
- __Easy to Use:__ Simple API with clear semantics

#### Example Usage:
```tsx
import { useIsSame } from 'temporal-react-hook';

const dateA = Temporal.PlainDateTime.from('2025-05-01T12:00');
const dateB = Temporal.PlainDateTime.from('2025-05-01T14:30');

const isSameDay = useIsSame(dateA, dateB, 'day'); // true
const isSameHour = useIsSame(dateA, dateB, 'hour'); // false
```

#### Use Cases:
- **Event scheduling:** Determine if events occur on the same day
- **Date filtering:** Group data by matching time periods
- **UI highlights:** Visually indicate when dates are in the same time unit
- **Calendar apps:** Show items that occur in the same time frame

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
import { useIsToday, useTemporalDateTime } from 'temporal-react-hook';

// Check if a date is today
const now = useTemporalDateTime();
const yesterday = now.subtract({ days: 1 });
const isToday = useIsToday(now); // true
const isYesterdayToday = useIsToday(yesterday); // false
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
import { useTemporalFormat, useTemporalDateTime } from 'temporal-react-hook';

// Format a date in different ways
const now = useTemporalDateTime();
const formatted = useTemporalFormat(now, 'yyyy-MM-dd');
// Output: "2025-04-23"

const customFormat = useTemporalFormat(now, 'EEEE, MMMM d, yyyy');
// Output: "Wednesday, April 23, 2025"
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
import { useTemporalStartOf, useTemporalDateTime } from 'temporal-react-hook';

const startOf = useTemporalStartOf();
const now = useTemporalDateTime();
const startOfDay = startOf(now, 'day');
const startOfMonth = startOf(now, 'month');
const startOfYear = startOf(now, 'year');

// startOfDay: 2023-11-09T00:00:00
// startOfMonth: 2023-11-01T00:00:00
// startOfYear: 2023-01-01T00:00:00
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
import { useTemporalEndOf, useTemporalDateTime } from 'temporal-react-hook';

// Get end of various time units
const now = useTemporalDateTime();
const endOfDay = useTemporalEndOf(now, 'day');
const endOfMonth = useTemporalEndOf(now, 'month');
const endOfYear = useTemporalEndOf(now, 'year');

// endOfDay: 2023-11-09T23:59:59.999999999
// endOfMonth: 2023-11-30T23:59:59.999999999
// endOfYear: 2023-12-31T23:59:59.999999999
```

**Use Cases:**
- Calendar and scheduling UIs (highlighting current week/month)
- Time-based filtering (e.g., show all events in the current week)
- Generating date/time ranges for reports or charts

---
