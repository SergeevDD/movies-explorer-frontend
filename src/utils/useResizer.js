import { useState, useEffect } from 'react';
import { RENDER_TYPE } from './config';

export default function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setTimeout(() => setWidth(event.target.innerWidth), 2000)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return { size: chooseSize(width) }
};

function chooseSize(width) {
  switch (true) {
    case width >= 690 && width <= 1100:
      return RENDER_TYPE.TABLET

    case width >= 1100:
      return RENDER_TYPE.DESKTOP

    default: return RENDER_TYPE.MOBILE
  }
}
