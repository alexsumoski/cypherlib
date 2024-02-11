// hooks/useSmoothScrollbar.ts
import { useRef, useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';
import ScrollbarOptions from 'smooth-scrollbar';

interface UseSmoothScrollbarProps {
  options?: ScrollbarOptions;
}

export const useSmoothScrollbar = ({ options }: ScrollbarOptions) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollbar = Scrollbar.init(scrollContainerRef.current, options);

      return () => {
        scrollbar.destroy();
      };
    }
  }, [options]);

  return scrollContainerRef;
};
