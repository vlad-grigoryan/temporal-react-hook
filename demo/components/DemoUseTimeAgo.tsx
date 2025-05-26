import { useMemo, useState } from "react";
import "./DemoCard.css";
import useTimeAgo from "../../src/useTimeAgo";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseTimeAgo() {
  const now = useTemporalDateTime();
  const [refreshInterval, setRefreshInterval] = useState<number>(10000);
  const [locale, setLocale] = useState<string>('en-US');
  const [style, setStyle] = useState<'long' | 'short' | 'narrow'>('long');
  const [numeric, setNumeric] = useState<'always' | 'auto'>('always');
  const [maxDays, setMaxDays] = useState<number>(30);
  const [withoutSuffix, setWithoutSuffix] = useState<boolean>(false);
  const [useCalendarFormat, setUseCalendarFormat] = useState<boolean>(false);
  const [useCustomReference, setUseCustomReference] = useState<boolean>(false);
  const [customReferenceOffset, setCustomReferenceOffset] = useState<number>(0);
  
  // Calculate a custom reference time if enabled
  const customReferenceTime = useMemo(() => {
    if (!useCustomReference) return undefined;
    return now.add({ days: customReferenceOffset });
  }, [now, useCustomReference, customReferenceOffset]);
  
  // Sample dates for demonstration
  const samples = useMemo(() => [
    { label: '30 seconds ago', date: now.subtract({ seconds: 30 }) },
    { label: '5 minutes ago',  date: now.subtract({ minutes: 5 }) },
    { label: '2 hours ago',    date: now.subtract({ hours: 2 }) },
    { label: '1 day ago',      date: now.subtract({ days: 1 }) },
    { label: '3 days ago',     date: now.subtract({ days: 3 }) },
    { label: '2 weeks ago',    date: now.subtract({ weeks: 2 }) },
    { label: '1 month ago',    date: now.subtract({ months: 1 }) },
    { label: '1 year ago',     date: now.subtract({ years: 1 }) },
    { label: 'in 5 minutes',   date: now.add({ minutes: 5 }) },
    { label: 'in 1 day',       date: now.add({ days: 1 }) },
  ], [now]);

  // Available refresh intervals
  const refreshOptions = [
    { value: 1000, label: '1 second' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
  ];
  
  // Available locales for demo
  const availableLocales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
  ];

  return (
    <section className="demo-card">
      <h3>useTimeAgo</h3>
      
      {/* Configuration panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Locale:</span>
          <select 
            value={locale} 
            onChange={(e) => setLocale(e.target.value)}
          >
            {availableLocales.map(loc => (
              <option key={loc.code} value={loc.code}>{loc.name}</option>
            ))}
          </select>
        </div>
        
        <div className="demo-config-row">
          <span>Style:</span>
          <select 
            value={style} 
            onChange={(e) => setStyle(e.target.value as 'long' | 'short' | 'narrow')}
          >
            <option value="long">Long (e.g., "2 days ago")</option>
            <option value="short">Short (e.g., "2 days ago")</option>
            <option value="narrow">Narrow (e.g., "2d ago")</option>
          </select>
        </div>
        
        <div className="demo-config-row">
          <span>Numeric Format:</span>
          <select 
            value={numeric} 
            onChange={(e) => setNumeric(e.target.value as 'always' | 'auto')}
          >
            <option value="always">Always (e.g., "2 days ago")</option>
            <option value="auto">Auto (e.g., "yesterday")</option>
          </select>
        </div>
        
        <div className="demo-config-row">
          <span>Without Suffix:</span>
          <input 
            type="checkbox" 
            checked={withoutSuffix}
            onChange={(e) => setWithoutSuffix(e.target.checked)}
          />
          <span className="option-description">(Remove "ago" or "in" from output)</span>
        </div>
        
        <div className="demo-config-row">
          <span>Use Calendar Format:</span>
          <input 
            type="checkbox" 
            checked={useCalendarFormat}
            onChange={(e) => setUseCalendarFormat(e.target.checked)}
          />
          <span className="option-description">(Show "yesterday", "today", "tomorrow")</span>
        </div>
        
        <div className="demo-config-row">
          <span>Use Custom Reference Time:</span>
          <input 
            type="checkbox" 
            checked={useCustomReference}
            onChange={(e) => setUseCustomReference(e.target.checked)}
          />
        </div>
        
        {useCustomReference && (
          <div className="demo-config-row">
            <span>Reference Time Offset (days):</span>
            <input 
              type="range" 
              min="-30" 
              max="30" 
              value={customReferenceOffset}
              onChange={(e) => setCustomReferenceOffset(Number(e.target.value))}
            />
            <span>{customReferenceOffset} days {customReferenceOffset > 0 ? 'in future' : customReferenceOffset < 0 ? 'in past' : '(now)'}</span>
          </div>
        )}
        
        <div className="demo-config-row">
          <span>Max Days Threshold:</span>
          <select 
            value={maxDays.toString()} 
            onChange={(e) => setMaxDays(Number(e.target.value))}
          >
            <option value="7">1 week</option>
            <option value="30">1 month</option>
            <option value="90">3 months</option>
            <option value="365">1 year</option>
            <option value="730">2 years</option>
          </select>
        </div>
        
        <div className="demo-config-row">
          <span>Refresh Interval:</span>
          <select 
            value={refreshInterval} 
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
          >
            {refreshOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Results display */}
      <div className="demo-config-panel">
        {samples.map(({ label, date }) => {
          // Use the hook with all the configured options
          const display = useTimeAgo(date, refreshInterval, {
            locale,
            style,
            numeric,
            maxDays,
            withoutSuffix,
            useCalendarFormat,
            referenceTime: customReferenceTime
          });
          
          return (
            <div key={label} className="demo-config-row">
              <span>{label}:</span>
              <span className="demo-value">{display}</span>
            </div>
          );
        })}
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useTimeAgo hook provides a live-updating, internationalized "time ago" string for both past and future dates.
            It uses the browser's Intl.RelativeTimeFormat API to generate localized strings in various languages and formats.
            The hook automatically refreshes at the specified interval to keep the displayed time accurate.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTimeAgo(dateTime, refreshIntervalMs?, options?)<br/>
            <strong>Parameters:</strong><br/>
            &nbsp;&nbsp;• <strong>dateTime</strong>: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            &nbsp;&nbsp;• <strong>refreshIntervalMs?</strong>: Optional refresh interval in milliseconds (default: 10000)<br/>
            &nbsp;&nbsp;• <strong>options?</strong>: Optional configuration object with the following properties:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>locale</strong>: String or array of locale identifiers (e.g., 'en-US', 'fr-FR')<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>style</strong>: Format style - 'long', 'short', or 'narrow'<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>numeric</strong>: Whether to always show numeric values ('always') or use words when possible ('auto')<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>maxDays</strong>: Maximum days to show as relative time before falling back to date format<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>withoutSuffix</strong>: Whether to omit the suffix/prefix (e.g., "ago" or "in")<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>useCalendarFormat</strong>: Whether to use calendar-relative formatting when possible<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>referenceTime</strong>: Custom reference time to compare against instead of "now"<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>fallbackFormatter</strong>: Custom function to format dates beyond the maxDays threshold<br/>
            <strong>Returns:</strong> A formatted, localized "time ago" string that updates automatically<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useTimeAgo, useTemporalDateTime } from 'temporal-react-hook';

// Get the current date and time
const now = useTemporalDateTime();

// Create a time 5 minutes in the past
const fiveMinAgo = now.subtract({ minutes: 5 });

// Get a localized, live-updating time ago string with custom options
const timeAgo = useTimeAgo(fiveMinAgo, 5000, {
  locale: 'fr-FR',
  style: 'long',
  numeric: 'always',
  maxDays: 30,
  withoutSuffix: false,
  useCalendarFormat: true
});
// Output example: "il y a 5 minutes"`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
