import React, { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import useCurrentDateTime from "../src/useCurrentDateTime";
import useTimeZone from "../src/useTimeZone";
import useDuration from "../src/useDuration";
import useRelativeTime from "../src/useRelativeTime";
import useLocaleDateTime from "../src/useLocaleDateTime";
import useTimeAgo from "../src/useTimeAgo";
import useIsToday from "../src/useIsToday";
import useIsThisWeek from "../src/useIsThisWeek";
import useIsThisMonth from "../src/useIsThisMonth";
import useIsThisYear from "../src/useIsThisYear";
import useTemporalAdd from "../src/useTemporalAdd";
import useTemporalSubtract from "../src/useTemporalSubtract";

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
  useEffect(() => {
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

  // useLocaleDateTime demo state
  const [locale, setLocale] = useState('fr-FR');
  const [dateStyle, setDateStyle] = useState<'full'|'long'|'medium'|'short'>('full');
  const [timeStyle, setTimeStyle] = useState<'full'|'long'|'medium'|'short'>('short');

  const formattedLocaleDateTime = useLocaleDateTime(
    now,
    locale,
    { dateStyle, timeStyle }
  );

  // useTimeAgo demo state
  const [agoDateTime, setAgoDateTime] = useState(() => {
    // Default: 5 minutes ago
    return Temporal.PlainDateTime.from(now.toString()).subtract({ minutes: 5 });
  });
  const agoString = useTimeAgo(agoDateTime);

  // For quick selection
  const makePlainDateTime = (base: typeof now, diff: { minutes?: number; hours?: number; days?: number }) => {
    return Temporal.PlainDateTime.from(base.toString()).subtract(diff);
  };
  const agoOptions = [
    { label: "5 minutes ago", value: makePlainDateTime(now, { minutes: 5 }) },
    { label: "2 hours ago", value: makePlainDateTime(now, { hours: 2 }) },
    { label: "Yesterday", value: makePlainDateTime(now, { days: 1 }) },
    { label: "6 days ago", value: makePlainDateTime(now, { days: 6 }) },
    { label: "Just now", value: Temporal.PlainDateTime.from(now.toString()) },
  ];

  // Predefined options for demonstration
  const localeOptions = [
    { label: 'French (fr-FR)', value: 'fr-FR' },
    { label: 'US English (en-US)', value: 'en-US' },
    { label: 'Japanese (ja-JP)', value: 'ja-JP' },
    { label: 'German (de-DE)', value: 'de-DE' },
  ];
  const styleOptions = ['full', 'long', 'medium', 'short'] as const;

  // useTemporalAdd/Subtract demo state
  const add = useTemporalAdd();
  const subtract = useTemporalSubtract();
  const [baseDate, setBaseDate] = useState(() => Temporal.PlainDateTime.from(now.toString()));
  const [amount, setAmount] = useState<Partial<Temporal.DurationLike>>({ days: 1 });
  const [resultAdd, setResultAdd] = useState(() => add(baseDate, amount));
  const [resultSubtract, setResultSubtract] = useState(() => subtract(baseDate, amount));

  useEffect(() => {
    setResultAdd(add(baseDate, amount));
    setResultSubtract(subtract(baseDate, amount));
  }, [baseDate, amount, add, subtract]);

  // Simple input controls for demo
  const handleAmountChange = (unit: keyof Temporal.DurationLike, value: number) => {
    if (value < 0 || isNaN(value)) return; // Prevent negative or invalid values
    setAmount(prev => ({ ...prev, [unit]: value }));
  };

  return (
    <div style={{ fontFamily: "monospace", padding: 20, maxWidth: 700 }}>
      <h2>Temporal React Hook Playground</h2>
      <section style={{ marginBottom: 24 }}>
        <h3>useCurrentDateTime</h3>
        <div>Current Date/Time: {now.toString()}</div>
      </section>

      <hr style={{ margin: '32px 0' }} />

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

      <hr style={{ margin: '32px 0' }} />

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

      <hr style={{ margin: '32px 0' }} />

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

      <hr style={{ margin: '32px 0' }} />

      <section>
        <h3>useTimeAgo</h3>
        <div style={{ marginBottom: 8 }}>
          <label>Pick a time:
            {agoOptions.map(opt => (
              <button
                key={opt.label}
                style={{ marginLeft: 8, fontWeight: agoDateTime.equals(opt.value) ? 'bold' : 'normal' }}
                onClick={() => setAgoDateTime(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </label>
        </div>
        <p>
          <b>Selected time:</b> {agoDateTime.toString()}
        </p>
        <p>
          <b>Time ago:</b> {agoString}
        </p>
      </section>

      <hr style={{ margin: '32px 0' }} />

      <section>
        <h3>useLocaleDateTime</h3>
        <div style={{ marginBottom: 8 }}>
          <label>Locale:
            {localeOptions.map(opt => (
              <button
                key={opt.value}
                style={{ marginLeft: 8, fontWeight: locale === opt.value ? 'bold' : 'normal' }}
                onClick={() => setLocale(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Date Style:
            {styleOptions.map(opt => (
              <button
                key={opt}
                style={{ marginLeft: 8, fontWeight: dateStyle === opt ? 'bold' : 'normal' }}
                onClick={() => setDateStyle(opt)}
              >
                {opt}
              </button>
            ))}
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Time Style:
            {styleOptions.map(opt => (
              <button
                key={opt}
                style={{ marginLeft: 8, fontWeight: timeStyle === opt ? 'bold' : 'normal' }}
                onClick={() => setTimeStyle(opt)}
              >
                {opt}
              </button>
            ))}
          </label>
        </div>
        <p>
          <b>Current date/time ({locale}, {dateStyle}/{timeStyle}):</b> <br />
          <span>{formattedLocaleDateTime}</span>
        </p>
      </section>

      <hr style={{ margin: '32px 0' }} />

      <section>
        <h3>useTemporalAdd / useTemporalSubtract</h3>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <b>Base Date:</b> {baseDate.toString()}
        </div>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <b>Amount to Add/Subtract:</b>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', marginTop: 8, marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
            {["seconds","minutes","hours","days","weeks","months","years"].map(unit => (
              <span key={unit}>
                <label>
                  {unit}: <input
                    type="number"
                    min={0}
                    value={amount[unit as keyof Temporal.DurationLike] ?? ""}
                    onChange={e => handleAmountChange(unit as keyof Temporal.DurationLike, Number(e.target.value))}
                    style={{ width: 50, marginLeft: 4, marginRight: 4 }}
                  />
                </label>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <button onClick={() => setBaseDate(Temporal.PlainDateTime.from(now.toString()))}>Reset Base Date to Now</button>
        </div>
        <div>
          <b>Result (Add):</b> {resultAdd.toString()}
        </div>
        <div>
          <b>Result (Subtract):</b> {resultSubtract.toString()}
        </div>
      </section>

      <hr style={{ margin: '32px 0' }} />

      <section>
        <h3>Date Range Hooks</h3>
        <div>
          <b>Now:</b> {now.toString()}
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Is Today?</b> {String(useIsToday(now))}
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Is This Week?</b> {String(useIsThisWeek(now))}
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Is This Month?</b> {String(useIsThisMonth(now))}
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Is This Year?</b> {String(useIsThisYear(now))}
        </div>
        <div style={{ marginTop: 16 }}>
          <b>Pick a date to test:</b>
          <button style={{ marginLeft: 8 }} onClick={() => setDemoRelativeBase(now.subtract({ days: 1 }))}>Yesterday</button>
          <button style={{ marginLeft: 8 }} onClick={() => setDemoRelativeBase(now.subtract({ weeks: 1 }))}>Last Week</button>
          <button style={{ marginLeft: 8 }} onClick={() => setDemoRelativeBase(now.subtract({ months: 1 }))}>Last Month</button>
          <button style={{ marginLeft: 8 }} onClick={() => setDemoRelativeBase(now.subtract({ years: 1 }))}>Last Year</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Selected:</b> {demoRelativeBase.toString()}<br />
          <b>Is Today?</b> {String(useIsToday(demoRelativeBase))}<br />
          <b>Is This Week?</b> {String(useIsThisWeek(demoRelativeBase))}<br />
          <b>Is This Month?</b> {String(useIsThisMonth(demoRelativeBase))}<br />
          <b>Is This Year?</b> {String(useIsThisYear(demoRelativeBase))}
        </div>
      </section>

      <hr style={{ margin: '32px 0' }} />
    </div>
  );
};

export default Playground;
