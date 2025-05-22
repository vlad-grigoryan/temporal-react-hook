import { useState } from "react";
import "./DemoCard.css";
import useLocaleDateTime from "../../src/useLocaleDateTime";
import useTemporalDateTime from "../../src/useTemporalDateTime";

export default function DemoUseLocaleDateTime() {
  const now = useTemporalDateTime();
  
  // Initialize formatting style and locale state
  const [dateStyle, setDateStyle] = useState<'full'|'long'|'medium'|'short'>('full');
  const [timeStyle, setTimeStyle] = useState<'full'|'long'|'medium'|'short'>('short');
  const [locale, setLocale] = useState<string>('en-US');
  const [useCustomFormatter, setUseCustomFormatter] = useState<boolean>(false);
  const [customFormat, setCustomFormat] = useState<string>('YYYY-MM-DD hh:mm');
  
  // Available locales for demo - same as in DemoUseRelativeTime for consistency
  const availableLocales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ru-RU', name: 'Russian' }
  ];
  
  // Custom formatter function
  const customFormatter = (date: Date, locale: string, originalValue: any) => {
    // Parse the custom format string and replace tokens with actual values
    let result = customFormat;
    
    // Replace year tokens
    result = result.replace('YYYY', originalValue.year.toString().padStart(4, '0'));
    result = result.replace('YY', originalValue.year.toString().slice(-2));
    
    // Replace month tokens with locale-aware month names if requested
    if (result.includes('MMMM')) {
      // Full month name (e.g., "January")
      const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
      result = result.replace('MMMM', monthName);
    } else if (result.includes('MMM')) {
      // Short month name (e.g., "Jan")
      const monthName = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
      result = result.replace('MMM', monthName);
    } else {
      // Numeric month
      result = result.replace('MM', originalValue.month.toString().padStart(2, '0'));
      result = result.replace('M', originalValue.month.toString());
    }
    
    // Replace day tokens with locale-aware day names if requested
    if (result.includes('DDDD')) {
      // Full day name (e.g., "Monday")
      const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
      result = result.replace('DDDD', dayName);
    } else if (result.includes('DDD')) {
      // Short day name (e.g., "Mon")
      const dayName = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
      result = result.replace('DDD', dayName);
    } else {
      // Numeric day
      result = result.replace('DD', originalValue.day.toString().padStart(2, '0'));
      result = result.replace('D', originalValue.day.toString());
    }
    
    // Replace hour tokens
    result = result.replace('hh', originalValue.hour.toString().padStart(2, '0'));
    result = result.replace('h', originalValue.hour.toString());
    
    // Replace minute tokens
    result = result.replace('mm', originalValue.minute.toString().padStart(2, '0'));
    result = result.replace('m', originalValue.minute.toString());
    
    // Replace second tokens
    result = result.replace('ss', originalValue.second.toString().padStart(2, '0'));
    result = result.replace('s', originalValue.second.toString());
    
    // Add locale-specific date separator if TOKEN is present
    const dateFormatParts = new Intl.DateTimeFormat(locale).formatToParts(date);
    const dateSeparator = dateFormatParts.find(part => part.type === 'literal')?.value || '/';
    result = result.replace('/DATE/', dateSeparator);
    
    return result;
  };
  
  // Format the current date and time with either standard options or custom formatter
  const getFormatted = (value: any) => {
    if (useCustomFormatter) {
      return useLocaleDateTime(value, locale, customFormatter);
    } else {
      // Explicitly type the options object to match Intl.DateTimeFormatOptions
      const options: Intl.DateTimeFormatOptions = { 
        dateStyle, 
        timeStyle 
      };
      return useLocaleDateTime(value, locale, options);
    }
  };
  
  // Create examples with different date/time combinations
  const examples = {
    current: getFormatted(now),
    yesterday: getFormatted(now.subtract({ days: 1 })),
    lastWeek: getFormatted(now.subtract({ weeks: 1 })),
    nextMonth: getFormatted(now.add({ months: 1 }))
  };
  
  return (
    <section className="demo-card">
      <h3>useLocaleDateTime</h3>
      
      {/* Configuration controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Formatter Type:</span>
          <select 
            value={useCustomFormatter ? 'custom' : 'standard'} 
            onChange={(e) => setUseCustomFormatter(e.target.value === 'custom')}
          >
            <option value="standard">Standard (Intl.DateTimeFormat)</option>
            <option value="custom">Custom Formatter</option>
          </select>
        </div>
        
        {useCustomFormatter ? (
          <div className="demo-config-row">
            <span>Format Pattern:</span>
            <input 
              type="text" 
              value={customFormat} 
              onChange={(e) => setCustomFormat(e.target.value)}
              placeholder="YYYY-MM-DD hh:mm:ss"
              className="demo-input"
            />
            <div className="demo-format-help">
              <small>YYYY: year, MM: month, DD: day, hh: hour, mm: minute, ss: second</small>
            </div>
          </div>
        ) : (
          <>
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
              <span>Date Style:</span>
              <select 
                value={dateStyle} 
                onChange={e => setDateStyle(e.target.value as 'full'|'long'|'medium'|'short')}
              >
                <option value="full">Full</option>
                <option value="long">Long</option>
                <option value="medium">Medium</option>
                <option value="short">Short</option>
              </select>
            </div>
            <div className="demo-config-row">
              <span>Time Style:</span>
              <select 
                value={timeStyle} 
                onChange={e => setTimeStyle(e.target.value as 'full'|'long'|'medium'|'short')}
              >
                <option value="full">Full</option>
                <option value="long">Long</option>
                <option value="medium">Medium</option>
                <option value="short">Short</option>
              </select>
            </div>
          </>
        )}
      </div>
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Current:</span>
          <span className="demo-value">{examples.current}</span>
        </div>
        <div className="demo-config-row">
          <span>Yesterday:</span>
          <span className="demo-value">{examples.yesterday}</span>
        </div>
        <div className="demo-config-row">
          <span>Last Week:</span>
          <span className="demo-value">{examples.lastWeek}</span>
        </div>
        <div className="demo-config-row">
          <span>Next Month:</span>
          <span className="demo-value">{examples.nextMonth}</span>
        </div>
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useLocaleDateTime hook formats a Temporal date/time object as a localized string using the provided locale and
            Intl.DateTimeFormat options. It now supports custom formatting functions for complete flexibility.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useLocaleDateTime(dateTime, locale?, options?)<br/>
            <strong>Parameters:</strong><br/>
            &nbsp;&nbsp;• <strong>dateTime</strong>: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            &nbsp;&nbsp;• <strong>locale?</strong>: Optional string specifying the locale (e.g., 'en-US', 'fr-FR')<br/>
            &nbsp;&nbsp;• <strong>options?</strong>: Either Intl.DateTimeFormatOptions OR a custom formatter function<br/>
            <strong>Returns:</strong> A formatted string based on locale and options/formatter<br/>
            <strong>Example with standard options:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useLocaleDateTime, useTemporalDateTime } from 'temporal-react-hook';

// Get the current date and time
const now = useTemporalDateTime();

// Format with locale and standard options
const formatted = useLocaleDateTime(now, 'en-US', { 
  dateStyle: 'full', 
  timeStyle: 'short' 
});
// Output example: "Monday, January 1, 2024 at 12:00 PM"`}</pre>
            </code>
            <br/>
            <strong>Example with custom formatter:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useLocaleDateTime, useTemporalDateTime } from 'temporal-react-hook';

// Get the current date and time
const now = useTemporalDateTime();

// Format with a custom formatter function
const formatted = useLocaleDateTime(now, 'en-US', 
  (date, locale, originalValue) => {
    return "Year: " + originalValue.year + ", Month: " + originalValue.month;
  }
);
// Output example: "Year: 2024, Month: 5"`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
