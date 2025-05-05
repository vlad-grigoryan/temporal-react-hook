import { useState } from "react";
import useTemporalDateTime from "../../src/useTemporalDateTime";
import "./DemoCard.css";

const INITIAL_DATE = "2025-05-05T12:34";

export default function DemoUseTemporalDateTime() {
  // Keep initial date in the input
  const [input, setInput] = useState<string | undefined>(INITIAL_DATE);
  let temporal: any;
  let error: string | null = null;
  try {
    temporal = useTemporalDateTime(input);
  } catch (e: any) {
    temporal = null;
    error = e?.message || String(e);
  }

  return (
    <section className="demo-card">
      <h3>useTemporalDateTime</h3>
      <div className="demo-row">
        <input
          type="text"
          placeholder="Enter ISO string, Date, or leave empty for now"
          value={input ?? ""}
          onChange={e => setInput(e.target.value || undefined)}
          className="demo-input-wide"
        />
      </div>
      {error && (
        <div className="demo-row">
          <span style={{ color: "red" }}>{error}</span>
        </div>
      )}
      <div className="demo-row">
        <b>Temporal.PlainDateTime:</b> <span className="demo-value">{temporal?.toString()}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            Converts various date/time inputs to a Temporal.PlainDateTime. If no input is provided, returns the current date/time (live).
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalDateTime(input?)<br />
            <strong>Parameters:</strong><br />
            - input: string | Date | Temporal object (optional)<br />
            <strong>Returns:</strong> Temporal.PlainDateTime<br />
            <strong>Example:</strong>
            <code>
              import useTemporalDateTime from 'temporal-react-hook';<br />
              const temporal = useTemporalDateTime('2025-05-05T12:34');<br />
              // temporal is a Temporal.PlainDateTime<br />
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
