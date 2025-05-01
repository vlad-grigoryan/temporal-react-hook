import { useState } from "react";
import useIsThisYear from "../../src/useIsThisYear";
import { Temporal } from "@js-temporal/polyfill";

export default function DemoUseIsThisYear() {
  const today = Temporal.Now.plainDateISO();
  const [date, setDate] = useState(today);
  // Convert PlainDate to PlainDateTime at midnight for compatibility
  const dateTime = date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const isThisYear = useIsThisYear(dateTime);
  const dates = [
    today,
    today.subtract({ years: 1 }),
    today.subtract({ years: 2 }),
    today.add({ years: 1 }),
    today.add({ years: 2 })
  ];
  return (
    <section className="demo-card">
      <h3>useIsThisYear</h3>
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
        <b>Is This Year?:</b> <span className="demo-value">{isThisYear ? 'Yes' : 'No'}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useIsThisYear checks if a Temporal date/time is in the current calendar year.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const isThisYear = useIsThisYear(date);</span>
        </div>
      </div>
    </section>
  );
}
