# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.2] - 2025-07-21

### Added
- `useParseISO` hook to parse ISO-8601 date-time strings into `Temporal.PlainDateTime`.
- `DemoUseParseISO` component to demonstrate the hook.

## [2.1.0] - 2025-07-17

### Added
- `useGetDaysInYear` hook to determine the number of days in the year for a given date (365 or 366).
- `DemoUseGetDaysInYear` component to showcase the new hook.

## [2.0.0] - 2025-07-14

### Added
- `useDifference` hook to calculate the numerical difference between two dates in a specified unit.
- `DemoUseDifference` component to showcase the new hook.

## [1.8.0] - 2025-07-11

### Added
- `useIsBetween` hook to check if a date falls within a specified date range.
- `DemoUseIsBetween` component to demonstrate the new hook's functionality with configurable options.


## [1.7.1] - 2025-06-17

### Added
- `useTimeZoneOffset` hook for retrieving the current UTC offset of any IANA time-zone with automatic updates on DST transitions.
- `DemoUseTimeZoneOffset` component demonstrating the hook with common and custom zones, string/minutes output, and info card documentation.

## [1.7.0] - 2025-06-16

### Added
- `useDateTimeRange` hook and `DemoUseDateTimeRange` component::
  - Manages a range of `Temporal.PlainDateTime` values with guaranteed `start <= end` ordering.
  - Options to clamp the end date to the current time (`clampToNow`).
  - Option to specify `smallestUnit` ('day', 'hour', 'minute', 'second') for `length` calculation and `toArray` enumeration.
  - Provides `setStart`, `setEnd` setters.
  - Includes `shiftBy(duration)` method to move the entire range.
  - Exposes `length` (number of `smallestUnit`s in range, inclusive).
  - Exposes `contains(dateTime)` method to check if a `Temporal.PlainDateTime` is within the range.
  - Exposes `toArray()` method to enumerate all `Temporal.PlainDateTime` instances in the range by the `smallestUnit`.

## [1.6.15] - 2025-06-11

### Added
- Quarter unit support in `useTemporalStartOf` and `useTemporalEndOf` hooks.
- Updated `DemoUseTemporalStartEndOf` component to include **quarter** unit button.

## [1.6.14] - 2025-06-10

### Added
- Enhanced error handling in `useTemporalSubtract` hook
  - Comprehensive validation for date and duration inputs
  - Clear error messages with examples and valid options
  - Type checking for duration values

### Changed
- Updated `DemoUseTemporalSubtract` component
  - Added inputs for all duration units (years, months, days, hours, minutes, seconds)
  - Improved documentation with examples of combining multiple duration units
  - Enhanced UI layout and styling for better user experience


## [1.6.13] - 2025-06-09

### Added
- Enhanced error handling in `useTemporalAdd` hook
  - Comprehensive validation for date and duration inputs
  - Clear error messages with examples and valid options
  - Type checking for duration values

### Changed
- Updated `DemoUseTemporalAdd` component
  - Added inputs for all duration units (years, months, days, hours, minutes, seconds)
  - Improved documentation with examples of combining multiple duration units
  - Enhanced UI layout and styling for better user experience


## [1.6.12] - 2025-06-04

### Added
- Dynamic formatting support in `useTemporalFormat` hook
  - Format dates based on temporal distance (recent, today, this week, etc.)
  - Configurable thresholds and format options for each time range
  - Maintains backward compatibility with existing preset formats

### Fixed
- Fixed date conversion issues between Temporal and JavaScript Date objects
- Improved handling of PlainDate objects in useTemporalFormat

### Changed
- Removed direct Temporal API usage from demo components
- Updated documentation with dynamic formatting examples

## [1.6.11] - 2025-06-03
### Added
- `useIsSame` hook now accepts an optional `timeZone` parameter for time zone-aware comparisons.
- `DemoUseIsSame` component updated to include a time zone selector in the UI.
- `DemoUseIsThisWeek` component updated for UI consistency (removed date buttons, added datetime-local input) and integrated time zone selector.
### Changed
- Removed direct `@js-temporal/polyfill` imports from `DemoUseIsSame` and `DemoUseIsThisWeek` demo components for cleaner code.
- `DemoUseTemporalFormat` component updated for UI consistency (layout classes, locale dropdown) and improved user experience.

## [1.6.9] - 2025-05-27
### Added
- `useIsToday` hook now accepts an optional `timeZone` parameter for time zone-aware checks.
- `DemoUseIsToday` component updated to include a time zone selector in the UI.

### Changed
- `DemoUseIsToday` documentation updated to reflect `timeZone` parameter.
## [1.6.10] - 2025-05-30

### Added
- `DemoUseIsThisWeek` component updated to showcase the `useIsThisWeek` hook with time zone support.
- `DemoUseIsThisMonth` component added to showcase the `useIsThisMonth` hook with time zone support.
- `DemoUseIsThisYear` component added to showcase the `useIsThisYear` hook with time zone support.

### Changed
- `useIsThisWeek` hook updated to accept `Temporal` objects and an optional `timeZone` parameter for time zone-aware checks.
- `useIsThisMonth` hook updated to accept `Temporal` objects and an optional `timeZone` parameter for time zone-aware checks.
- `useIsThisYear` hook updated to accept `Temporal` objects and an optional `timeZone` parameter for time zone-aware checks.
