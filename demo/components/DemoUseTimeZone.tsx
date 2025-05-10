import { useState, useEffect } from "react";
import "./DemoCard.css";
import useTimeZone, { ConversionOptions } from "../../src/useTimeZone";
import useTemporalFormat from "../../src/useTemporalFormat";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalDateTime from "../../src/useTemporalDateTime.ts";

// Common time zones for easy selection
const commonTimeZones = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
  "Pacific/Auckland"
];

// Helper function to validate a time zone
const isValidTimeZone = (timeZone: string): boolean => {
  try {
    // Use Intl.DateTimeFormat to validate the time zone
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch (e) {
    return false;
  }
};

export default function DemoUseTimeZone() {
  const { timeZone, convertToTimeZone } = useTimeZone();
  const now = useTemporalDateTime();
  
  // Configuration state
  const [targetZone, setTargetZone] = useState("Europe/London");
  const [customZone, setCustomZone] = useState("");
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    outputFormat: 'zoned',
    preserveWallTime: false,
    formatOptions: { dateStyle: 'medium', timeStyle: 'medium' }
  });
  
  // Error state
  const [error, setError] = useState("");
  
  // Format the current date/time for nicer display
  const formattedLocalTime = useTemporalFormat(now, 'medium');
  
  // Store conversion result
  const [convertedDateTime, setConvertedDateTime] = useState<any>(null);
  
  // Perform the conversion when targetZone, now, or conversion options change
  useEffect(() => {
    // Validate time zone whenever targetZone changes
    if (!isValidTimeZone(targetZone)) {
      setError(`Invalid time zone: "${targetZone}"`);
      setConvertedDateTime(null);
      return;
    }
    
    try {
      const converted = convertToTimeZone(now, targetZone, conversionOptions);
      setConvertedDateTime(converted);
      setError("");
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : String(e)}`);
      setConvertedDateTime(null);
    }
  }, [targetZone, now, conversionOptions]);
  
  // Update the time zone (either from dropdown or custom input)
  const handleTimeZoneChange = (zone: string) => {
    setTargetZone(zone);
    setCustomZone("");
  };
  
  const handleCustomZoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomZone(e.target.value);
  };
  
  const applyCustomZone = () => {
    if (customZone.trim()) {
      setTargetZone(customZone.trim());
    }
  };

  // Safe format function that doesn't use hooks
  const formatDateTime = (dateTime: any | null): string => {
    if (!dateTime) return '';
    
    try {
      // Handle different output formats
      if (typeof dateTime === 'string') {
        // Already formatted string from 'string' outputFormat
        return dateTime;
      } else if (dateTime instanceof Temporal.ZonedDateTime) {
        return `${dateTime.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'medium',
        })} (${dateTime.timeZoneId})`;
      } else if (dateTime instanceof Temporal.PlainDateTime) {
        return dateTime.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }) + ' (wall time)';
      } else if (dateTime instanceof Temporal.Instant) {
        return dateTime.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }) + ' (UTC)';
      } else {
        return String(dateTime);
      }
    } catch (e) {
      console.error("Error formatting date:", e);
      return String(dateTime) || '';
    }
  };

  return (
    <section className="demo-card">
      <h3>useTimeZone</h3>
      
      {/* Configuration controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Target Time Zone:</span>
          <select 
            className="demo-select"
            value={commonTimeZones.includes(targetZone) ? targetZone : "custom"} 
            onChange={(e) => e.target.value !== "custom" && handleTimeZoneChange(e.target.value)}
          >
            {commonTimeZones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
            {!commonTimeZones.includes(targetZone) && !error && (
              <option value="custom">{targetZone}</option>
            )}
            <option value="custom">Custom...</option>
          </select>
        </div>
        
        {(customZone || !commonTimeZones.includes(targetZone)) && (
          <div className="demo-config-row">
            <input
              type="text"
              value={customZone}
              onChange={handleCustomZoneChange}
              placeholder="Enter IANA Time Zone (e.g., Asia/Kolkata)"
              className={error ? "demo-error-border" : undefined}
            />
            <button onClick={applyCustomZone} className="demo-btn-margin demo-select-btn">
              Apply
            </button>
          </div>
        )}
        
        <div className="demo-config-row">
          <span>Output Format:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${conversionOptions.outputFormat === 'zoned' ? 'active' : ''}`}
              onClick={() => setConversionOptions(prev => ({ ...prev, outputFormat: 'zoned' }))}
            >
              ZonedDateTime
            </button>
            <button 
              className={`demo-select-btn ${conversionOptions.outputFormat === 'plain' ? 'active' : ''}`}
              onClick={() => setConversionOptions(prev => ({ ...prev, outputFormat: 'plain' }))}
            >
              PlainDateTime
            </button>
            <button 
              className={`demo-select-btn ${conversionOptions.outputFormat === 'string' ? 'active' : ''}`}
              onClick={() => setConversionOptions(prev => ({ ...prev, outputFormat: 'string' }))}
            >
              Formatted String
            </button>
          </div>
        </div>
        
        <div className="demo-config-row">
          <span>Conversion Mode:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${!conversionOptions.preserveWallTime ? 'active' : ''}`}
              onClick={() => setConversionOptions(prev => ({ ...prev, preserveWallTime: false }))}
            >
              Preserve Instant
            </button>
            <button 
              className={`demo-select-btn ${conversionOptions.preserveWallTime ? 'active' : ''}`}
              onClick={() => setConversionOptions(prev => ({ ...prev, preserveWallTime: true }))}
            >
              Preserve Wall Time
            </button>
          </div>
        </div>
        
        {conversionOptions.outputFormat === 'string' && (
          <div className="demo-config-row">
            <span>Format Style:</span>
            <div className="demo-btn-group">
              <button 
                className={`demo-select-btn ${conversionOptions.formatOptions?.dateStyle === 'short' ? 'active' : ''}`}
                onClick={() => setConversionOptions(prev => ({ 
                  ...prev, 
                  formatOptions: { ...prev.formatOptions, dateStyle: 'short', timeStyle: 'short' } 
                }))}
              >
                Short
              </button>
              <button 
                className={`demo-select-btn ${conversionOptions.formatOptions?.dateStyle === 'medium' ? 'active' : ''}`}
                onClick={() => setConversionOptions(prev => ({ 
                  ...prev, 
                  formatOptions: { ...prev.formatOptions, dateStyle: 'medium', timeStyle: 'medium' } 
                }))}
              >
                Medium
              </button>
              <button 
                className={`demo-select-btn ${conversionOptions.formatOptions?.dateStyle === 'long' ? 'active' : ''}`}
                onClick={() => setConversionOptions(prev => ({ 
                  ...prev, 
                  formatOptions: { ...prev.formatOptions, dateStyle: 'long', timeStyle: 'long' } 
                }))}
              >
                Long
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Local Time Zone:</span>
          <span className="demo-value">{timeZone}</span>
        </div>
        
        <div className="demo-config-row">
          <span>Current Local Time:</span>
          <span className="demo-value">{formattedLocalTime}</span>
        </div>
        
        <div className="demo-config-row">
          <span>Converted Time:</span>
          <span className={error ? "demo-value demo-error-color" : "demo-value"}>
            {error || (convertedDateTime ? formatDateTime(convertedDateTime) : '')}
          </span>
        </div>
        
        {convertedDateTime && !error && (
          <div className="demo-config-row">
            <span>Time Difference:</span>
            <span className="demo-value">
              {getTimeDifference(timeZone, targetZone)}
            </span>
          </div>
        )}
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useTimeZone hook provides the current time zone and a function to convert a given date-time to a different time zone using the Temporal API.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTimeZone()<br />
            <strong>Parameters:</strong> None<br />
            <strong>Returns:</strong> An object containing:<br />
            - <strong>timeZone</strong>: The current time zone name (string)<br />
            - <strong>convertToTimeZone</strong>: A function to convert a Temporal datetime to a different time zone<br />
            <br />
            <strong>convertToTimeZone Parameters:</strong><br />
            - <strong>dateTime</strong>: The datetime to convert (PlainDateTime, ZonedDateTime, or Instant)<br />
            - <strong>targetTimeZone</strong>: The target time zone (string, IANA format)<br />
            - <strong>options</strong>: Optional configuration object with:<br />
            &nbsp;&nbsp;• <strong>outputFormat</strong>: 'zoned' | 'plain' | 'instant' | 'string' (default: 'zoned')<br />
            &nbsp;&nbsp;• <strong>preserveWallTime</strong>: boolean (default: false)<br />
            &nbsp;&nbsp;• <strong>formatOptions</strong>: Date/time formatting options (for string output)<br />
            &nbsp;&nbsp;• <strong>locale</strong>: Locale for string formatting<br />
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useTimeZone, useTemporalDateTime } from 'temporal-react-hook';

// Get the current time zone and converter function
const { timeZone, convertToTimeZone } = useTimeZone();
const now = useTemporalDateTime();

// Basic conversion (preserves the exact instant in time)
const londonTime = convertToTimeZone(now, "Europe/London");

// Get a formatted string with custom options
const formattedTime = convertToTimeZone(now, "Europe/London", {
  outputFormat: 'string',
  formatOptions: { dateStyle: 'full', timeStyle: 'long' }
});

// Preserve wall-clock time (3:00 PM stays 3:00 PM in new zone)
const sameWallTime = convertToTimeZone(now, "Europe/London", {
  preserveWallTime: true
});

// Use the timeZone value in your UI
console.log(\`Your current time zone is: \${timeZone}\`);`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}

