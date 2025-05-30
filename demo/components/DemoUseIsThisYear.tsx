import { useState } from "react";
import useIsThisYear from "../../src/useIsThisYear";
import useTemporalDateTime from "../../src/useTemporalDateTime.ts";

export default function DemoUseIsThisYear() {
  const now = useTemporalDateTime();
  const today = now.toPlainDate();
  const [date, setDate] = useState(today);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('UTC'); // Default to UTC

  // Convert PlainDate to PlainDateTime at midnight for compatibility
  const dateTime = date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const isThisYear = useIsThisYear(dateTime, selectedTimeZone);
  const dates = [
    today,
    today.subtract({ years: 1 }),
    today.subtract({ years: 2 }),
    today.add({ years: 1 }),
    today.add({ years: 2 })
  ];

  const availableTimeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Honolulu',
    'America/Los_Angeles',
    'Europe/Paris'
  ];

  return (
    <section className="demo-card">
      <h3>useIsThisYear</h3>
      
      {/* Configuration panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Date:</span>
          <div className="demo-button-group">
            {dates.map((d, i) => (
              <button
                key={i}
                className={`demo-select-btn${d.equals(date) ? " active" : ""}`}
                onClick={() => setDate(d)}
              >
                {d.toString()}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-config-row">
          <span>Time Zone:</span>
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
          >
            {availableTimeZones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Is This Year?:</span>
          <span className="demo-value">{isThisYear ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Returns true if the provided date is within the current year.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsThisYear(dateTime, timeZone?)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - timeZone?: Optional string representing the time zone to check against (e.g., 'America/New_York'). Defaults to system time zone.<br/>
            <strong>Returns:</strong> A boolean indicating whether the provided date is within the current year<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useIsThisYear, useTemporalDateTime } from 'temporal-react-hook';

// Get the current date/time
const now = useTemporalDateTime();
// Create a date/time to check
const dateTime = now; // or any other Temporal date/time
const isThisYear = useIsThisYear(dateTime, 'America/New_York');
// Returns true if dateTime is in the current year in America/New_York, false otherwise`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
