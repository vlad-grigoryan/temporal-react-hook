import { useState, useEffect } from "react";
import "./DemoCard.css";
import useRelativeTime from "../../src/useRelativeTime";
import useTemporalDateTime from "../../src/useTemporalDateTime.ts";

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
  
  // Initialize formatting style state
  const [formatStyle, setFormatStyle] = useState<'long' | 'short' | 'narrow'>('long');
  
  // Format all the different time points with the selected style
  const formattedTimes = {
    justNow: useRelativeTime(timePoints.justNow, { style: formatStyle }),
    minutes: useRelativeTime(timePoints.minutes, { style: formatStyle }),
    hours: useRelativeTime(timePoints.hours, { style: formatStyle }),
    days: useRelativeTime(timePoints.days, { style: formatStyle }),
    weeks: useRelativeTime(timePoints.weeks, { style: formatStyle }),
    months: useRelativeTime(timePoints.months, { style: formatStyle }),
    years: useRelativeTime(timePoints.years, { style: formatStyle }),
    future: useRelativeTime(timePoints.future, { style: formatStyle })
  };
  
  return (
    <section className="demo-card">
      <h3>useRelativeTime</h3>
      
      <div className="demo-controls">
        <div className="format-selector">
          <label>Formatting Style: </label>
          <select 
            value={formatStyle} 
            onChange={(e) => setFormatStyle(e.target.value as 'long' | 'short' | 'narrow')}
            className="format-select"
          >
            <option value="long">Long (3 minutes ago)</option>
            <option value="short">Short (3 min ago)</option>
            <option value="narrow">Narrow (3m)</option>
          </select>
        </div>
      </div>
      
      <div className="demo-times-grid">
        <div className="demo-time-item">
          <div className="time-label">Just Now:</div>
          <div className="time-value">{formattedTimes.justNow}</div>
          <div className="time-actual">{timePoints.justNow.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Minutes:</div>
          <div className="time-value">{formattedTimes.minutes}</div>
          <div className="time-actual">{timePoints.minutes.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Hours:</div>
          <div className="time-value">{formattedTimes.hours}</div>
          <div className="time-actual">{timePoints.hours.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Days:</div>
          <div className="time-value">{formattedTimes.days}</div>
          <div className="time-actual">{timePoints.days.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Weeks:</div>
          <div className="time-value">{formattedTimes.weeks}</div>
          <div className="time-actual">{timePoints.weeks.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Months:</div>
          <div className="time-value">{formattedTimes.months}</div>
          <div className="time-actual">{timePoints.months.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Years:</div>
          <div className="time-value">{formattedTimes.years}</div>
          <div className="time-actual">{timePoints.years.toString()}</div>
        </div>
        
        <div className="demo-time-item">
          <div className="time-label">Future:</div>
          <div className="time-value">{formattedTimes.future}</div>
          <div className="time-actual">{timePoints.future.toString()}</div>
        </div>
      </div>
      
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
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or Instant)<br/>
            - options?: Optional configuration object:<br/>
            &nbsp;&nbsp;&nbsp; - refreshIntervalMs: How often to refresh the relative time (default: 10000ms)<br/>
            &nbsp;&nbsp;&nbsp; - locale: Locale for formatting (default: browser locale)<br/>
            &nbsp;&nbsp;&nbsp; - style: Formatting style - 'long', 'short', or 'narrow'<br/>
            <strong>Returns:</strong> A human-friendly string representing relative time<br/>
            <strong>Example:</strong>
            <code>
              import &#123; useRelativeTime, useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              // Basic usage<br/>
              const now = useTemporalDateTime();<br/>
              const pastTime = now.subtract(&#123; hours: 3 &#125;);<br/>
              const relativeTime = useRelativeTime(pastTime);<br/><br/>
              // With options<br/>
              const shortRelativeTime = useRelativeTime(pastTime, &#123;<br/>
              &nbsp;&nbsp;style: 'short',<br/>
              &nbsp;&nbsp;refreshIntervalMs: 5000<br/>
              &#125;);
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
