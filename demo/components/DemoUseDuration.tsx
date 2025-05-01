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
          <span>useDuration helps create, manipulate, and format Temporal.Duration objects.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const &#123; createDuration, addDuration, subtractDuration, formatDuration &#125; = useDuration();</span>
        </div>
      </div>
    </section>
  );
}
