import React, { useState } from "react";
import useCurrentDateTime from "../src/useCurrentDateTime";
import useTimeZone from "../src/useTimeZone";
import useDuration from "../src/useDuration";
import useRelativeTime from "../src/useRelativeTime";

const Playground: React.FC = () => {
  // useCurrentDateTime: get the current time (PlainDateTime)
  const now = useCurrentDateTime();
  // useTimeZone: get current time zone and conversion util
  const { timeZone, convertToTimeZone } = useTimeZone();
  // useDuration: duration helpers
  const { createDuration, addDuration, subtractDuration, formatDuration } = useDuration();

  // Demo: create a duration
  const [duration, setDuration] = useState(() => createDuration({ hours: 1, minutes: 30 }));
  // Demo: add/subtract duration to now
  const [addedDateTime, setAddedDateTime] = useState(() => addDuration(now, duration));
  const [subtractedDateTime, setSubtractedDateTime] = useState(() => subtractDuration(now, duration));

  // Update added/subtracted when now or duration changes
  React.useEffect(() => {
    setAddedDateTime(addDuration(now, duration));
    setSubtractedDateTime(subtractDuration(now, duration));
  }, [now, duration]);

  // For time zone conversion
  const [targetZone, setTargetZone] = useState("America/New_York");
  let converted;
  try {
    converted = convertToTimeZone(now, targetZone);
  } catch {
    converted = "Invalid time zone";
  }

  // For relative time demo
  const [demoRelativeBase, setDemoRelativeBase] = useState(() => now.subtract({ minutes: 3 }));
  const relative = useRelativeTime(demoRelativeBase);

  return (
    <div style={{ fontFamily: "monospace", padding: 20, maxWidth: 700 }}>
      <h2>Temporal React Hook Playground</h2>
      <section style={{ marginBottom: 24 }}>
        <h3>useCurrentDateTime</h3>
        <div>Current Date/Time: {now.toString()}</div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>useTimeZone</h3>
        <div>Current Time Zone: {String(timeZone)}</div>
        <div>
          Convert Now to Time Zone:
          <input
            type="text"
            value={targetZone}
            onChange={e => setTargetZone(e.target.value)}
            style={{ marginLeft: 8 }}
          />
          <div>
            Converted: {typeof converted === "string" ? converted : converted.toString()}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>useRelativeTime</h3>
        <div>
          <label>
            Demo Base Time (3 min ago): {demoRelativeBase.toString()}
            <br />
            <button onClick={() => setDemoRelativeBase(now.subtract({ minutes: 3 }))}>Set 3 min ago</button>
            <button onClick={() => setDemoRelativeBase(now.add({ minutes: 5 }))} style={{ marginLeft: 8 }}>Set 5 min in future</button>
          </label>
          <div>Relative: {relative}</div>
        </div>
      </section>

      <section>
        <h3>useDuration</h3>
        <div>Duration: {formatDuration(duration)}</div>
        <div>
          <button onClick={() => setDuration(createDuration({ hours: 2 }))}>Set to 2 hours</button>
          <button onClick={() => setDuration(createDuration({ minutes: 45 }))} style={{ marginLeft: 8 }}>Set to 45 min</button>
        </div>
        <div style={{ marginTop: 8 }}>Now + Duration: {addedDateTime.toString()}</div>
        <div>Now - Duration: {subtractedDateTime.toString()}</div>
      </section>
    </div>
  );
};

export default Playground;
