import { useState } from "react";
import useTemporalAdd from "../../src/useTemporalAdd";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseTemporalAdd() {
  const currentDateTime = useTemporalDateTime();
  const [baseDate, setBaseDate] = useState(currentDateTime);
  const [amount, setAmount] = useState({ years: 0, months: 0, days: 1, hours: 0, minutes: 0, seconds: 0 });
  const add = useTemporalAdd();
  const result = add(baseDate, amount);

  return (
    <section className="demo-card">
      <h3>useTemporalAdd</h3>
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Base Date:</b>
          <span className="demo-value">{baseDate.toString()}</span>
          <button onClick={() => setBaseDate(currentDateTime)}>Now</button>
          <button onClick={() => setBaseDate(baseDate.add({ days: 1 }))}>+1 day</button>
          <button onClick={() => setBaseDate(baseDate.subtract({ days: 1 }))}>-1 day</button>
        </div>
      </div>

      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Duration:</b>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Years:</span>
              <input
                type="number"
                min={0}
                value={amount.years}
                onChange={e => setAmount({ ...amount, years: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Months:</span>
              <input
                type="number"
                min={0}
                value={amount.months}
                onChange={e => setAmount({ ...amount, months: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Days:</span>
              <input
                type="number"
                min={0}
                value={amount.days}
                onChange={e => setAmount({ ...amount, days: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Hours:</span>
              <input
                type="number"
                min={0}
                value={amount.hours}
                onChange={e => setAmount({ ...amount, hours: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Minutes:</span>
              <input
                type="number"
                min={0}
                value={amount.minutes}
                onChange={e => setAmount({ ...amount, minutes: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Seconds:</span>
              <input
                type="number"
                min={0}
                value={amount.seconds}
                onChange={e => setAmount({ ...amount, seconds: Math.max(0, Number(e.target.value)) })}
                className="demo-input-compact"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Result:</b>
          <span className="demo-value">{result.toString()}</span>
        </div>
      </div>

      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Adds a specified amount of seconds, minutes, hours, days, weeks, months, or years to a Temporal.PlainDateTime.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalAdd(date, amount)<br/>
            <strong>Parameters:</strong><br/>
            - date: Temporal.PlainDateTime — The base date/time<br/>
            - amount: Partial&lt;Temporal.DurationLike&gt; — Object with any combination of seconds, minutes, hours, days, weeks, months, years<br/>
            <strong>Returns:</strong> Temporal.PlainDateTime — The new date/time after addition<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useTemporalAdd, useTemporalDateTime } from 'temporal-react-hook';

const add = useTemporalAdd();
const now = useTemporalDateTime();
// Add multiple duration units at once
const futureDate = add(now, {
  years: 1,    // Add 1 year
  months: 6,   // and 6 months
  days: 15,    // and 15 days
  hours: 3,    // and 3 hours
  minutes: 30  // and 30 minutes
});

// Or just add days
const tomorrow = add(now, { days: 1 });`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
