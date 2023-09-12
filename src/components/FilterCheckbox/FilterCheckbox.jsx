import { useEffect, useState } from "react";

function FilterCheckbox({ location, handleShortFilms }) {

  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if ((location.pathname === '/movies') && localStorage.getItem('thumbler')) {
      setIsCheck(localStorage.getItem('thumbler'));
      console.log('zagruzka tumblera so stora', isCheck, localStorage.getItem('thumbler'));

    }
  }, [])

  function handleSwitch(e) {
    setIsCheck(e.target.checked);
    handleShortFilms(e.target.checked,);
  }

  return (
    <label className='filter' htmlFor='shortFilmToggle' >
      <input className='filter__switch' type="checkbox" id='shortFilmToggle' onChange={handleSwitch} checked={isCheck ? true : false} />
      <span className={`filter__img ${isCheck ? 'filter__img_active' : ''}`}></span>
      <span className='filter__name'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
