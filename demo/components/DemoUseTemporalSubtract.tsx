import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalSubtract from "../../src/useTemporalSubtract";

export default function DemoUseTemporalSubtract() {
  const [baseDate, setBaseDate] = useState(() => Temporal.Now.plainDateTimeISO());
  const [amount, setAmount] = useState({ days: 1 });
  const subtract = useTemporalSubtract();
  const result = subtract(baseDate, amount);

  return (
    <section className="demo-card">
      <h3>useTemporalSubtract</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{baseDate.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setBaseDate(Temporal.Now.plainDateTimeISO())}>Now</button>
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
          <span>useTemporalSubtract subtracts a specified amount from a Temporal date/time object.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const subtracted = useTemporalSubtract(dateTime, &#123; days: 1 &#125;);</span>
        </div>
      </div>
    </section>
  );
}
