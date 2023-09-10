import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm({ handleCheckBox, onSubmit }) {

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
        name: findString,
      }
    );
  }

  useEffect(() => {
    if (localStorage.getItem('findString') && (location.pathname === '/movies')) {
      setFindString(localStorage.getItem('findString'))
    }
  }, [])

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
          name="film-name"
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
        <FilterCheckbox toggleCheckBox={handleCheckBox} location={location}/>
      </form>

    </article>
  );
}

export default SearchForm;
