import { useState } from 'react';
import useTemporalStartOf, { StartOfUnit } from '../../src/useTemporalStartOf';
import useTemporalEndOf from '../../src/useTemporalEndOf';
import useCurrentDateTime from '../../src/useCurrentDateTime';

export default function DemoUseTemporalStartEndOf() {
  const startOf = useTemporalStartOf();
  const endOf = useTemporalEndOf();
  const currentDateTime = useCurrentDateTime();
  const [datetime, setDatetime] = useState(currentDateTime);
  const [unit, setUnit] = useState<StartOfUnit>('day');

  const startOfResult = startOf(datetime, unit);
  const endOfResult = endOf(datetime, unit);

  return (
    <section className="demo-card">
      <h3>useTemporalStartOf / useTemporalEndOf</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{datetime.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setDatetime(useCurrentDateTime())}>Now</button>
        <button style={{ marginLeft: 8 }} onClick={() => setDatetime(datetime.add({ days: 1 }))}>+1 day</button>
        <button style={{ marginLeft: 8 }} onClick={() => setDatetime(datetime.subtract({ days: 1 }))}>-1 day</button>
      </div>
      <div className="demo-row">
        <b>Unit:</b>
        {['year', 'month', 'week', 'day', 'hour', 'minute', 'second'].map(unit => (
          <button
            key={unit}
            style={{ marginLeft: 8, fontWeight: unit === unit ? 'bold' : 'normal' }}
            onClick={() => setUnit(unit as StartOfUnit)}
          >
            {unit}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Start of {unit}:</b> <span className="demo-value">{startOfResult.toString()}</span>
      </div>
      <div className="demo-row">
        <b>End of {unit}:</b> <span className="demo-value">{endOfResult.toString()}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Calculates the start or end of a specified unit (year, month, week, day) for a Temporal date/time object.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>useTemporalStartOf Syntax:</strong> useTemporalStartOf()<br/>
            <strong>useTemporalEndOf Syntax:</strong> useTemporalEndOf()<br/>
            <strong>Returns:</strong> Each hook returns a function that takes:<br/>
            - date: Temporal date/time object<br/>
            - unit: Unit for calculation ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useTemporalStartOf, useTemporalEndOf, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const startOf = useTemporalStartOf();<br/>
              const endOf = useTemporalEndOf();<br/>
              const now = useCurrentDateTime();<br/>
              <br/>
              // Get start of month<br/>
              const startOfMonth = startOf(now, 'month');<br/>
              // e.g., 2025-05-01T00:00:00<br/>
              <br/>
              // Get end of month<br/>
              const endOfMonth = endOf(now, 'month');<br/>
              // e.g., 2025-05-31T23:59:59.999999999
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
