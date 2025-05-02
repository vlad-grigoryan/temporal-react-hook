import { useState, FC, useRef, useEffect } from "react";
import DemoUseCurrentDateTime from "./components/DemoUseCurrentDateTime";
import DemoUseTimeZone from "./components/DemoUseTimeZone";
import DemoUseDuration from "./components/DemoUseDuration";
import DemoUseRelativeTime from "./components/DemoUseRelativeTime";
import DemoUseLocaleDateTime from "./components/DemoUseLocaleDateTime";
import DemoUseTimeAgo from "./components/DemoUseTimeAgo";
import DemoUseIsToday from "./components/DemoUseIsToday";
import DemoUseIsThisWeek from "./components/DemoUseIsThisWeek";
import DemoUseIsThisMonth from "./components/DemoUseIsThisMonth";
import DemoUseIsThisYear from "./components/DemoUseIsThisYear";
import DemoUseTemporalFormat from "./components/DemoUseTemporalFormat";
import DemoUseTemporalAdd from "./components/DemoUseTemporalAdd";
import DemoUseTemporalSubtract from "./components/DemoUseTemporalSubtract";
import DemoUseTemporalStartEndOf from "./components/DemoUseTemporalStartEndOf";
import DemoUseIsSame from "./components/DemoUseIsSame";

const demoSections = [
  { key: "currentdatetime", label: "useCurrentDateTime", component: <DemoUseCurrentDateTime /> },
  { key: "timezone", label: "useTimeZone", component: <DemoUseTimeZone /> },
  { key: "duration", label: "useDuration", component: <DemoUseDuration /> },
  { key: "relativetime", label: "useRelativeTime", component: <DemoUseRelativeTime /> },
  { key: "localedatetime", label: "useLocaleDateTime", component: <DemoUseLocaleDateTime /> },
  { key: "timeago", label: "useTimeAgo", component: <DemoUseTimeAgo /> },
  { key: "istoday", label: "useIsToday", component: <DemoUseIsToday /> },
  { key: "isthisweek", label: "useIsThisWeek", component: <DemoUseIsThisWeek /> },
  { key: "isthismonth", label: "useIsThisMonth", component: <DemoUseIsThisMonth /> },
  { key: "isthisyear", label: "useIsThisYear", component: <DemoUseIsThisYear /> },
  { key: "issame", label: "useIsSame", component: <DemoUseIsSame /> },
  { key: "format", label: "useTemporalFormat", component: <DemoUseTemporalFormat /> },
  { key: "add", label: "useTemporalAdd", component: <DemoUseTemporalAdd /> },
  { key: "subtract", label: "useTemporalSubtract", component: <DemoUseTemporalSubtract /> },
  { key: "startendof", label: "useTemporalStartOf / EndOf", component: <DemoUseTemporalStartEndOf /> },
];

const Playground: FC = () => {
  const [selected, setSelected] = useState(demoSections[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const updateArrows = () => {
      setShowUpArrow(nav.scrollTop > 0);
      setShowDownArrow(nav.scrollTop + nav.clientHeight < nav.scrollHeight);
    };
    updateArrows();
    nav.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      nav.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
      <div style={{ display: "flex", width: "100vw", height: "100vh", fontFamily: 'Inter, sans-serif' }}>
        <aside style={{
          background: '#23272f',
          color: '#fff',
          padding: 0,
          boxShadow: '0.125rem 0 0.5rem #0001', 
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: "1.375rem", 
            padding: "1.375rem 0 0.75rem 0", 
            letterSpacing: 1,
            borderBottom: '1px solid #333',
            textAlign: 'center'
          }}>
            <span role="img" aria-label="clock" style={{ marginRight: "0.5rem" }}>⏰</span>
            Temporal React Hooks
          </div>
          <nav 
            ref={navRef}
            style={{ flex: 1, overflowY: "auto", position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {showUpArrow && (
                <div style={{
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to bottom, #23272f 80%, transparent)',
                  zIndex: 2,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  fontSize: '1.25rem',
                  color: '#aaa',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>▲</div>
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {demoSections.map(section => (
                  <div
                    key={section.key}
                    onClick={() => setSelected(section.key)}
                    onMouseEnter={() => setHovered(section.key)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      padding: "0.75rem 0.75rem", 
                      background: selected === section.key ? '#3c4250' : hovered === section.key ? '#353b48' : 'none',
                      cursor: 'pointer',
                      fontWeight: selected === section.key ? 600 : 400,
                      borderLeft: selected === section.key ? '0.25rem solid #2bd4c5' : '0.25rem solid transparent', 
                      color: selected === section.key || hovered === section.key ? '#fff' : '#c0c4cc',
                      transition: 'background 0.2s, border-left 0.2s, color 0.2s',
                      display: 'block',
                    }}
                  >
                    {section.label}
                  </div>
                ))}
              </div>
              {showDownArrow && (
                <div style={{
                  position: 'sticky',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, #23272f 80%, transparent)',
                  zIndex: 2,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  fontSize: '1.25rem',
                  color: '#aaa',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>▼</div>
              )}
            </div>
          </nav>
          <div style={{
            padding: "1rem 1.5rem", 
            fontSize: "0.75rem", 
            color: "#aaa",
            borderTop: "1px solid #333",
            textAlign: "center"
          }}>
            {new Date().getFullYear()} temporal-react-hook
          </div>
        </aside>
        <main style={{ width: "100%"}}>
          <div style={{display: 'flex', width: "100%", height: "100%" }}>
            {demoSections.find(s => s.key === selected)?.component}
          </div>
        </main>
      </div>
  );
};

export default Playground;
