import { useState } from 'react';
import useIsSame, { IsSameUnit } from '../../src/useIsSame';
import useCurrentDateTime from '../../src/useCurrentDateTime';
import { Temporal } from '@js-temporal/polyfill';

export default function DemoUseIsSame() {
  const currentDateTime = useCurrentDateTime();
  const [dateA, setDateA] = useState(currentDateTime);
  const [dateB, setDateB] = useState(() => currentDateTime.add({ days: 1 }));
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
          <span>Compares two Temporal dates or times to determine if they are the same at the specified unit (year, month, week, day, hour, minute, second).</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsSame(dateA, dateB, unit)<br/>
            <strong>Parameters:</strong><br/>
            - dateA: First Temporal date/time object to compare<br/>
            - dateB: Second Temporal date/time object to compare<br/>
            - unit: Unit for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')<br/>
            <strong>Returns:</strong> Boolean indicating whether the two dates are the same in the specified unit<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useIsSame, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const now = useCurrentDateTime();<br/>
              const tomorrow = now.add(&#123; days: 1 &#125;);<br/>
              <br/>
              const isSameDay = useIsSame(now, tomorrow, 'day'); // false<br/>
              const isSameMonth = useIsSame(now, tomorrow, 'month'); // true
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
