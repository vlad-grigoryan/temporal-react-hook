import { useState } from "react";
import "./DemoCard.css";
import useTimeAgo from "../../src/useTimeAgo";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseTimeAgo() {
  const now = useCurrentDateTime();
  const [base] = useState(() => now.subtract({ minutes: 5 }));
  const timeAgo = useTimeAgo(base);
  return (
    <section className="demo-card">
      <h3>useTimeAgo</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{base.toString()}</span>
      </div>
      <div className="demo-row">
        <b>Time Ago:</b> <span className="demo-value">{timeAgo}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useTimeAgo returns a human-friendly relative time string for a given Temporal date/time object.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const timeAgo = useTimeAgo(dateTime);</span>
        </div>
      </div>
    </section>
  );
}
