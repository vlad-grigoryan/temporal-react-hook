import { useState } from 'react';
import './DemoCard.css';
import useTimeZoneOffset from '../../src/useTimeZoneOffset';

const COMMON_ZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney',
];

export default function DemoUseTimeZoneOffset() {
  const [zone, setZone] = useState<string>('UTC');
  const [customZone, setCustomZone] = useState<string>('');
  const [asMinutes, setAsMinutes] = useState<boolean>(false);

  const offset = useTimeZoneOffset(zone, { asMinutes });

  const applyCustomZone = () => {
    const trimmed = customZone.trim();
    if (trimmed) {
      setZone(trimmed);
      setCustomZone('');
    }
  };

  return (
    <section className="demo-card">
      <h3>useTimeZoneOffset</h3>

      <div className="demo-config-panel">
        <div className="demo-config-row">
          <label style={{ marginRight: 8 }}>Time Zone:</label>
          <select
            className="demo-select"
            value={COMMON_ZONES.includes(zone) ? zone : 'custom'}
            onChange={(e) => {
              const val = e.target.value;
              if (val !== 'custom') setZone(val);
            }}
          >
            {COMMON_ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
            <option value="custom">Custom…</option>
          </select>
        </div>
        {(!COMMON_ZONES.includes(zone) || customZone) && (
          <div className="demo-config-row">
            <input
              type="text"
              value={customZone}
              onChange={(e) => setCustomZone(e.target.value)}
              placeholder="Enter IANA time-zone"
              className="demo-input"
              style={{ flex: 1, marginRight: 8 }}
            />
            <button className="demo-button" onClick={applyCustomZone}>Apply</button>
          </div>
        )}
        <div className="demo-config-row">
          <label>
            <input
              type="checkbox"
              checked={asMinutes}
              onChange={(e) => setAsMinutes(e.target.checked)}
            />{' '}
            Return as minutes
          </label>
        </div>
      </div>

      <div className="demo-output-panel">
        <div className="demo-config-row">
          <b>Current Offset:</b>&nbsp;
          <span>{offset.toString()}</span>
        </div>
      </div>

      <div className="demo-info-card">
        <div className="demo-description">
          <strong>Description:</strong>
          <span>
            Returns the current UTC offset for a given IANA time-zone and updates automatically on DST transitions.
          </span>
        </div>

        <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useTimeZoneOffset(zone?, options?)<br/>
            <strong>Parameters:</strong><br/>
            – zone: string | Temporal.TimeZoneLike — IANA zone, default system<br/>
            – options: {'{'} asMinutes?: boolean; updateOnTick?: number {'}'}<br/>
            <strong>Returns:</strong> string | number — formatted offset (e.g. "UTC+02:00") or minutes east of UTC<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{margin: 0}}>{`import { useTimeZoneOffset } from 'temporal-react-hook';

// London offset as formatted string
const offsetStr = useTimeZoneOffset('Europe/London');

// New York offset as minutes (negative west of UTC)
const nyMinutes = useTimeZoneOffset('America/New_York', { asMinutes: true });

console.log(offsetStr);   // "UTC+01:00"
console.log(nyMinutes);   // -300
`}</pre>
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
