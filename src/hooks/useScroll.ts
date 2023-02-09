/**
 * 监听一个滚动元素
 */

import { useState, useEffect } from 'react'

export const useScroll = (scrollRef: React.MutableRefObject<any>): number[] => {
  const [pos, setPos] = useState([0, 0]);

  useEffect(() => {
    function handleScroll(e: any){
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener('scroll', handleScroll, false)
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false)
    }
  }, []);
  
  return pos;
};