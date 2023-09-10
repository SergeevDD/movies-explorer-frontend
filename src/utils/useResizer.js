import { useState, useEffect } from 'react';

export default function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setTimeout(()=>setWidth(event.target.innerWidth), 1000)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return {size:chooseSize(width)}
};

function chooseSize(width) {
  switch (true) {
    case width <= 480 && width <= 768:
      return {
        quantity: 5,
        add: 2,
      }
    case width <= 768 && width <= 1280:
      return {
        quantity: 8,
        add: 2,
      }

    case width <= 1280:
      return {
        quantity: 12,
        add: 2,
      }
    default: return {}
  }
}
