/**
 * 节流hooks
 */

import { useEffect, useRef, useState } from 'react'

export const useThrottle = (fn: Function, ms: number = 1000, deps = []) => {
  let previous = useRef(0);
  let [time, setTime] = useState(ms);
  useEffect(() => {
    let now = Date.now();
    if (now - previous.current > time) {
      fn();
      previous.current = now;
    }
  }, deps);

  const cancel = () => {
    setTime(0);
  };

  return [cancel];
};