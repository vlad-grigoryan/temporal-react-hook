import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalAdd from "../../src/useTemporalAdd";

export default function DemoUseTemporalAdd() {
  const [baseDate, setBaseDate] = useState(() => Temporal.Now.plainDateTimeISO());
  const [amount, setAmount] = useState({ days: 1 });
  const add = useTemporalAdd();
  const result = add(baseDate, amount);

  return (
    <section className="demo-card">
      <h3>useTemporalAdd</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{baseDate.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setBaseDate(Temporal.Now.plainDateTimeISO())}>Now</button>
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
          <span>useTemporalAdd adds a specified amount to a Temporal date/time object.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const added = useTemporalAdd(dateTime, &#123; days: 1 &#125;);</span>
        </div>
      </div>
    </section>
  );
}
