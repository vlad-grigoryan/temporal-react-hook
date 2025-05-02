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
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>The useLocaleDateTime hook formats a Temporal date/time object as a localized string using the browser's locale (or a provided locale) and Intl.DateTimeFormat options. It supports Temporal.PlainDateTime, Temporal.ZonedDateTime, and Temporal.Instant.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useLocaleDateTime(dateTime, locale?, options?)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - locale?: Optional string specifying the locale (e.g., 'en-US', 'fr-FR')<br/>
            - options?: Optional configuration object for Intl.DateTimeFormat<br/>
            <strong>Returns:</strong> A formatted string based on locale and options<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useLocaleDateTime, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              // Get the current date and time
              const now = useCurrentDateTime();<br/>
              <br/>
              // Format with locale and options
              const formatted = useLocaleDateTime(now, 'en-US', &#123; dateStyle: 'full', timeStyle: 'short' &#125;);<br/>
              // Output example: "Monday, January 1, 2024 at 12:00 PM"
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
