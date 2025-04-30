import { useState } from "react";
import "./DemoCard.css";
import useLocaleDateTime from "../../src/useLocaleDateTime";
import useCurrentDateTime from "../../src/useCurrentDateTime";

export default function DemoUseLocaleDateTime() {
  const now = useCurrentDateTime();
  const [locale, setLocale] = useState('fr-FR');
  const [dateStyle, setDateStyle] = useState<'full'|'long'|'medium'|'short'>('full');
  const [timeStyle, setTimeStyle] = useState<'full'|'long'|'medium'|'short'>('short');
  const formatted = useLocaleDateTime(now, locale, { dateStyle, timeStyle });
  return (
    <section className="demo-card">
      <h3>useLocaleDateTime</h3>
      <div className="demo-row">
        <b>Locale:</b>
        <input type="text" value={locale} onChange={e => setLocale(e.target.value)} />
      </div>
      <div className="demo-row">
        <b>Date Style:</b>
        <select value={dateStyle} onChange={e => setDateStyle(e.target.value as 'full'|'long'|'medium'|'short')}>
          <option value="full">Full</option>
          <option value="long">Long</option>
          <option value="medium">Medium</option>
          <option value="short">Short</option>
        </select>
      </div>
      <div className="demo-row">
        <b>Time Style:</b>
        <select value={timeStyle} onChange={e => setTimeStyle(e.target.value as 'full'|'long'|'medium'|'short')}>
          <option value="full">Full</option>
          <option value="long">Long</option>
          <option value="medium">Medium</option>
          <option value="short">Short</option>
        </select>
      </div>
      <div className="demo-row">
        <b>Formatted:</b> <span className="demo-value">{formatted}</span>
      </div>
    </section>
  );
}
