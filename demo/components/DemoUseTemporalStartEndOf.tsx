import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalStartOf, { StartOfUnit } from "../../src/useTemporalStartOf";
import useTemporalEndOf from "../../src/useTemporalEndOf";

export default function DemoUseTemporalStartEndOf() {
  const startOf = useTemporalStartOf();
  const endOf = useTemporalEndOf();
  const [sofBase, setSofBase] = useState(() => Temporal.Now.plainDateTimeISO());
  const [sofUnit, setSofUnit] = useState<StartOfUnit>('day');
  const sofStart = startOf(sofBase, sofUnit);
  const sofEnd = endOf(sofBase, sofUnit);
  const sofUnits: StartOfUnit[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  return (
    <section className="demo-card">
      <h3>useTemporalStartOf / useTemporalEndOf</h3>
      <div className="demo-row">
        <b>Base Date:</b> <span className="demo-value">{sofBase.toString()}</span>
        <button style={{ marginLeft: 8 }} onClick={() => setSofBase(Temporal.Now.plainDateTimeISO())}>Now</button>
        <button style={{ marginLeft: 8 }} onClick={() => setSofBase(sofBase.add({ days: 1 }))}>+1 day</button>
        <button style={{ marginLeft: 8 }} onClick={() => setSofBase(sofBase.subtract({ days: 1 }))}>-1 day</button>
      </div>
      <div className="demo-row">
        <b>Unit:</b>
        {sofUnits.map(unit => (
          <button
            key={unit}
            style={{ marginLeft: 8, fontWeight: sofUnit === unit ? 'bold' : 'normal' }}
            onClick={() => setSofUnit(unit)}
          >
            {unit}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Start of {sofUnit}:</b> <span className="demo-value">{sofStart.toString()}</span>
      </div>
      <div className="demo-row">
        <b>End of {sofUnit}:</b> <span className="demo-value">{sofEnd.toString()}</span>
      </div>
    </section>
  );
}
