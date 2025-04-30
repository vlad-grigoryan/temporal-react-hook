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
    </section>
  );
}
