import { Temporal } from '@js-temporal/polyfill';
import React, { useState } from 'react';
import useDifference from '../../src/useDifference';
import useTemporalDateTime from '../../src/useTemporalDateTime';
import './DemoCard.css';

const DemoUseDifference: React.FC = () => {
  const currentDateTime = useTemporalDateTime();
  const [dateLeft, setDateLeft] = useState(currentDateTime);
  const [dateRight, setDateRight] = useState(() => currentDateTime.subtract({ days: 10 }));
  const [unit, setUnit] = useState<"year" | "month" | "week" | "day" | "hour" | "minute" | "second">('day');

  const difference = useDifference({
    dateLeft: dateLeft.toZonedDateTime(Temporal.Now.timeZoneId()),
    dateRight: dateRight.toZonedDateTime(Temporal.Now.timeZoneId()),
    unit,
  });

  const units: ("year" | "month" | "week" | "day" | "hour" | "minute" | "second")[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  return (
    <section className="demo-card">
      <h3>useDifference</h3>

      {/* Configuration panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Date Left:</span>
          <input
            type="datetime-local"
            value={dateLeft.toString().slice(0, 16)}
            onChange={e => setDateLeft(useTemporalDateTime(e.target.value))}
            className="demo-input-compact demo-input-margin"
          />
        </div>

        <div className="demo-config-row">
          <span>Date Right:</span>
          <input
            type="datetime-local"
            value={dateRight.toString().slice(0, 16)}
            onChange={e => setDateRight(useTemporalDateTime(e.target.value))}
            className="demo-input-compact demo-input-margin"
          />
        </div>

        <div className="demo-config-row">
          <span>Unit:</span>
          <select value={unit} onChange={e => setUnit(e.target.value as typeof unit)} className="demo-input-compact demo-input-margin">
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Difference:</span>
          <span className="demo-value">{difference} {unit}(s)</span>
        </div>
      </div>

      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Calculates the numerical difference between two dates in a specified unit.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useDifference(&#123; dateLeft, dateRight, unit &#125;)<br/>
            <strong>Parameters:</strong><br/>
            - dateLeft: The first date (string or Temporal object)<br/>
            - dateRight: The second date (string or Temporal object)<br/>
            - unit: The unit for the difference ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')<br/>
            <strong>Returns:</strong> A number representing the difference in the specified unit.<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`const differenceInDays = useDifference({
  dateLeft: '2024-01-01',
  dateRight: '2024-01-11',
  unit: 'day',
}); // returns: -10`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
};

export default DemoUseDifference;
