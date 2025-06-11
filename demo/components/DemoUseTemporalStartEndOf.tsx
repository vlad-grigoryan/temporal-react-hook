import {useState} from 'react';
import './DemoCard.css';
import useTemporalStartOf, {StartOfUnit} from '../../src/useTemporalStartOf';
import useTemporalEndOf from '../../src/useTemporalEndOf';
import useTemporalDateTime from '../../src/useTemporalDateTime';

export default function DemoUseTemporalStartEndOf() {
    const startOf = useTemporalStartOf();
    const endOf = useTemporalEndOf();
    const currentDateTime = useTemporalDateTime();
    const [datetime, setDatetime] = useState(currentDateTime);
    const [unit, setUnit] = useState<StartOfUnit>('day');

    const startOfResult = startOf(datetime, unit);
    const endOfResult = endOf(datetime, unit);

    return (
        <section className="demo-card">
            <h3>useTemporalStartOf / useTemporalEndOf</h3>
            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Base Date:</b>
                    <span className="demo-value">{datetime.toString()}</span>
                    <button onClick={() => setDatetime(currentDateTime)}>Now</button>
                    <button onClick={() => setDatetime(datetime.add({days: 1}))}>+1 day</button>
                    <button onClick={() => setDatetime(datetime.subtract({days: 1}))}>-1 day</button>
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Unit:</b>
                    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                        {['second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'].map(u => (
                            <button
                                key={u}
                                onClick={() => setUnit(u as StartOfUnit)}
                                style={{fontWeight: u === unit ? 'bold' : 'normal'}}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Results:</b>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <div>
                            <b>Start of {unit}:</b> <span className="demo-value">{startOfResult.toString()}</span>
                        </div>
                        <div>
                            <b>End of {unit}:</b> <span className="demo-value">{endOfResult.toString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="demo-info-card">
                <div className="demo-description">
                    <strong>Description:</strong>
                    <span>Calculates the start or end of a specified unit for a Temporal date/time object.</span>
                </div>
                <div className="demo-usage">
                    <strong>Example:</strong>
                    <code className="example-code">
            <pre style={{margin: 0}}>{`import { useTemporalStartOf, useTemporalEndOf, useTemporalDateTime } from 'temporal-react-hook';

const startOf = useTemporalStartOf();
const endOf = useTemporalEndOf();
const now = useTemporalDateTime();

// Get start of month
const startOfMonth = startOf(now, 'month');
// e.g., 2025-05-01T00:00:00

// Get end of month
const endOfMonth = endOf(now, 'month');
// e.g., 2025-05-31T23:59:59.999999999

// Get start and end of week
const startOfWeek = startOf(now, 'week');   // Monday 00:00:00
const endOfWeek = endOf(now, 'week');      // Sunday 23:59:59.999999999`}</pre>
                    </code>
                </div>
            </div>
        </section>
    );
}
