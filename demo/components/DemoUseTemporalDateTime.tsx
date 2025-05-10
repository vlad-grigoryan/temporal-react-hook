import { useState, useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import useTemporalDateTime from "../../src/useTemporalDateTime";
import "./DemoCard.css";

const INITIAL_DATE = "2025-05-05T12:34";

type InputType = "empty" | "iso" | "date" | "plainDateTime" | "zonedDateTime" | "instant";

export default function DemoUseTemporalDateTime() {
  // Input type selection
  const [inputType, setInputType] = useState<InputType>("iso");
  
  // Input value state
  const [isoInput, setIsoInput] = useState<string>(INITIAL_DATE);
  
  // Generate example values for different input types
  const exampleValues = useMemo(() => {
    const now = new Date();
    const plainDateTime = Temporal.PlainDateTime.from({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    });
    const zonedDateTime = Temporal.Now.zonedDateTimeISO();
    const instant = Temporal.Now.instant();
    
    return {
      empty: undefined,
      iso: INITIAL_DATE,
      date: now,
      plainDateTime,
      zonedDateTime,
      instant
    };
  }, []);
  
  // Get the current input value based on selected type
  const getCurrentInput = () => {
    if (inputType === "iso") return isoInput;
    if (inputType === "empty") return undefined;
    return exampleValues[inputType];
  };
  
  // Use the hook with the selected input
  let temporal: any;
  let error: string | null = null;
  try {
    temporal = useTemporalDateTime(getCurrentInput());
  } catch (e: any) {
    temporal = null;
    error = e?.message || String(e);
  }
  
  // Format the time parts for better display
  const formattedTime = useMemo(() => {
    if (!temporal) return { timeString: "", dateString: "" };
    
    const timeString = temporal.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const dateString = temporal.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return { timeString, dateString };
  }, [temporal]);

  return (
    <section className="demo-card">
      <h3>useTemporalDateTime</h3>
      
      {/* Input type selection */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Input type:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${inputType === "empty" ? 'active' : ''}`}
              onClick={() => setInputType("empty")}
            >
              Empty (Current)
            </button>
            <button 
              className={`demo-select-btn ${inputType === "iso" ? 'active' : ''}`}
              onClick={() => setInputType("iso")}
            >
              ISO String
            </button>
            <button 
              className={`demo-select-btn ${inputType === "date" ? 'active' : ''}`}
              onClick={() => setInputType("date")}
            >
              Date
            </button>
          </div>
        </div>
        <div className="demo-config-row">
          <span>Temporal types:</span>
          <div className="demo-btn-group">
            <button 
              className={`demo-select-btn ${inputType === "plainDateTime" ? 'active' : ''}`}
              onClick={() => setInputType("plainDateTime")}
            >
              PlainDateTime
            </button>
            <button 
              className={`demo-select-btn ${inputType === "zonedDateTime" ? 'active' : ''}`}
              onClick={() => setInputType("zonedDateTime")}
            >
              ZonedDateTime
            </button>
            <button 
              className={`demo-select-btn ${inputType === "instant" ? 'active' : ''}`}
              onClick={() => setInputType("instant")}
            >
              Instant
            </button>
          </div>
        </div>
      </div>
      
      {/* ISO string input field (only shown when ISO input type is selected) */}
      {inputType === "iso" && (
        <div className="demo-row">
          <input
            type="text"
            placeholder="Enter ISO string (e.g., 2025-05-05T12:34)"
            value={isoInput}
            onChange={e => setIsoInput(e.target.value)}
            className="demo-input-wide"
          />
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="demo-row">
          <span style={{ color: "red" }}>{error}</span>
        </div>
      )}
      
      {/* Results display block */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Input Value:</span>
          <span className="demo-value">
            {inputType === "empty" ? "undefined (current time)" :
             inputType === "iso" ? isoInput :
             inputType === "date" ? exampleValues.date.toString() :
             String(exampleValues[inputType])}
          </span>
        </div>
        
        {temporal && (
          <>
            <div className="demo-config-row">
              <span>Date:</span>
              <span className="demo-value">{formattedTime.dateString}</span>
            </div>
            <div className="demo-config-row">
              <span>Time:</span>
              <span className="demo-value">{formattedTime.timeString}</span>
            </div>
            <div className="demo-config-row">
              <span>ISO Format:</span>
              <span className="demo-value">{temporal.toString()}</span>
            </div>
          </>
        )}
      </div>
      
      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            Converts various date/time inputs to a Temporal.PlainDateTime. If no input is provided, returns the current date/time.
          </span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTemporalDateTime(input?)<br />
            <strong>Parameters:</strong><br />
            - <strong>input</strong>: (optional)<br />
            &nbsp;&nbsp;• <strong>undefined</strong>: Returns current date/time<br />
            &nbsp;&nbsp;• <strong>string</strong>: Parses ISO string or falls back to Date parsing<br />
            &nbsp;&nbsp;• <strong>Date</strong>: Converts JavaScript Date object<br />
            &nbsp;&nbsp;• <strong>Temporal.PlainDateTime</strong>: Returns as-is<br />
            &nbsp;&nbsp;• <strong>Temporal.ZonedDateTime</strong>: Converts to PlainDateTime<br />
            &nbsp;&nbsp;• <strong>Temporal.Instant</strong>: Converts to PlainDateTime in system time zone<br />
            <strong>Returns:</strong> Temporal.PlainDateTime<br />
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`import { useTemporalDateTime } from 'temporal-react-hook';

// Current time
const now = useTemporalDateTime();

// From ISO string
const fromISO = useTemporalDateTime('2025-05-05T12:34');

// From Date object
const fromDate = useTemporalDateTime(new Date());

// From Temporal objects
const fromTemporal = useTemporalDateTime(Temporal.Now.instant());`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
