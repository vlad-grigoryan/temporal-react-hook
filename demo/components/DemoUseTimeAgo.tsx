import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import "./DemoCard.css";
import useTimeAgo from "../../src/useTimeAgo";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseTimeAgo() {
  const now = useTemporalDateTime();
  const samples = useMemo(() => [
    { label: '30 seconds ago', date: now.subtract({ seconds: 30 }) },
    { label: '5 minutes ago',  date: now.subtract({ minutes: 5 }) },
    { label: '2 hours ago',    date: now.subtract({ hours: 2 }) },
    { label: '1 day ago',       date: now.subtract({ days: 1 }) },
    { label: '10 days ago',     date: now.subtract({ days: 10 }) },
    { label: 'in 5 minutes',    date: now.add({ minutes: 5 }) },
  ], [now]);

  return (
    <section className="demo-card">
      <h3>useTimeAgo</h3>
      <div className="demo-times-grid">
        {samples.map(({ label, date }) => {
          const isFuture = Temporal.PlainDateTime.compare(date, now) > 0;
          const display = isFuture
            ? date.toPlainDate().toString()
            : useTimeAgo(date);
          return (
            <div key={label} className="demo-time-item">
              <div className="time-label">{label}</div>
              <div className="time-value">{display}</div>
              <div className="time-actual">{date.toString()}</div>
            </div>
          );
        })}
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            Renders a live-updating, human-friendly "time ago" string for past dates up to 7 days.
            Dates older than 7 days and any future dates display as plain ISO dates (YYYY-MM-DD).
          </span>
        </div>
        <div className="demo-usage">
          <strong>Example:</strong>
          <pre><code>{
`import { useTimeAgo, useTemporalDateTime } from 'temporal-react-hook';

const now = useTemporalDateTime();
const fiveMinAgo = now.subtract({ minutes: 5 });
const timeAgo = useTimeAgo(fiveMinAgo, 5000); // refresh every 5s
// timeAgo === "5 minutes ago"`
          }</code></pre>
        </div>
      </div>
    </section>
  );
}
