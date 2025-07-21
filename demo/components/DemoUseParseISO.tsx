import React, { useState } from 'react';
import useParseISO from '../../src/useParseISO';
import './DemoCard.css';

const DemoUseParseISO: React.FC = () => {
  const [isoString, setIsoString] = useState<string>('2025-07-21T12:30:00');

  const parsedDate = useParseISO(isoString);

  return (
    <section className="demo-card">
      <h3>useParseISO</h3>

      {/* Config panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <label htmlFor="iso-input">ISO&nbsp;String:</label>
          <input
            id="iso-input"
            type="text"
            className="demo-input-compact"
            value={isoString}
            onChange={(e) => setIsoString(e.target.value)}
            placeholder="2025-07-21T12:30:00"
          />
        </div>
      </div>

      {/* Results display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Parsed:</span>
          <span className="demo-value">
            {parsedDate ? parsedDate.toString() : 'Invalid ISO string'}
          </span>
        </div>
      </div>

      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Parses an ISO-8601 date/time string into a <code>Temporal.PlainDateTime</code> instance. Returns <code>null</code> for invalid strings.</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useParseISO(isoString)<br/>
            <strong>Parameters:</strong><br/>
            - isoString: A date-time string in ISO 8601 format<br/>
            <strong>Returns:</strong> A Temporal.PlainDateTime instance, or null when the string is invalid.<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`const dateTime = useParseISO('2024-02-29T10:00:00');\n// returns: 2024-02-29T10:00:00`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
};

export default DemoUseParseISO;
