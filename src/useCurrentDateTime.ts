import { useState, useEffect, useRef } from 'react';
import { Temporal } from '@js-temporal/polyfill';

/**
 * Configuration options for the useCurrentDateTime hook
 */
export interface UseCurrentDateTimeOptions {
  /**
   * Update interval in milliseconds (default: 1000ms = 1 second)
   */
  updateInterval?: number;
  
  /**
   * Whether to include milliseconds in the returned DateTime (default: false)
   */
  includeMilliseconds?: boolean;
  
  /**
   * Whether to update the time on mount (default: true)
   */
  updateOnMount?: boolean;
  
  /**
   * Only update state if the time difference is greater than this threshold in milliseconds
   * This helps reduce unnecessary re-renders when high-frequency updates aren't visually noticeable
   * (default: 0, meaning update on every interval)
   */
  throttleMs?: number;
}

/**
 * useCurrentDateTime: Provides a live-updating Temporal.PlainDateTime
 * 
 * This hook is useful for components that need to display the current time and have it
 * automatically update (like clocks, timers, or time-sensitive displays).
 * 
 * @param options - Configuration options for the hook
 * @returns {Temporal.PlainDateTime} The current date and time as a Temporal.PlainDateTime object
 */
const useCurrentDateTime = (options?: UseCurrentDateTimeOptions): Temporal.PlainDateTime => {
    const {
      updateInterval = 1000,
      includeMilliseconds = false,
      updateOnMount = true,
      throttleMs = 0
    } = options || {};
    
    // Keep track of the last update time for throttling
    const lastUpdateRef = useRef<number>(0);
    
    const getCurrentTime = () => {
      const now = Temporal.Now.plainDateTimeISO();
      
      // If milliseconds are not needed, create a new DateTime with milliseconds set to 0
      if (!includeMilliseconds) {
        return Temporal.PlainDateTime.from({
          year: now.year,
          month: now.month,
          day: now.day,
          hour: now.hour,
          minute: now.minute,
          second: now.second,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0
        });
      }
      
      return now;
    };
    
    const [now, setNow] = useState<Temporal.PlainDateTime>(getCurrentTime());
    const intervalRef = useRef<number | null>(null);

    // Function to update time with throttling
    const updateTime = () => {
      const currentMs = Date.now();
      const timeSinceLastUpdate = currentMs - lastUpdateRef.current;
      
      // Only update if we've passed the throttle threshold
      if (timeSinceLastUpdate >= throttleMs) {
        setNow(getCurrentTime());
        lastUpdateRef.current = currentMs;
      }
    };

    useEffect(() => {
        // Set time immediately on mount to avoid waiting for the first interval
        if (updateOnMount) {
          updateTime();
        }
        
        // Only set up interval if updateInterval is positive
        if (updateInterval > 0) {
          // Use window.setInterval and store the ID in a ref for proper cleanup
          intervalRef.current = window.setInterval(updateTime, updateInterval);

          return () => {
              if (intervalRef.current !== null) {
                  window.clearInterval(intervalRef.current);
                  intervalRef.current = null;
              }
          };
        }
        
        return undefined;
    }, [updateInterval, includeMilliseconds, updateOnMount, throttleMs]);

    return now;
};

export default useCurrentDateTime;
