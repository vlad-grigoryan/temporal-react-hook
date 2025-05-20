import { useState, useEffect } from "react";
import "./DemoCard.css";
import useRelativeTime from "../../src/useRelativeTime";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseRelativeTime() {
  // Use our hook to get the current date and time 
  const now = useTemporalDateTime();
  
  // Create a selection of dates at different points in time
  const [timePoints, setTimePoints] = useState(() => ({
    justNow: now.subtract({ seconds: 30 }),
    minutes: now.subtract({ minutes: 5 }),
    hours: now.subtract({ hours: 3 }),
    days: now.subtract({ days: 2 }),
    weeks: now.subtract({ weeks: 2 }),
    months: now.subtract({ months: 3 }),
    years: now.subtract({ years: 1 }),
    future: now.add({ hours: 6 })
  }));
  
  // Update time points every 30 seconds to keep them relative to current time
  useEffect(() => {
    const updateTimePoints = () => {
      // Get the current time from the top-level component state
      setTimePoints({
        justNow: now.subtract({ seconds: 30 }),
        minutes: now.subtract({ minutes: 5 }),
        hours: now.subtract({ hours: 3 }),
        days: now.subtract({ days: 2 }),
        weeks: now.subtract({ weeks: 2 }),
        months: now.subtract({ months: 3 }),
        years: now.subtract({ years: 1 }),
        future: now.add({ hours: 6 })
      });
    };
    
    const interval = setInterval(updateTimePoints, 30000);
    return () => clearInterval(interval);
  }, [now]); // Add now as a dependency
  
  // Initialize formatting style and locale state
  const [formatStyle, setFormatStyle] = useState<'long' | 'short' | 'narrow'>('long');
  const [locale, setLocale] = useState<string>('en-US');
  
  // Available locales for demo
  const availableLocales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ru-RU', name: 'Russian' }
  ];
  
  // Format all the different time points with the selected style and locale
  const formattedTimes = {
    justNow: useRelativeTime(timePoints.justNow, { style: formatStyle, locale }),
    minutes: useRelativeTime(timePoints.minutes, { style: formatStyle, locale }),
    hours: useRelativeTime(timePoints.hours, { style: formatStyle, locale }),
    days: useRelativeTime(timePoints.days, { style: formatStyle, locale }),
    weeks: useRelativeTime(timePoints.weeks, { style: formatStyle, locale }),
    months: useRelativeTime(timePoints.months, { style: formatStyle, locale }),
    years: useRelativeTime(timePoints.years, { style: formatStyle, locale }),
    future: useRelativeTime(timePoints.future, { style: formatStyle, locale })
  };
  
  return (
    <section className="demo-card">
      <h3>useRelativeTime</h3>
      
      {/* Configuration controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Formatting Style:</span>
          <select 
            value={formatStyle} 
            onChange={(e) => setFormatStyle(e.target.value as 'long' | 'short' | 'narrow')}
          >
            <option value="long">Long (3 minutes ago)</option>
            <option value="short">Short (3 min ago)</option>
            <option value="narrow">Narrow (3m)</option>
          </select>
        </div>
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
      </div>
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Just Now:</span>
          <span className="demo-value">{formattedTimes.justNow}</span>
        </div>
        <div className="demo-config-row">
          <span>Minutes:</span>
          <span className="demo-value">{formattedTimes.minutes}</span>
        </div>
        <div className="demo-config-row">
          <span>Hours:</span>
          <span className="demo-value">{formattedTimes.hours}</span>
        </div>
        <div className="demo-config-row">
          <span>Days:</span>
          <span className="demo-value">{formattedTimes.days}</span>
        </div>
        <div className="demo-config-row">
          <span>Weeks:</span>
          <span className="demo-value">{formattedTimes.weeks}</span>
        </div>
        <div className="demo-config-row">
          <span>Months:</span>
          <span className="demo-value">{formattedTimes.months}</span>
        </div>
        <div className="demo-config-row">
          <span>Years:</span>
          <span className="demo-value">{formattedTimes.years}</span>
        </div>
        <div className="demo-config-row">
          <span>Future:</span>
          <span className="demo-value">{formattedTimes.future}</span>
        </div>
      </div>
      
      {/* Actual times display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Just Now (actual):</span>
          <span className="demo-value">{timePoints.justNow.toString()}</span>
        </div>
        <div className="demo-config-row">
          <span>Minutes (actual):</span>
          <span className="demo-value">{timePoints.minutes.toString()}</span>
        </div>
        <div className="demo-config-row">
          <span>Hours (actual):</span>
          <span className="demo-value">{timePoints.hours.toString()}</span>
        </div>
        <div className="demo-config-row">
          <span>Days (actual):</span>
          <span className="demo-value">{timePoints.days.toString()}</span>
        </div>
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useRelativeTime hook returns a human-friendly string representing how much time has passed since (or until) a given date/time.
            It automatically updates at appropriate intervals and supports different formatting styles.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useRelativeTime(dateTime, options?)<br/>
            <strong>Parameters:</strong><br/>
            &nbsp;&nbsp;• <strong>dateTime</strong>: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            &nbsp;&nbsp;• <strong>options?</strong>: Optional configuration object:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>refreshIntervalMs</strong>: How often to refresh the relative time (default: 10000ms)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>locale</strong>: Locale for formatting (e.g., 'en-US', 'fr-FR', 'ja-JP')<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- <strong>style</strong>: Formatting style - 'long', 'short', or 'narrow'<br/>
            <strong>Returns:</strong> A human-friendly string representing relative time<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useRelativeTime, useTemporalDateTime } from 'temporal-react-hook';

// Basic usage
const now = useTemporalDateTime();
const pastTime = now.subtract({ hours: 3 });
const relativeTime = useRelativeTime(pastTime);

// With options
const shortRelativeTime = useRelativeTime(pastTime, {
  style: 'short',
  refreshIntervalMs: 5000
});`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
