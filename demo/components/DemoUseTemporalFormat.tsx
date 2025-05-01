import { useState } from "react";
import "./DemoCard.css";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalFormat from "../../src/useTemporalFormat";

const presetOptions = ['short', 'medium', 'long', 'full'] as const;
const localeOptionsFmt = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'French', value: 'fr-FR' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Japanese', value: 'ja-JP' },
];

export default function DemoUseTemporalFormat() {
  const [formatDate, setFormatDate] = useState(() => Temporal.Now.plainDateTimeISO());
  const [formatPreset, setFormatPreset] = useState<'short' | 'medium' | 'long' | 'full'>('medium');
  const [formatLocale, setFormatLocale] = useState<string>('en-US');
  const formatted = useTemporalFormat(formatDate, formatPreset, formatLocale);

  return (
    <section className="demo-card">
      <h3>useTemporalFormat</h3>
      <div className="demo-row">
        <b>Date to Format:</b>
        <span className="demo-value">{formatDate.toString()}</span>
        <button onClick={() => setFormatDate(Temporal.Now.plainDateTimeISO())}>Now</button>
        <button onClick={() => setFormatDate(formatDate.add({ days: 1 }))}>+1 day</button>
        <button onClick={() => setFormatDate(formatDate.subtract({ days: 1 }))}>-1 day</button>
      </div>
      <div className="demo-row">
        <b>Preset:</b>
        {presetOptions.map(opt => (
          <button
            key={opt}
            className={formatPreset === opt ? "active" : ""}
            onClick={() => setFormatPreset(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Locale:</b>
        {localeOptionsFmt.map(opt => (
          <button
            key={opt.value}
            className={formatLocale === opt.value ? "active" : ""}
            onClick={() => setFormatLocale(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Formatted:</b>
        <span className="demo-value">{formatted}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>useTemporalFormat formats a Temporal date/time object to a string using a preset style and locale.</span>
        </div>
        <div className="demo-usage">
          <strong>Usage:</strong>
          <span>const formatted = useTemporalFormat(dateTime, 'medium', 'en-US');</span>
        </div>
      </div>
    </section>
  );
}
