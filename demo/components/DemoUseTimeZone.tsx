import { useState, useEffect } from "react";
import "./DemoCard.css";
import useTimeZone from "../../src/useTimeZone";
import useCurrentDateTime from "../../src/useCurrentDateTime";
import useTemporalFormat from "../../src/useTemporalFormat";
import { Temporal } from "@js-temporal/polyfill";

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
  const now = useCurrentDateTime();
  const [targetZone, setTargetZone] = useState("Europe/London");
  const [customZone, setCustomZone] = useState("");
  const [error, setError] = useState("");
  
  // Format the current date/time for nicer display
  const formattedLocalTime = useTemporalFormat(now, 'medium');
  
  // Store conversion result
  const [convertedDateTime, setConvertedDateTime] = useState<Temporal.ZonedDateTime | null>(null);
  
  // Perform the conversion when targetZone or now changes
  useEffect(() => {
    // Validate time zone whenever targetZone changes
    if (!isValidTimeZone(targetZone)) {
      setError(`Invalid time zone: "${targetZone}"`);
      setConvertedDateTime(null);
      return;
    }
    
    try {
      const converted = convertToTimeZone(now, targetZone);
      setConvertedDateTime(converted);
      setError("");
    } catch (e) {
      setError(`Conversion error: ${e instanceof Error ? e.message : String(e)}`);
      setConvertedDateTime(null);
    }
  }, [targetZone, now]);
  
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
  const formatDateTime = (dateTime: Temporal.ZonedDateTime | null): string => {
    if (!dateTime) return '';
    
    // Format using Temporal's built-in formatting capabilities
    try {
      return dateTime.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'medium',
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return '';
    }
  };

  return (
    <section className="demo-card">
      <h3>useTimeZone</h3>
      
      <div className="demo-row">
        <b>Local Time Zone:</b>
        <span className="demo-value">{timeZone}</span>
      </div>
      
      <div className="demo-row">
        <b>Current Local Time:</b>
        <span className="demo-value">{formattedLocalTime}</span>
      </div>
      
      <div className="demo-row">
        <b>Target Time Zone:</b>
        <select 
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
        <div className="demo-row">
          <input
            type="text"
            value={customZone}
            onChange={handleCustomZoneChange}
            placeholder="Enter IANA Time Zone (e.g., Asia/Kolkata)"
            style={{ borderColor: error ? '#ff6b6b' : undefined }}
          />
          <button onClick={applyCustomZone} style={{ marginLeft: 8 }}>Apply</button>
        </div>
      )}
      
      <div className="demo-row">
        <b>Converted Time:</b> 
        <span className="demo-value" style={{ color: error ? '#ff6b6b' : undefined }}>
          {error || (convertedDateTime ? `${formatDateTime(convertedDateTime)} (${targetZone})` : '')}
        </span>
      </div>
      
      {convertedDateTime && !error && (
        <div className="demo-row">
          <b>Time Difference:</b>
          <span className="demo-value">
            {getTimeDifference(timeZone, targetZone)}
          </span>
        </div>
      )}
      
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>The useTimeZone hook provides the current time zone and a function to convert a given date-time to a different time zone using the Temporal API.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTimeZone()<br/>
            <strong>Parameters:</strong> None<br/>
            <strong>Returns:</strong> An object containing:<br/>
            - timeZone: The current time zone name (string)<br/>
            - convertToTimeZone: A function to convert a Temporal datetime to a different time zone<br/>
            <strong>Example:</strong>
              <code>
                import &#123; useTimeZone, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
                <br/>
                // Get the current time zone and converter function<br/>
                const &#123; timeZone, convertToTimeZone &#125; = useTimeZone();<br/>
                const now = useCurrentDateTime();<br/>
                <br/>
                // Convert current datetime to London time<br/>
                const londonTime = convertToTimeZone(now, "Europe/London");<br/>
                <br/>
                // Use the timeZone value in your UI<br/>
                console.log(`Your current time zone is: ${timeZone}`);
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
