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
    </section>
  );
}
