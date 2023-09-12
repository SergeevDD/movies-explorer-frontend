import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { searchMovies, showShortFilms } from '../../utils/Search'
import Preloader from '../Preloader/Preloader'

function SavedMovies({ savedMovies, onDelete, onLoad }) {

  function handleShortFilms(thumbler, films = savedMovies, findString = filterString) {
    if(!findString) {
      return
    }
    const foundFilms = searchMovies(findString, films);
    if (foundFilms.length === 0) {
      setFiltredMovies([false])
      return
    }

    if (thumbler) {
      const shortFilms = showShortFilms(foundFilms)
      setFiltredMovies(shortFilms.length > 0  ? shortFilms : [false])
    } else {
      setFiltredMovies(foundFilms.length > 0  ? foundFilms : [false]);
    }
  }

  function onSearch({ findString , thumbler }) {
    setFilterString(findString);
    handleShortFilms(thumbler, savedMovies, findString);
  }

  const [filtredMovies, setFiltredMovies] = useState([]);
  const [filterString, setFilterString] = useState(false);

   useEffect(() => {
    setFiltredMovies(savedMovies);
  }, [savedMovies]);

  return (
    <section aria-label='saved-movies'>
      <SearchForm
        onSubmit={onSearch}
        handleShortFilms={handleShortFilms} />
      <MoviesCardList
        movieList={filtredMovies}
        savedMovies={savedMovies}
        onDelete={onDelete} />
        {onLoad && <Preloader />}
    </section>
  );
}

export default SavedMovies;
