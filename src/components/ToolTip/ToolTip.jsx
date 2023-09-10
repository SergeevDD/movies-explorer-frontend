import errorImg from '../../images/logo/error.svg';
import acceptImg from '../../images/logo/success.svg';
import { useState, useEffect } from 'react';
function ToolTip({ type, message, onDelete }) {
  const deleteDelay = 2400;
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {setIsClosing(true);onDelete()}, deleteDelay);

    return () => {
      clearTimeout(timeoutId);

    };
  }, [isClosing, onDelete]);

  return (
    <figure className={`tooltip ${isClosing ? 'tooltip__slideOut' : 'tooltip__slideIn'}`}>
      <img
        alt={''}
        src={type === 'access' ? acceptImg : errorImg}
        className="tooltip__image"
      />
      <figcaption className="tooltip__subtitle">{message}</figcaption>
    </figure>
  );
}

export default ToolTip;
