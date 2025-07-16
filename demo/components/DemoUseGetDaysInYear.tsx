import React, { useState } from 'react';
import useGetDaysInYear from '../../src/useGetDaysInYear';
import './DemoCard.css';

export const DemoUseGetDaysInYear: React.FC = () => {
  const [date, setDate] = useState('2024-01-01T00:00:00');

  const daysInYear = useGetDaysInYear(date);

  return (
    <section className="demo-card">
      <h3>useGetDaysInYear</h3>

      {/* Configuration panel */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Select Date:</span>
          <input
            type="datetime-local"
            value={date.slice(0, 16)}
            onChange={(e) => setDate(e.target.value)}
            className="demo-input-compact demo-input-margin"
          />
        </div>
      </div>

      {/* Results display */}
      <div className="demo-config-panel">
        <div className="demo-config-row">
          <span>Days in Year:</span>
          <span className="demo-value">{daysInYear} days</span>
        </div>
      </div>

      {/* Documentation */}
      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>Returns the number of days in the year for a given date (365 for regular years, 366 for leap years).</span>
        </div>
        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useGetDaysInYear(date)<br/>
            <strong>Parameters:</strong><br/>
            - date: A date input (string, Date, or Temporal object)<br/>
            <strong>Returns:</strong> A number representing the days in the year (365 or 366).<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{ margin: 0 }}>{`const daysInYear = useGetDaysInYear('2024-01-01');
// returns: 366 (2024 is a leap year)`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
};
