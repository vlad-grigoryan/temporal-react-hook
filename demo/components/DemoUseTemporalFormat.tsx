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

// Define dynamic formatting rules
const dynamicFormatRules = {
  recent: {
    format: { dateStyle: 'medium' as const, timeStyle: 'medium' as const },
    threshold: { minutes: 5 } // Duration will be created inside the hook
  },
  today: {
    format: { timeStyle: 'short' as const }
  },
  thisWeek: {
    format: { weekday: 'short' as const, hour: 'numeric' as const, minute: 'numeric' as const }
  },
  thisMonth: {
    format: { month: 'short' as const, day: 'numeric' as const, hour: 'numeric' as const }
  },
  thisYear: {
    format: { month: 'long' as const, day: 'numeric' as const }
  },
  older: {
    format: { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const }
  }
};

export default function DemoUseTemporalFormat() {
  const currentDateTime = useTemporalDateTime();
  const [date, setDate] = useState(currentDateTime);
  const [formatPreset, setFormatPreset] = useState<'short' | 'medium' | 'long' | 'full'>('medium');
  const [useDynamic, setUseDynamic] = useState(false);
  const [locale, setLocale] = useState('en-US');

  // Use the hook with the proper parameters
  const formattedValue = useTemporalFormat(
    date,
    useDynamic ? { dynamic: dynamicFormatRules } : formatPreset,
    locale
  );

  return (
    <section className="demo-card">
      <h3>useTemporalFormat</h3>
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Date to Format:</b>
          <span className="demo-value">{date.toString()}</span>
          <button onClick={() => setDate(currentDateTime)}>Now</button>
          <button onClick={() => setDate(date.add({ days: 1 }))}>+1 day</button>
          <button onClick={() => setDate(date.subtract({ days: 1 }))}>-1 day</button>
        </div>
      </div>
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Format Mode:</b>
          <button
            className={!useDynamic ? "active" : ""}
            onClick={() => setUseDynamic(false)}
          >
            Preset
          </button>
          <button
            className={useDynamic ? "active" : ""}
            onClick={() => setUseDynamic(true)}
          >
            Dynamic
          </button>
        </div>
      </div>
      {!useDynamic && (
        <div className="demo-config-panel">
          <div className="demo-config-row">
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
        </div>
      )}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Locale:</b>
          <select
            value={locale}
            onChange={e => setLocale(e.target.value)}
            className="demo-input-compact demo-input-margin"
          >
            {localeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <b>Formatted:</b>
          <span className="demo-value">{formattedValue}</span>
        </div>
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
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useTemporalFormat, useTemporalDateTime } from 'temporal-react-hook';

// Basic usage with preset
const now = useTemporalDateTime();
const formattedDate = useTemporalFormat(now, 'long', 'fr-FR');
// Returns date in French long format: '2 mai 2023 à 14:30:00'

// Dynamic formatting based on temporal distance
const dynamicDate = useTemporalFormat(now, {
  dynamic: {
    recent: {
      format: { dateStyle: 'medium', timeStyle: 'medium' },
      threshold: { minutes: 5 }
    },
    today: { format: { timeStyle: 'short' } },
    thisWeek: { format: { weekday: 'short', hour: 'numeric' } },
    older: { format: { year: 'numeric', month: 'short', day: 'numeric' } }
  }
});`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