// Helper function to calculate and format time difference between zones
function getTimeDifference(sourceZone: string, targetZone: string): string {
  try {
    if (!isValidTimeZone(sourceZone) || !isValidTimeZone(targetZone)) {
      return "Unable to calculate difference";
    }
    
    // Create a ZonedDateTime instance in both zones at the same instant
    const now = Temporal.Now.instant();
    const sourceTime = now.toZonedDateTimeISO(sourceZone);
    const targetTime = now.toZonedDateTimeISO(targetZone);
    
    // Calculate the offset difference in hours
    const sourceOffset = sourceTime.offset;
    const targetOffset = targetTime.offset;
    
    // Parse the offsets (which are in the format '+HH:MM' or '-HH:MM')
    const sourceHours = parseInt(sourceOffset.slice(0, 3));
    const sourceMinutes = parseInt(sourceOffset.slice(4, 6)) * (sourceOffset.charAt(0) === '-' ? -1 : 1) / 60;
    const targetHours = parseInt(targetOffset.slice(0, 3));
    const targetMinutes = parseInt(targetOffset.slice(4, 6)) * (targetOffset.charAt(0) === '-' ? -1 : 1) / 60;
    
    // Calculate the total difference (including fractional hours)
    const sourceTotalHours = sourceHours + sourceMinutes;
    const targetTotalHours = targetHours + targetMinutes;
    const diffHours = targetTotalHours - sourceTotalHours;
    
    // Format with the appropriate sign
    const sign = diffHours >= 0 ? '+' : '';
    const absHours = Math.abs(diffHours);
    const wholeHours = Math.floor(absHours);
    const minutes = Math.round((absHours - wholeHours) * 60);
    
    if (minutes === 0) {
      return `${sign}${diffHours} hours`;
    } else {
      return `${sign}${wholeHours}h ${minutes}m`;
    }
  } catch (e) {
    return "Unable to calculate difference";
  }
}
