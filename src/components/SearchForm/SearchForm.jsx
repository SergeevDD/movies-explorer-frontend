import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm({ handleShortFilms, onSubmit }) {

  const location = useLocation();

  const [findString, setFindString] = useState('');
  const [warning, setWarning] = useState(false);

  function handleChangeKey(e) {
    setWarning(false);
    setFindString(e.target.value);
  }

  function search(e) {
    e.preventDefault();
    if (findString.length < 1) {
      setWarning(true)
      return
    }
    onSubmit(
      {
      findString:e.target.elements.filmName.value,
      thumbler:e.target.elements.shortFilmToggle.checked
    });
  }

  useEffect(() => {
    if ((location.pathname === '/movies') && localStorage.getItem('findString')) {
      setFindString(localStorage.getItem('findString'))
    }
  }, [location.pathname])

  return (
    <article className='search'>
      <form
        onSubmit={search}
        className="search__form"
        noValidate
      >
        <input
          onChange={handleChangeKey}
          type="text"
          name="filmName"
          placeholder="Фильм"
          className="search__input"
          minLength="1"
          required
          value={findString}
        />
        <button
          type="submit"
          className="search__button"
        >
        </button>
        <span className={`search__error ${warning && 'search__error_active'} `}>
          Нужно ввести ключевое слово
        </span>
        <FilterCheckbox location={location}  handleShortFilms={handleShortFilms}/>
      </form>

    </article>
  );
}

export default SearchForm;
