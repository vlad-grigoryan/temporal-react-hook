import "./DemoCard.css";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseCurrentDateTime() {
  const now = useCurrentDateTime();

  return (
    <section className="demo-card">
      <h3>useCurrentDateTime</h3>
      <div className="demo-row">
        <b>Current DateTime:</b>
        <span className="demo-value">{now.toString()}</span>
      </div>
      <div className="demo-info-card">
        <div>
          <strong>useCurrentDateTime</strong> provides a live-updating <code>Temporal.PlainDateTime</code> object representing the current date and time.
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <code>{`const now = useCurrentDateTime();`}</code>
        </div>
      </div>
    </section>
  );
}
