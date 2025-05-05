import { useState } from "react";
import "./DemoCard.css";
import useTimeAgo from "../../src/useTimeAgo";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseTimeAgo() {
  const now = useTemporalDateTime();
  console.log(now)
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
          <span>The useTimeAgo hook returns a live-updating, human-friendly string representing how long ago a Temporal date/time occurred (e.g., "just now", "5 minutes ago", "2 days ago"). It supports Temporal.PlainDateTime, Temporal.ZonedDateTime, and Temporal.Instant.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTimeAgo(dateTime, options?)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - options?: Optional configuration object for customizing the display<br/>
            <strong>Returns:</strong> A string representing the relative time (e.g., "5 minutes ago")<br/>
            <strong>Example:</strong>
              <code>
                import &#123; useTimeAgo, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
                <br/>
                // Get current time
                const now = useTemporalDateTime();<br/>
                <br/>
                // Create a time in the past
                const pastTime = now.subtract(&#123; hours: 2 &#125;);<br/>
                <br/>
                // Get human-readable time ago
                const timeAgo = useTimeAgo(pastTime);<br/>
                // Returns a human-readable string like "2 hours ago" or "just now"
              </code>
          </span>
        </div>
      </div>
    </section>
  );
}
