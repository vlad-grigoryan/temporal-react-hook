import { useState, FC, useRef, useEffect } from "react";
import DemoUseCurrentDateTime from "./components/DemoUseCurrentDateTime";
import DemoUseTimeZone from "./components/DemoUseTimeZone";
import DemoUseTimeZoneOffset from "./components/DemoUseTimeZoneOffset";
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
import DemoUseIsBetween from "./components/DemoUseIsBetween";
import DemoUseCalendarTime from "./components/DemoUseCalendarTime";
import DemoUseDateTimeRange from "./components/DemoUseDateTimeRange";
import DemoUseTemporalDateTime from "./components/DemoUseTemporalDateTime";
import DemoUseDifference from "./components/DemoUseDifference";

const demoSections = [
  { key: "temporaldatetime", label: "useTemporalDateTime", component: <DemoUseTemporalDateTime /> },
  { key: "currentdatetime", label: "useCurrentDateTime", component: <DemoUseCurrentDateTime /> },
  { key: "timezone", label: "useTimeZone", component: <DemoUseTimeZone /> },
  { key: "timezoneoffset", label: "useTimeZoneOffset", component: <DemoUseTimeZoneOffset /> },
  { key: "duration", label: "useDuration", component: <DemoUseDuration /> },
  { key: "relativetime", label: "useRelativeTime", component: <DemoUseRelativeTime /> },
  { key: "localedatetime", label: "useLocaleDateTime", component: <DemoUseLocaleDateTime /> },
  { key: "timeago", label: "useTimeAgo", component: <DemoUseTimeAgo /> },
  { key: "istoday", label: "useIsToday", component: <DemoUseIsToday /> },
  { key: "isthisweek", label: "useIsThisWeek", component: <DemoUseIsThisWeek /> },
  { key: "isthismonth", label: "useIsThisMonth", component: <DemoUseIsThisMonth /> },
  { key: "isthisyear", label: "useIsThisYear", component: <DemoUseIsThisYear /> },
  { key: "issame", label: "useIsSame", component: <DemoUseIsSame /> },
  { key: "isbetween", label: "useIsBetween", component: <DemoUseIsBetween /> },
  { key: "format", label: "useTemporalFormat", component: <DemoUseTemporalFormat /> },
  { key: "add", label: "useTemporalAdd", component: <DemoUseTemporalAdd /> },
  { key: "subtract", label: "useTemporalSubtract", component: <DemoUseTemporalSubtract /> },
  { key: "startendof", label: "useTemporalStartOf / EndOf", component: <DemoUseTemporalStartEndOf /> },
  { key: "daterange", label: "useDateTimeRange", component: <DemoUseDateTimeRange /> },
  { key: "calendartime", label: "useCalendarTime", component: <DemoUseCalendarTime /> },
  { key: "difference", label: "useDifference", component: <DemoUseDifference /> },
];

const Playground: FC = () => {
  const [selected, setSelected] = useState(demoSections[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when selecting an item on mobile
  const handleSelectItem = (key: string) => {
    setSelected(key);
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={`playground-root ${menuOpen ? 'menu-open' : ''}`}>
      {/* Hamburger menu button for mobile/tablet */}
      <button 
        className="playground-menu-toggle" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-icon"></span>
      </button>
      
      <aside className={`playground-sidebar ${menuOpen ? 'menu-open' : ''}`}>
        <div className="playground-sidebar-header">
          <span role="img" aria-label="clock" className="playground-sidebar-icon">⏰</span>
          Temporal React Hooks
        </div>
        <nav
          ref={navRef}
          className="playground-sidebar-nav"
        >
          <div className="playground-sidebar-nav-inner">
            {showUpArrow && (
              <div className="playground-nav-arrow playground-nav-arrow-up">▲</div>
            )}
            <div className="playground-nav-items">
              {demoSections.map(section => (
                <div
                  key={section.key}
                  onClick={() => handleSelectItem(section.key)}
                  onMouseEnter={() => setHovered(section.key)}
                  onMouseLeave={() => setHovered(null)}
                  className={`playground-nav-item${selected === section.key ? ' selected' : ''}${hovered === section.key ? ' hovered' : ''}`}
                >
                  {section.label}
                </div>
              ))}
            </div>
            {showDownArrow && (
              <div className="playground-nav-arrow playground-nav-arrow-down">▼</div>
            )}
          </div>
        </nav>
        <div className="playground-sidebar-footer">
          {new Date().getFullYear()} temporal-react-hook
        </div>
      </aside>
      <main className="playground-main">
        <div className="playground-main-content">
          {demoSections.find(s => s.key === selected)?.component}
        </div>
      </main>
    </div>
  );
};

export default Playground;
