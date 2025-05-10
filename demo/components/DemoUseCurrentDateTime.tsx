import { useState, useMemo } from "react";
import "./DemoCard.css";
import useCurrentDateTime, { UseCurrentDateTimeOptions } from "../../src/useCurrentDateTime";

export default function DemoUseCurrentDateTime() {
  // Configuration state
  const [config, setConfig] = useState<UseCurrentDateTimeOptions>({
    updateInterval: 1000,
    includeMilliseconds: false,
    updateOnMount: true,
    throttleMs: 0
  });
  
  // Use the hook with configuration
  const now = useCurrentDateTime(config);
  
  // Format the time parts for better display
  const formattedTime = useMemo(() => {
    const timeString = now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const dateString = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return { timeString, dateString };
  }, [now]);

  // Handle interval change
  const handleIntervalChange = (interval: number) => {
    setConfig(prev => ({ ...prev, updateInterval: interval }));
  };

  // Toggle milliseconds
  const toggleMilliseconds = () => {
    setConfig(prev => ({ ...prev, includeMilliseconds: !prev.includeMilliseconds }));
  };

  return (
    <section className="demo-card">
      <h3>useCurrentDateTime</h3>
      
      {/* Configuration controls */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Update interval:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${config.updateInterval === 0 ? 'active' : ''}`}
              onClick={() => handleIntervalChange(0)}
            >
              None
            </button>
            <button 
              className={`demo-select-btn ${config.updateInterval === 1000 ? 'active' : ''}`}
              onClick={() => handleIntervalChange(1000)}
            >
              1s
            </button>
            <button 
              className={`demo-select-btn ${config.updateInterval === 100 ? 'active' : ''}`}
              onClick={() => handleIntervalChange(100)}
            >
              100ms
            </button>
          </div>
        </div>
        <div className="demo-config-row">
          <span>Include milliseconds:</span>
          <button 
            className={`demo-select-btn ${config.includeMilliseconds ? 'active' : ''}`}
            onClick={toggleMilliseconds}
          >
            {config.includeMilliseconds ? 'On' : 'Off'}
          </button>
        </div>
        <div className="demo-config-row">
          <span>Throttle updates:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${config.throttleMs === 0 ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, throttleMs: 0 }))}
            >
              None
            </button>
            <button 
              className={`demo-select-btn ${config.throttleMs === 250 ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, throttleMs: 250 }))}
            >
              250ms
            </button>
            <button 
              className={`demo-select-btn ${config.throttleMs === 500 ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, throttleMs: 500 }))}
            >
              500ms
            </button>
          </div>
        </div>
      </div>
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Current Date:</span>
          <span className="demo-value">{formattedTime.dateString}</span>
        </div>
        <div className="demo-config-row">
          <span>Current Time:</span>
          <span className="demo-value">{formattedTime.timeString}</span>
        </div>
        <div className="demo-config-row">
          <span>ISO Format:</span>
          <span className="demo-value">{now.toString()}</span>
        </div>
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            The useCurrentDateTime hook provides a live-updating date and time using the Temporal API. It can be configured with custom update intervals and precision options.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useCurrentDateTime(options?)<br />
            <strong>Parameters:</strong><br />
            - <strong>options</strong>: UseCurrentDateTimeOptions (optional)<br />
            &nbsp;&nbsp;• <strong>updateInterval</strong>: number (default: 1000) - Time in ms between updates. Set to 0 to disable.<br />
            &nbsp;&nbsp;• <strong>includeMilliseconds</strong>: boolean (default: false) - Whether to include ms precision.<br />
            &nbsp;&nbsp;• <strong>updateOnMount</strong>: boolean (default: true) - Whether to update immediately on mount.<br />
            &nbsp;&nbsp;• <strong>throttleMs</strong>: number (default: 0) - Minimum time in ms between state updates.<br />
            <strong>Returns:</strong> Temporal.PlainDateTime<br />
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useCurrentDateTime } from 'temporal-react-hook';

// Basic usage
const now = useCurrentDateTime();

// With configuration
const preciseTime = useCurrentDateTime({
  updateInterval: 100,
  includeMilliseconds: true,
  throttleMs: 250
});`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
