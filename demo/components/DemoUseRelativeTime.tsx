import { useState, useEffect } from "react";
import "./DemoCard.css";
import useRelativeTime from "../../src/useRelativeTime";
import useCurrentDateTime from "../../src/useCurrentDateTime";

// Add a custom stylesheet for the component
const styles = {
  demoControls: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
  },
  formatSelector: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  formatSelect: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  demoTimesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  demoTimeItem: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "4px",
    padding: "10px",
  },
  timeLabel: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  timeValue: {
    color: "#0066cc",
    fontSize: "1.2em",
    marginBottom: "5px",
  },
  timeActual: {
    fontSize: "0.8em",
    color: "#666",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
};

export default function DemoUseRelativeTime() {
  // Use our hook to get the current date and time 
  const now = useCurrentDateTime();
  
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
      
      <div style={styles.demoControls}>
        <div style={styles.formatSelector}>
          <label>Formatting Style: </label>
          <select 
            value={formatStyle} 
            onChange={(e) => setFormatStyle(e.target.value as 'long' | 'short' | 'narrow')}
            style={styles.formatSelect}
          >
            <option value="long">Long (3 minutes ago)</option>
            <option value="short">Short (3 min ago)</option>
            <option value="narrow">Narrow (3m)</option>
          </select>
        </div>
      </div>
      
      <div style={styles.demoTimesGrid}>
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Just Now:</div>
          <div style={styles.timeValue}>{formattedTimes.justNow}</div>
          <div style={styles.timeActual}>{timePoints.justNow.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Minutes:</div>
          <div style={styles.timeValue}>{formattedTimes.minutes}</div>
          <div style={styles.timeActual}>{timePoints.minutes.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Hours:</div>
          <div style={styles.timeValue}>{formattedTimes.hours}</div>
          <div style={styles.timeActual}>{timePoints.hours.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Days:</div>
          <div style={styles.timeValue}>{formattedTimes.days}</div>
          <div style={styles.timeActual}>{timePoints.days.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Weeks:</div>
          <div style={styles.timeValue}>{formattedTimes.weeks}</div>
          <div style={styles.timeActual}>{timePoints.weeks.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Months:</div>
          <div style={styles.timeValue}>{formattedTimes.months}</div>
          <div style={styles.timeActual}>{timePoints.months.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Years:</div>
          <div style={styles.timeValue}>{formattedTimes.years}</div>
          <div style={styles.timeActual}>{timePoints.years.toString()}</div>
        </div>
        
        <div style={styles.demoTimeItem}>
          <div style={styles.timeLabel}>Future:</div>
          <div style={styles.timeValue}>{formattedTimes.future}</div>
          <div style={styles.timeActual}>{timePoints.future.toString()}</div>
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
              import &#123; useRelativeTime, useCurrentDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              // Basic usage<br/>
              const now = useCurrentDateTime();<br/>
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
