import {useState, useRef} from "react";
import useCalendarTime from "../../src/useCalendarTime";
import {Temporal} from "@js-temporal/polyfill";

export default function DemoUseCalendarTime() {
    // Use a fixed 'now' for demo options to prevent the date from updating every second
    const initialNowRef = useRef(Temporal.Now.plainDateTimeISO());
    const initialNow = initialNowRef.current;
    const [date, setDate] = useState(initialNow);
    const calendarString = useCalendarTime(date);
    const options = [
        initialNow,
        initialNow.subtract({days: 1}),
        initialNow.subtract({days: 3}),
        initialNow.subtract({days: 7}),
        initialNow.subtract({days: 30}),
        initialNow.add({days: 1})
    ];
    return (
        <section className="demo-card">
            <h3>useCalendarTime</h3>
            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <span>Date:</span>
                    <div className="demo-button-group">
                        {options.map((d, i) => (
                            <button
                                key={i}
                                className={`demo-select-btn${d.equals(date) ? " active" : ""}`}
                                onClick={() => setDate(d)}
                            >
                                {d.toString()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="demo-config-panel">
                <div className="demo-config-row">
                    <span>Calendar Time:</span> <span className="demo-value">{calendarString}</span>
                </div>
            </div>
            <div className="demo-info-card">
                <div className="demo-description">
                    <strong>Description:</strong>
                    <span>Returns a contextual, human-friendly string for the given date, such as "Today at 14:00", "Yesterday at 09:15", or a formatted date for older values.</span>
                </div>
                <div className="demo-usage">
          <span>
            <strong>Syntax:</strong> useCalendarTime(dateTime)<br/>
            <strong>Parameters:</strong><br/>
            - dateTime: A Temporal date/time object (PlainDateTime, ZonedDateTime, or PlainDate)<br/>
            <strong>Returns:</strong> A string like "Today at 14:00", "Yesterday at 09:15", or a formatted date for older values.<br/>
            <strong>Example:</strong>
            <code className="example-code">
              <pre style={{margin: 0}}>
              import &#123; useCalendarTime &#125; from 'temporal-react-hook';<br/>
              import &#123; useTemporalDateTime &#125; from 'temporal-react-hook';<br/>
              <br/>
              const now = useTemporalDateTime();<br/>
              const calendarString = useCalendarTime(now);<br/>
              // e.g., "Today at 14:00"
              </pre>
            </code>
          </span>
                </div>
            </div>
        </section>
    );
}
