import { useState } from "react";
import useTemporalAdd from "../../src/useTemporalAdd";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseTemporalAdd() {
  const currentDateTime = useCurrentDateTime();
  const [baseDate, setBaseDate] = useState(currentDateTime);
  const [amount, setAmount] = useState({ days: 1 });
  const add = useTemporalAdd();
  const result = add(baseDate, amount);

  return (
    <section className="demo-card">
      <h3>useTemporalAdd</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{baseDate.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setBaseDate(useCurrentDateTime())}>Now</button>
      </div>
      <div className="demo-row">
        <b>Days to Add:</b>
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
          <span>Adds a specified amount of seconds, minutes, hours, days, weeks, months, or years to a Temporal.PlainDateTime.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalAdd()<br/>
            <strong>Parameters:</strong><br/>
            - date: Temporal.PlainDateTime — The base date/time<br/>
            - amount: Partial&lt;Temporal.DurationLike&gt; — Object with any combination of seconds, minutes, hours, days, weeks, months, years<br/>
            <strong>Returns:</strong> Temporal.PlainDateTime — The new date/time after addition<br/>
            <strong>Example:</strong><br/>
            <code>
              import &#123; useTemporalAdd, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const add = useTemporalAdd();<br/>
              const now = useCurrentDateTime();<br/>
              const tomorrow = add(now, &#123; days: 1 &#125;);<br/>
              // tomorrow is now plus one day<br/>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
