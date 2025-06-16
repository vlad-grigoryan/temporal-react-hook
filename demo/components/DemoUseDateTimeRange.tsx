import {useState, useMemo} from 'react';
import {Temporal} from '@js-temporal/polyfill';
import './DemoCard.css';
import useDateTimeRange from '../../src/useDateTimeRange';
import useTemporalDateTime from '../../src/useTemporalDateTime';

const MAX_ITEMS_TO_PROCESS_FOR_DISPLAY = 1000;
const MAX_ITEMS_TO_RENDER = 100;

export default function DemoUseDateTimeRange() {
    const systemNow = useTemporalDateTime(); // Renamed to avoid conflict with hook's now
    const [clampToNow, setClampToNow] = useState(false);
    const [smallestUnit, setSmallestUnit] = useState<'day' | 'hour' | 'minute' | 'second'>('day');

    const {
        range,
        setStart,
        setEnd,
        shiftBy,
        length,
        toArray,
    } = useDateTimeRange(systemNow.subtract({days: 7}), systemNow, {clampToNow, smallestUnit});

    const itemsToDisplay = useMemo(() => {
        console.log(`[DemoUseDateTimeRange] Recalculating itemsToDisplay. smallestUnit: ${smallestUnit}, hookLength: ${length}, MAX_PROCESS: ${MAX_ITEMS_TO_PROCESS_FOR_DISPLAY}, MAX_RENDER: ${MAX_ITEMS_TO_RENDER}`);
        if ((smallestUnit === 'second' || smallestUnit === 'minute') && length > MAX_ITEMS_TO_PROCESS_FOR_DISPLAY) {
            console.log('[DemoUseDateTimeRange] Condition: Range marked as TOO_LARGE');
            return 'TOO_LARGE';
        }
        const fullArray = toArray();
        console.log(`[DemoUseDateTimeRange] Called toArray(). fullArray.length: ${fullArray.length}`);
        if (fullArray.length > MAX_ITEMS_TO_RENDER) {
            console.log(`[DemoUseDateTimeRange] Condition: Slicing fullArray. Original length: ${fullArray.length}, Target length: ${MAX_ITEMS_TO_RENDER}`);
            return fullArray.slice(0, MAX_ITEMS_TO_RENDER);
        }
        console.log('[DemoUseDateTimeRange] Condition: Using fullArray as is (length <= MAX_ITEMS_TO_RENDER).');
        return fullArray;
    }, [toArray, length, smallestUnit, MAX_ITEMS_TO_PROCESS_FOR_DISPLAY, MAX_ITEMS_TO_RENDER]);

    return (
        <section className="demo-card">
            <h3>useDateTimeRange</h3>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Start:</b>
                    <input
                        type="datetime-local"
                        value={range.start.toString().slice(0, 16)}
                        onChange={e => setStart(Temporal.PlainDateTime.from(e.target.value))}
                        className="demo-input-compact"
                    />
                    <b>End:</b>
                    <input
                        type="datetime-local"
                        value={range.end.toString().slice(0, 16)}
                        onChange={e => setEnd(Temporal.PlainDateTime.from(e.target.value))}
                        className="demo-input-compact"
                    />
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row" style={{gap: '0.5rem'}}>
                    <button onClick={() => shiftBy({days: -1})}>← 1 day</button>
                    <button onClick={() => shiftBy({days: 1})}>+1 day →</button>
                    <button onClick={() => shiftBy({weeks: -1})}>← 1 week</button>
                    <button onClick={() => shiftBy({weeks: 1})}>+1 week →</button>
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <input
                            type="checkbox"
                            checked={clampToNow}
                            onChange={(e) => setClampToNow(e.target.checked)}
                        />
                        Clamp end to now
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        Smallest Unit:
                        <select
                            value={smallestUnit}
                            onChange={(e) => setSmallestUnit(e.target.value as 'day' | 'hour' | 'minute' | 'second')}
                            className="demo-input-compact"
                            style={{padding: '0.25rem'}}
                        >
                            <option value="day">Day</option>
                            <option value="hour">Hour</option>
                            <option value="minute">Minute</option>
                            <option value="second">Second</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Range Length:</b> <span className="demo-value">{length} {smallestUnit}s</span>
                </div>
            </div>

            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <b>Dates in Range:</b>
                    <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
                        {itemsToDisplay === 'TOO_LARGE' ? (
                            <li>Range is too large to display</li>
                        ) : (
                            itemsToDisplay.map(dt => (
                                <li key={dt.toString()}>{dt.toString()}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            <div className="demo-info-card">
                <div className="demo-description">
                    <strong>Description:</strong>
                    <span>
            Creates and manages an ordered Temporal.PlainDateTime range and exposes helpers
            to modify, shift and enumerate it.
          </span>
                </div>

                <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useDateTimeRange(initialStart?, initialEnd?, options?)<br/>
            <strong>Parameters:</strong><br/>
            - initialStart: Temporal.PlainDateTime — optional<br/>
            - initialEnd: Temporal.PlainDateTime — optional<br/>
            - options: {'{'} clampToNow?: boolean; smallestUnit?: 'day'|'hour'|'minute'|'second' {'}'}<br/>
            <strong>Returns:</strong> {'{'} range, setStart, setEnd, shiftBy, length, contains, toArray {'}'}<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{margin: 0}}>{`import { Temporal } from '@js-temporal/polyfill';
import { useDateTimeRange } from 'temporal-react-hook';

// Basic usage
const basic = useDateTimeRange();
console.log('Basic range:', basic.range.start.toString(), basic.range.end.toString());

// With initial start and end, and options
const initialStart = Temporal.PlainDateTime.from('2023-01-01T10:00:00');
const initialEnd = Temporal.PlainDateTime.from('2023-01-05T15:30:00');

const advanced = useDateTimeRange(initialStart, initialEnd, {
  clampToNow: true,      // End date will not go past current time
  smallestUnit: 'hour',  // Length and toArray will use hours
});

console.log('Advanced range length in hours:', advanced.length);
console.log('Dates in advanced range (hourly):', advanced.toArray().map(dt => dt.toString()));

// Using the returned functions
advanced.setStart(Temporal.PlainDateTime.from('2023-01-02T00:00:00'));
advanced.shiftBy({ days: 1 }); // Shifts both start and end by 1 day

console.log('Is 2023-01-03T12:00:00 in range?',
advanced.contains(Temporal.PlainDateTime.from('2023-01-03T12:00:00')));
`}</pre>
            </code>
          </span>
                </div>
            </div>
        </section>
    );
}
