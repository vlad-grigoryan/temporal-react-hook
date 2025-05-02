import { useState } from "react";
import useTemporalSubtract from "../../src/useTemporalSubtract";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseTemporalSubtract() {
  const currentDateTime = useCurrentDateTime();
  const [baseDate, setBaseDate] = useState(currentDateTime);
  const [amount, setAmount] = useState({ days: 1 });
  const subtract = useTemporalSubtract();
  const result = subtract(baseDate, amount);

  return (
    <section className="demo-card">
      <h3>useTemporalSubtract</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{baseDate.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setBaseDate(useCurrentDateTime())}>Now</button>
      </div>
      <div className="demo-row">
        <b>Days to Subtract:</b>
        <input
          type="number"
          min={0}
          value={amount.days}
          onChange={e => setAmount({ days: Math.max(0, Number(e.target.value)) })}
          style={{ marginLeft: 8, width: 60 }}
        />
      </div>
      <div className="demo-row">
        <b>Result:</b> <span className="demo-value">{result.toString()}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Subtracts a specified amount of seconds, minutes, hours, days, weeks, months, or years from a Temporal.PlainDateTime.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalSubtract()<br/>
            <strong>Parameters:</strong><br/>
            - date: Temporal.PlainDateTime — The base date/time<br/>
            - amount: Partial&lt;Temporal.DurationLike&gt; — Object with any combination of seconds, minutes, hours, days, weeks, months, years<br/>
            <strong>Returns:</strong> Temporal.PlainDateTime — The new date/time after subtraction<br/>
            <strong>Example:</strong><br/>
            <code>
              import &#123; useTemporalSubtract, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const subtract = useTemporalSubtract();<br/>
              const now = useCurrentDateTime();<br/>
              const yesterday = subtract(now, &#123; days: 1 &#125;);<br/>
              // yesterday is now minus one day<br/>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
