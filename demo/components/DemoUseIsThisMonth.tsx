import { useState } from "react";
import useIsThisMonth from "../../src/useIsThisMonth";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseIsThisMonth() {
  const now = useTemporalDateTime();
  const today = now.toPlainDate();
  const [date, setDate] = useState(today);
  // Convert PlainDate to PlainDateTime at midnight for compatibility
  const dateTime = date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const isThisMonth = useIsThisMonth(dateTime);
  const dates = [
    today,
    today.subtract({ months: 1 }),
    today.subtract({ months: 2 }),
    today.add({ months: 1 }),
    today.add({ months: 2 })
  ];
  return (
    <section className="demo-card">
      <h3>useIsThisMonth</h3>
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
        <b>Is This Month?:</b> <span className="demo-value">{isThisMonth ? 'Yes' : 'No'}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Returns true if the provided date is within the current month.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsThisMonth(dateTime)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            <strong>Returns:</strong> A boolean indicating whether the provided date is within the current month<br/>
            <strong>Example:</strong>
              <code>
                import &#123; useIsThisMonth, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
                <br/>
                // Get the current date/time
                const now = useTemporalDateTime();<br/>
                // Create a date/time to check
                const dateTime = now; // or any other Temporal date/time<br/>
                const isThisMonth = useIsThisMonth(dateTime);<br/>
                // Returns true if dateTime is in the current month, false otherwise
              </code>
          </span>
        </div>
      </div>
    </section>
  );
}
