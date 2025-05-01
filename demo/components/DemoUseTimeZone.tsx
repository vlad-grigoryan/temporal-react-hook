import { useState } from "react";
import "./DemoCard.css";
import useTimeZone from "../../src/useTimeZone";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseTimeZone() {
  const { timeZone, convertToTimeZone } = useTimeZone();
  const now = useCurrentDateTime();
  const [zone, setZone] = useState("America/New_York");
  let converted = "";
  try {
    converted = convertToTimeZone(now, zone).toString();
  } catch {
    converted = "Invalid time zone";
  }
  return (
    <section className="demo-card">
      <h3>useTimeZone</h3>
      <div className="demo-row">
        <b>Local Time Zone:</b>
        <span className="demo-value">{timeZone}</span>
      </div>
      <div className="demo-row">
        <b>Convert:</b>
      </div>
      <div className="demo-row">
        <input
          type="text"
          value={zone}
          onChange={e => setZone(e.target.value)}
          placeholder="Enter IANA Time Zone"
        />
      </div>
      <div className="demo-row">
        <b>Result:</b> <span className="demo-value">{converted}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useTimeZone provides the user's current time zone and a utility to convert a Temporal date/time object to a specified IANA time zone.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const &#123; currentTimeZone, toTimeZone &#125; = useTimeZone();</span>
        </div>
      </div>
    </section>
  );
}
