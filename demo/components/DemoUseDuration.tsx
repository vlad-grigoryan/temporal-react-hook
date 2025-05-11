import  { useState, useMemo } from 'react';
import "./DemoCard.css";
import useDuration from "../../src/useDuration";
import useTemporalDateTime from "../../src/useTemporalDateTime";
import { Temporal } from '@js-temporal/polyfill';

export default function DemoUseDuration() {
  // Configuration state
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(30);
  const [seconds, setSeconds] = useState<number>(30);
  
  // Second duration for comparison
  const [comparisonHours, setComparisonHours] = useState<number>(2);
  const [comparisonMinutes, setComparisonMinutes] = useState<number>(15);
  const [comparisonSeconds, setComparisonSeconds] = useState<number>(0);

  const { 
    formatDuration,
    addDuration, 
    subtractDuration, 
    compareDurations,
    getTotalSeconds 
  } = useDuration();
  const now = useTemporalDateTime();

  // Create durations using Temporal directly instead of the hook's createDuration
  // to avoid state updates that cause infinite renders
  const duration = useMemo(() => {
    return Temporal.Duration.from({
      hours,
      minutes,
      seconds,
    });
  }, [hours, minutes, seconds]);
  
  const comparisonDuration = useMemo(() => {
    return Temporal.Duration.from({
      hours: comparisonHours,
      minutes: comparisonMinutes,
      seconds: comparisonSeconds,
    });
  }, [comparisonHours, comparisonMinutes, comparisonSeconds]);
  
  // Calculate derived values using useMemo to ensure they update when dependencies change
  const derivedValues = useMemo(() => {
    const comparisonResult = compareDurations(duration, comparisonDuration);
    const totalSeconds = getTotalSeconds(duration);
    const comparisonTotalSeconds = getTotalSeconds(comparisonDuration);
    const added = addDuration(now, duration);
    const subtracted = subtractDuration(now, duration);
    
    return {
      durationString: formatDuration(duration),
      comparisonDurationString: formatDuration(comparisonDuration),
      addedString: added.toString(),
      subtractedString: subtracted.toString(),
      comparisonResult: comparisonResult < 0 ? 'First duration is less than second' : 
                        comparisonResult > 0 ? 'First duration is greater than second' : 
                        'Durations are equal',
      totalSeconds: totalSeconds.toString(),
      comparisonTotalSeconds: comparisonTotalSeconds.toString()
    };
  }, [duration, comparisonDuration, now, formatDuration, compareDurations, getTotalSeconds, addDuration, subtractDuration]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setHours(isNaN(value) ? 0 : value);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setMinutes(isNaN(value) ? 0 : value);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setSeconds(isNaN(value) ? 0 : value);
  };
  
  const handleComparisonHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setComparisonHours(isNaN(value) ? 0 : value);
  };

  const handleComparisonMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setComparisonMinutes(isNaN(value) ? 0 : value);
  };

  const handleComparisonSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    setComparisonSeconds(isNaN(value) ? 0 : value);
  };

  return (
    <section className="demo-card">
      <h3>useDuration</h3>
      
      {/* Configuration controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Hours:</span>
          <input type="number" value={hours} onChange={handleHoursChange} />
        </div>
        <div className="demo-config-row">
          <span>Minutes:</span>
          <input type="number" value={minutes} onChange={handleMinutesChange} />
        </div>
        <div className="demo-config-row">
          <span>Seconds:</span>
          <input type="number" value={seconds} onChange={handleSecondsChange} />
        </div>
      </div>
      
      {/* Comparison controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Comparison Hours:</span>
          <input type="number" value={comparisonHours} onChange={handleComparisonHoursChange} />
        </div>
        <div className="demo-config-row">
          <span>Comparison Minutes:</span>
          <input type="number" value={comparisonMinutes} onChange={handleComparisonMinutesChange} />
        </div>
        <div className="demo-config-row">
          <span>Comparison Seconds:</span>
          <input type="number" value={comparisonSeconds} onChange={handleComparisonSecondsChange} />
        </div>
      </div>
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Duration:</span>
          <span className="demo-value">{derivedValues.durationString}</span>
        </div>
        <div className="demo-config-row">
          <span>Total Seconds:</span>
          <span className="demo-value">{derivedValues.totalSeconds}</span>
        </div>
        <div className="demo-config-row">
          <span>Now + Duration:</span>
          <span className="demo-value">{derivedValues.addedString}</span>
        </div>
        <div className="demo-config-row">
          <span>Now - Duration:</span>
          <span className="demo-value">{derivedValues.subtractedString}</span>
        </div>
        <div className="demo-config-row">
          <span>Comparison Duration:</span>
          <span className="demo-value">{derivedValues.comparisonDurationString}</span>
        </div>
        <div className="demo-config-row">
          <span>Comparison Total Seconds:</span>
          <span className="demo-value">{derivedValues.comparisonTotalSeconds}</span>
        </div>
        <div className="demo-config-row">
          <span>Comparison Result:</span>
          <span className="demo-value">{derivedValues.comparisonResult}</span>
        </div>
      </div>
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useDuration hook provides utilities for working with durations using the Temporal API. This hook allows users to create durations, perform operations like adding or subtracting them from date-times, and format durations in a human-readable string.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useDuration()<br />
            <strong>Returns:</strong> Object with utility functions:<br />
            &nbsp;&nbsp;• <strong>createDuration(obj)</strong>: Creates a Temporal.Duration<br />
            &nbsp;&nbsp;• <strong>addDuration(date, duration)</strong>: Adds a duration to a date<br />
            &nbsp;&nbsp;• <strong>subtractDuration(date, duration)</strong>: Subtracts a duration from a date<br />
            &nbsp;&nbsp;• <strong>formatDuration(duration)</strong>: Formats a duration as a string<br />
            &nbsp;&nbsp;• <strong>compareDurations(duration1, duration2)</strong>: Compares two durations<br />
            &nbsp;&nbsp;• <strong>getTotalSeconds(duration)</strong>: Returns the total seconds of a duration<br />
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useDuration, useCurrentDateTime } from 'temporal-react-hook';
import { Temporal } from '@js-temporal/polyfill';

const DemoUseDuration = () => {
  const { 
    createDuration, 
    addDuration, 
    subtractDuration, 
    formatDuration,
    compareDurations,
    getTotalSeconds 
  } = useDuration();
  const { dateTime } = useCurrentDateTime();

  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(30);
  const [seconds, setSeconds] = useState<number>(30);
  
  // Second duration for comparison
  const [comparisonHours, setComparisonHours] = useState<number>(2);
  const [comparisonMinutes, setComparisonMinutes] = useState<number>(15);
  const [comparisonSeconds, setComparisonSeconds] = useState<number>(0);

  const duration = createDuration({
    hours,
    minutes,
    seconds,
  });
  
  const comparisonDuration = createDuration({
    hours: comparisonHours,
    minutes: comparisonMinutes,
    seconds: comparisonSeconds,
  });
  
  const comparisonResult = compareDurations(duration, comparisonDuration);
  const totalSeconds = getTotalSeconds(duration);

  // ...
}`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
