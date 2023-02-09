/**
 * 防抖hooks
 */

import { useEffect, useRef } from 'react';

export const useDebounce = (fn: Function, ms: number = 1000, deps = []) => {
  let timeout: any = useRef();
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  }, deps);

  const cancel = () => {
    clearTimeout(timeout.current);
    timeout = null;
  };

  return [cancel];
};