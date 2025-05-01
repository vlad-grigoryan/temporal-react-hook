import { useState } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import useIsSame, { IsSameUnit } from '../../src/useIsSame';

export default function DemoUseIsSame() {
  const [dateA, setDateA] = useState(() => Temporal.Now.plainDateTimeISO());
  const [dateB, setDateB] = useState(() => Temporal.Now.plainDateTimeISO().add({ days: 1 }));
  const [unit, setUnit] = useState<IsSameUnit>('day');

  const isSame = useIsSame(dateA, dateB, unit);

  return (
    <section className="demo-card">
      <h3>Demo: useIsSame</h3>
      <div className="demo-row">
        <label>
          Date A:
          <input
            type="datetime-local"
            value={dateA.toString().slice(0, 16)}
            onChange={e => setDateA(Temporal.PlainDateTime.from(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div className="demo-row">
        <label>
          Date B:
          <input
            type="datetime-local"
            value={dateB.toString().slice(0, 16)}
            onChange={e => setDateB(Temporal.PlainDateTime.from(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div className="demo-row">
        <label>
          Unit:
          <select value={unit} onChange={e => setUnit(e.target.value as IsSameUnit)} style={{ marginLeft: 8 }}>
            <option value="year">year</option>
            <option value="month">month</option>
            <option value="week">week</option>
            <option value="day">day</option>
            <option value="hour">hour</option>
            <option value="minute">minute</option>
            <option value="second">second</option>
          </select>
        </label>
      </div>
      <div className="demo-row">
        <strong>Result:</strong> {isSame ? 'Yes' : 'No'}
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useIsSame compares two Temporal dates or times by a chosen unit (year, month, week, day, hour, minute, second).</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const isSame = useIsSame(dateA, dateB, 'day');</span>
        </div>
      </div>
    </section>
  );
}
