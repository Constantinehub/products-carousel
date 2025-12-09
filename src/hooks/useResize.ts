import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '@/helpers/constants';

export function useResize(
  breakpoint: number = MOBILE_BREAKPOINT
): Record<string, number | boolean> {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= breakpoint;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width, isMobile };
}
