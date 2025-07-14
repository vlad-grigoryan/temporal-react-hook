# temporal-react-hook

A modern React library that provides hooks for handling date and time operations using the Temporal API. This library makes it easy to work with dates, times, time zones, durations, and relative times in React applications.

## [Live Demo](https://vlad-grigoryan.github.io/temporal-react-hook/)

## Installation

```bash
npm install temporal-react-hook
```

or

```bash
yarn add temporal-react-hook
```

## Available Hooks

| Hook | Description |
|------|-------------|
| `useTemporalDateTime` | Get and manage current date and time with configurable updates |
| `useTimeZone` | Work with time zones and convert between them |
| `useDuration` | Create and manipulate time durations, with comparison and formatting |
| `useRelativeTime` | Format dates as human-readable relative times with localization |
| `useLocaleDateTime` | Format dates according to locale-specific conventions |
| `useTimeAgo` | Display how long ago a date occurred |
| `useIsSame` | Compare if two dates are the same (day, month, year, etc.) |
| `useIsBetween` | Check if a date falls within a specified date range (e.g., `useIsBetween({ date, startDate, endDate })`) |
| `useDifference` | Calculate the numerical difference between two dates in a specified unit |
| `useIsToday` | Check if a date is today |
| `useIsThisWeek` | Check if a date is in the current week |
| `useIsThisMonth` | Check if a date is in the current month |
| `useIsThisYear` | Check if a date is in the current year |
| `useTemporalAdd` | Add time units to a date |
| `useTemporalSubtract` | Subtract time units from a date |
| `useTemporalFormat` | Format dates with custom patterns |
| `useTemporalStartOf` | Get the start of a time unit (day, week, month, etc.) |
| `useTemporalEndOf` | Get the end of a time unit (day, week, month, etc.) |
| `useTimeZoneOffset` | Get the current UTC offset for a time zone, auto-updates on DST |
| `useDateTimeRange` | Manage a date-time range with ordering, clamping, and helper functions |

## Running the Demo Locally

```bash
# Clone the repository
git clone https://github.com/vlad-grigoryan/temporal-react-hook.git
cd temporal-react-hook

# Install dependencies
npm install

# Start the demo
cd demo
npm install
npm start
```

The demo will be available at http://localhost:5173/temporal-react-hook/

## Why Temporal API?

The Temporal API is a modern JavaScript date/time API that addresses many of the shortcomings of the built-in `Date` object:

- Immutable date/time objects
- First-class time zone support
- Calendar-aware date manipulation
- Explicit handling of time zones and calendars
- Clear distinction between wall-clock time and exact time

## License

MIT
