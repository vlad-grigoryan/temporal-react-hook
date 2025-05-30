# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
