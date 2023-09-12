import { useEffect, useState } from "react";

function FilterCheckbox({ location, handleShortFilms }) {

  const [isCheck, setIsCheck] = useState(false);

   useEffect(() => {
    if ((location.pathname === '/movies') && localStorage.getItem('thumbler')) {
      setIsCheck(localStorage.getItem('thumbler') === 'true');
    }
  }, [location.pathname])

  function handleSwitch(e) {
    console.log(e.target.checked);
    setIsCheck(e.target.checked);
    handleShortFilms(e.target.checked,);
  }

  return (
    <label className='filter' htmlFor='shortFilmToggle' >
      <input className='filter__switch' type="checkbox" id='shortFilmToggle' onChange={handleSwitch} checked={isCheck}/>
      <span className={`filter__img ${isCheck ? 'filter__img_active' : ''}`}></span>
      <span className='filter__name'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
