import { useState, useEffect, useRef } from 'react';

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (pendingRef.current) return;
      pendingRef.current = true;
      rafIdRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        pendingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll as EventListener);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return scrollY;
};