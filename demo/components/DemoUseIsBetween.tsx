import { Temporal } from '@js-temporal/polyfill';
import  { useState } from 'react';
import useIsBetween from '../../src/useIsBetween';

const DemoUseIsBetween: React.FC = () => {
  const today = Temporal.Now.zonedDateTimeISO().toPlainDate();
  const [date, setDate] = useState(today.toString());
  const [startDate, setStartDate] = useState(today.subtract({ days: 7 }).toString());
  const [endDate, setEndDate] = useState(today.add({ days: 7 }).toString());
  const [inclusivity, setInclusivity] = useState<'()' | '[]' | '[)' | '(]'>('()');

  const timeZone = Temporal.Now.timeZoneId();
  const isBetween = useIsBetween({ date: `${date}T00:00:00[${timeZone}]`, startDate: `${startDate}T00:00:00[${timeZone}]`, endDate: `${endDate}T00:00:00[${timeZone}]`, inclusivity });

  return (
    <section className="demo-card">
      <h3>useIsBetween</h3>

      <div className="demo-config-panel">
        <div className="demo-config-row">
          <label>Date to Check:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="demo-input" />
        </div>
        <div className="demo-config-row">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="demo-input" />
        </div>
        <div className="demo-config-row">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="demo-input" />
        </div>
        <div className="demo-config-row">
          <label>Inclusivity:</label>
          <select value={inclusivity} onChange={(e) => setInclusivity(e.target.value as any)} className="demo-select">
            <option value="()">() - Exclusive</option>
            <option value="[]">[] - Inclusive</option>
            <option value="[)">[) - Inclusive Start</option>
            <option value="(]">(] - Exclusive Start</option>
          </select>
        </div>
      </div>

      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Is Between?:</span>
          <span className="demo-value">{isBetween ? 'Yes' : 'No'}</span>
        </div>
      </div>

      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Checks if a date falls within a specified date range.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsBetween({'{'}date, startDate, endDate, inclusivity{'}'})<br/>
            <strong>Parameters:</strong><br/>
            - An object with `date`, `startDate`, `endDate`, and optional `inclusivity` properties.<br/>
            <strong>Returns:</strong> A boolean indicating if the date is between the range.<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`const isBetween = useIsBetween({\n  date: '${date}T00:00[${timeZone}]',\n  startDate: '${startDate}T00:00[${timeZone}]',\n  endDate: '${endDate}T00:00[${timeZone}]',\n  inclusivity: '${inclusivity}'\n});\n// returns ${isBetween}`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
};

export default DemoUseIsBetween;
