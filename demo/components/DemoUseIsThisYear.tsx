import { useState } from "react";
import useIsThisYear from "../../src/useIsThisYear";
import useTemporalDateTime from "../../src/useTemporalDateTime.ts";

export default function DemoUseIsThisYear() {
  const now = useTemporalDateTime();
  const today = now.toPlainDate();
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
            className={`demo-select-btn${d.equals(date) ? " active" : ""}`}
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
          <span>Returns true if the provided date is within the current year.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useIsThisYear(dateTime)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            <strong>Returns:</strong> A boolean indicating whether the provided date is within the current year<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useIsThisYear, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              // Get the current date/time
              const now = useTemporalDateTime();<br/>
              // Create a date/time to check
              const dateTime = now; // or any other Temporal date/time<br/>
              const isThisYear = useIsThisYear(dateTime);<br/>
              // Returns true if dateTime is in the current year, false otherwise
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
