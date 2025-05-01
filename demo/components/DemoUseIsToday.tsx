import { useState } from "react";
import useIsToday from "../../src/useIsToday";
import { Temporal } from "@js-temporal/polyfill";

export default function DemoUseIsToday() {
  const today = Temporal.Now.plainDateISO();
  const [date, setDate] = useState(today);
  // Convert PlainDate to PlainDateTime at midnight for compatibility
  const dateTime = date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const isToday = useIsToday(dateTime);
  const dates = [
    today,
    today.subtract({ days: 1 }),
    today.subtract({ days: 2 }),
    today.add({ days: 1 }),
    today.add({ days: 2 })
  ];
  return (
    <section className="demo-card">
      <h3>useIsToday</h3>
      <div className="demo-row">
        <b>Date:</b>
        {dates.map((d, i) => (
          <button
            key={i}
            className={d.equals(date) ? "active" : ""}
            style={{ marginLeft: 8, padding: '0.4rem 1rem', borderRadius: '0.5rem', border: d.equals(date) ? '2px solid #2bd4c5' : '1px solid #e0e3ea', background: d.equals(date) ? '#e6fcfa' : '#fff', color: '#23272f', fontWeight: 500, cursor: 'pointer' }}
            onClick={() => setDate(d)}
          >
            {d.toString()}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Is Today?:</b> <span className="demo-value">{isToday ? 'Yes' : 'No'}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useIsToday checks if a given Temporal date/time is today.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const isToday = useIsToday(dateTime);</span>
        </div>
      </div>
    </section>
  );
}
