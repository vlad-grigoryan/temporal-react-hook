import { useState } from 'react';
import useTemporalFormat from '../../src/useTemporalFormat';
import useTemporalDateTime from '../../src/useTemporalDateTime';
import './DemoCard.css';

// Define preset options as allowed by the hook
const presetOptions = ['short', 'medium', 'long', 'full'] as const;
const localeOptions = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'French', value: 'fr-FR' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Japanese', value: 'ja-JP' }
];

export default function DemoUseTemporalFormat() {
  const currentDateTime = useTemporalDateTime();
  const [date, setDate] = useState(currentDateTime);
  const [formatPreset, setFormatPreset] = useState<'short' | 'medium' | 'long' | 'full'>('medium');
  const [locale, setLocale] = useState('en-US');

  // Use the hook with the proper parameters
  const formattedValue = useTemporalFormat(date, formatPreset, locale);

  return (
    <section className="demo-card">
      <h3>useTemporalFormat</h3>
      <div className="demo-row">
        <b>Date to Format:</b>
        <span className="demo-value">{date.toString()}</span>
        <button onClick={() => setDate(currentDateTime)}>Now</button>
        <button onClick={() => setDate(date.add({ days: 1 }))}>+1 day</button>
        <button onClick={() => setDate(date.subtract({ days: 1 }))}>-1 day</button>
      </div>
      <div className="demo-row">
        <b>Format:</b>
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
        {localeOptions.map(opt => (
          <button
            key={opt.value}
            className={locale === opt.value ? "active" : ""}
            onClick={() => setLocale(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="demo-row">
        <b>Formatted:</b>
        <span className="demo-value">{formattedValue}</span>
      </div>
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Formats a Temporal date/time object using Intl.DateTimeFormat with presets or custom options.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalFormat(date, options, locale)<br/>
            <strong>Parameters:</strong><br/>
            - date: Temporal date/time object to format<br/>
            - options: Format options (presets: 'short', 'medium', 'long', 'full') or Intl.DateTimeFormatOptions<br/>
            - locale: Optional locale string (default: system locale)<br/>
            <strong>Returns:</strong> Formatted date/time string<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useTemporalFormat, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const now = useTemporalDateTime();<br/>
              const formattedDate = useTemporalFormat(now, 'long', 'fr-FR');<br/>
              // Returns date in French long format: '2 mai 2023 à 14:30:00'
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
