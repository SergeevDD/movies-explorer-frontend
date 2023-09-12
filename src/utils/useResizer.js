import { useState, useEffect } from 'react';

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
      return {
        quantity: 8,
        add: 2,
      }

    case  width >= 1100:
      return {
        quantity: 12,
        add: 3,
      }
    default: return {
      quantity: 5,
      add: 2,
    }
  }
}
