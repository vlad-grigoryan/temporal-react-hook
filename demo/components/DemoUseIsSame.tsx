import { useState, useMemo } from 'react';
import useIsSame, { IsSameUnit } from '../../src/useIsSame';

import useTemporalDateTime from "../../src/useTemporalDateTime.ts";
import useTimeZone from "../../src/useTimeZone";

export default function DemoUseIsSame() {
  const currentDateTime = useTemporalDateTime();

  const [dateA, setDateA] = useState(currentDateTime);
  const [dateB, setDateB] = useState(() => currentDateTime.add({ days: 1 }));
  const [unit, setUnit] = useState<IsSameUnit>('day');
  const { timeZone: systemTimeZone } = useTimeZone();
  const [selectedTimeZone, setSelectedTimeZone] = useState(systemTimeZone);

  const availableTimeZones = useMemo(() => (Intl as any).supportedValuesOf('timeZone'), []);

  const isSame = useIsSame(dateA, dateB, unit, selectedTimeZone);

  const units: IsSameUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  return (
    <section className="demo-card">
      <h3>useIsSame</h3>

      {/* Configuration panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Date A:</span>

          <input
            type="datetime-local"
            value={dateA.toString().slice(0, 16)}
            onChange={e => setDateA(useTemporalDateTime(e.target.value))}
            className="demo-input-compact demo-input-margin"
          />
        </div>

        <div className="demo-config-row">
          <span>Date B:</span>

          <input
            type="datetime-local"
            value={dateB.toString().slice(0, 16)}
            onChange={e => setDateB(useTemporalDateTime(e.target.value))}
            className="demo-input-compact demo-input-margin"
          />
        </div>

        <div className="demo-config-row">
          <span>Unit:</span>
          <select value={unit} onChange={e => setUnit(e.target.value as IsSameUnit)} className="demo-input-compact demo-input-margin">
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="demo-config-row">
          <span>Time Zone:</span>
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            className="demo-input-compact demo-input-margin"
          >
            {availableTimeZones.map((tz: string) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div className="demo-config-row">
          <span>Effective Time Zone:</span>
          <span className="demo-value">{selectedTimeZone}</span>
        </div>
      </div>

      {/* Results display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Are they the same?:</span>
          <span className="demo-value">{isSame ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Checks if two Temporal date/time objects are the same for a given unit (like moment(date1).isSame(date2, unit)). Supports: year, month, week (ISO), day, hour, minute, second. Comparisons are performed in the specified time zone. If no time zone is provided, the system's current time zone is used.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsSame(dateA, dateB, unit, timeZone?)<br/>
            <strong>Parameters:</strong><br/>
            - dateA: First Temporal object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - dateB: Second Temporal object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - unit: The unit to compare by ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')<br/>
            - timeZone: Optional. The time zone to use for comparison (e.g., 'America/New_York'). Defaults to system's current time zone.<br/>
            <strong>Returns:</strong> Boolean indicating whether the two dates are the same in the specified unit<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useIsSame, useTemporalDateTime } from '@vladgrigoryan/temporal-react-hook';

const now = useTemporalDateTime();
const tomorrow = now.add({ days: 1 });
const nextMonth = now.add({ months: 1 });

const isSameDay = useIsSame(now, tomorrow, 'day'); // false
const isSameMonth = useIsSame(now, nextMonth, 'month'); // false
const isSameYear = useIsSame(now, nextMonth, 'year'); // true

// Example with different Temporal types and explicit time zone
const instantA = Temporal.Now.instant();
const zonedDateTimeB = Temporal.Now.zonedDateTimeISO('America/New_York');
const isSameSecondUTC = useIsSame(instantA, zonedDateTimeB, 'second', 'UTC'); // Compare in UTC
`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
