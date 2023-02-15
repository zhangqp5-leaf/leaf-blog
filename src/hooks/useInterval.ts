/**
 * 实现 setInterval 功能，以便在 React 组件中循环执行某些操作
 */

import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number | null) => {
  const savedCallback: React.MutableRefObject<any> = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
