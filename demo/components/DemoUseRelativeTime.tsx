import { useState } from "react";
import "./DemoCard.css";
import useRelativeTime from "../../src/useRelativeTime";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseRelativeTime() {
  const now = useCurrentDateTime();
  const [base] = useState(() => now.subtract({ minutes: 3 }));
  const relative = useRelativeTime(base);
  return (
    <section className="demo-card">
      <h3>useRelativeTime</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{base.toString()}</span>
      </div>
      <div className="demo-row">
        <b>Relative:</b> <span className="demo-value">{relative}</span>
      </div>
    </section>
  );
}
