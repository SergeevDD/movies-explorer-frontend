import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <article className='search'>
      <form
        className="search__form"
        noValidate
      >
        <input
          type="text"
          name="film-name"
          className="search__input"
          required
        />
        <button
          type="submit"
          className="search__button"
        >
        </button>
        <FilterCheckbox />
      </form>

    </article>
  );
}

export default SearchForm;
