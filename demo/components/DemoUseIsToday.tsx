import { useState } from "react";
import useIsToday from "../../src/useIsToday";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseIsToday() {
  const now = useTemporalDateTime();
  const today = now.toPlainDate();
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
            className={`demo-select-btn${d.equals(date) ? " active" : ""}`}
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
          <span>Returns true if the provided date is today.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsToday(dateTime)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            <strong>Returns:</strong> A boolean indicating whether the provided date is today<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useIsToday, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              // Get the current date/time
              const now = useTemporalDateTime();<br/>
              // Create a date/time to check
              const dateTime = now; // or any other Temporal date/time<br/>
              const isToday = useIsToday(dateTime);<br/>
              // Returns true if dateTime is today, false otherwise
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
