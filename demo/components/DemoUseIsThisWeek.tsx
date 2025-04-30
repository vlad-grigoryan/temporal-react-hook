import { useState } from "react";
import useIsThisWeek from "../../src/useIsThisWeek";
import { Temporal } from "@js-temporal/polyfill";

export default function DemoUseIsThisWeek() {
  const today = Temporal.Now.plainDateISO();
  const [date, setDate] = useState(today);
  // Convert PlainDate to PlainDateTime at midnight for compatibility
  const dateTime = date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const isThisWeek = useIsThisWeek(dateTime);
  const dates = [
    today,
    today.subtract({ days: 7 }),
    today.subtract({ days: 14 }),
    today.add({ days: 7 }),
    today.add({ days: 14 })
  ];
  return (
    <section className="demo-card">
      <h3>useIsThisWeek</h3>
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
        <b>Is This Week?:</b> <span className="demo-value">{isThisWeek ? 'Yes' : 'No'}</span>
      </div>
    </section>
  );
}
