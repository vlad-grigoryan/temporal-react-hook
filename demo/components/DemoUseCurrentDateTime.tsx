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
        <div className="demo-description">
          <strong>Description:</strong>
          <span>The useCurrentDateTime hook provides the current date and time using the Temporal API. It automatically updates the date and time every second, ensuring that the component using this hook always displays the most recent time.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useCurrentDateTime()<br/>
            <strong>Returns:</strong> Temporal.PlainDateTime - The current date and time<br/>
            <strong>Example:</strong>
              <code>
                import &#123; useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
                <br/>
                const now = useCurrentDateTime();<br/>
                // now is updated every second
              </code>

          </span>
        </div>
      </div>
    </section>
  );
}
