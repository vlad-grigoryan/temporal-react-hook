import { useState } from "react";
import "./DemoCard.css";
import useDuration from "../../src/useDuration";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseDuration() {
  const { createDuration, addDuration, subtractDuration, formatDuration } = useDuration();
  const now = useCurrentDateTime();
  const [duration] = useState(() => createDuration({ hours: 1, minutes: 30 }));
  const added = addDuration(now, duration);
  const subtracted = subtractDuration(now, duration);
  return (
    <section className="demo-card">
      <h3>useDuration</h3>
      <div className="demo-row">
        <b>Duration:</b>
        <span className="demo-value">{formatDuration(duration)}</span>
      </div>
      <div className="demo-row">
        <b>Now + Duration:</b>
        <span className="demo-value">{added.toString()}</span>
      </div>
      <div className="demo-row">
        <b>Now - Duration:</b>
        <span className="demo-value">{subtracted.toString()}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>The useDuration hook provides utilities for working with durations using the Temporal API. This hook allows users to create durations, perform operations like adding or subtracting them from date-times, and format durations in a human-readable string.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useDuration()<br/>
            <strong>Returns:</strong> Object with utility functions:<br/>
            - createDuration(obj): Creates a Temporal.Duration<br/>
            - addDuration(date, duration): Adds a duration to a date<br/>
            - subtractDuration(date, duration): Subtracts a duration from a date<br/>
            - formatDuration(duration): Formats a duration as a string<br/>
            <strong>Example:</strong>
              <code>
                import &#123; useDuration, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
                <br/>
                const &#123; createDuration, addDuration, subtractDuration, formatDuration &#125; = useDuration();<br/>
                const duration = createDuration(&#123; hours: 1, minutes: 30 &#125;);
              </code>
          </span>
        </div>
      </div>
    </section>
  );
}
