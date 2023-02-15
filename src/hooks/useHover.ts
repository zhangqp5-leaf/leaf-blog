/**
 * 检测鼠标是否悬停在组件上
 */

import { useState, useRef, useEffect } from 'react';

export const useHover = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', enter);
      node.addEventListener('mouseleave', leave);

      return () => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      };
    }
  }, [ref.current]);

  return [ref, hovered] as const;
};
