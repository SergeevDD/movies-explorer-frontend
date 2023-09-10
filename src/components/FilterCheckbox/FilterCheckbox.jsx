import { useEffect, useState } from "react";

function FilterCheckbox({ location, toggleCheckBox }) {

  const [check, toggleCheck] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('thumbler') && (location.pathname === '/movies')) {
      const checkStatus = localStorage.getItem('thumbler');
      toggleCheck(checkStatus === 'true');
      toggleCheckBox(checkStatus === 'true');

    }
  }, [])

  function handleSwitch(e) {
    toggleCheck(e.target.checked);
    toggleCheckBox(e.target.checked)
  }

  return (
    <label className='filter' htmlFor='one' onChange={handleSwitch} checked={check === 'true'}>
      <input className='filter__switch' type="checkbox" id='one' />
      <span className={`filter__img ${check ? 'filter__img_active' : ''}`}></span>
      <span className='filter__name'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
