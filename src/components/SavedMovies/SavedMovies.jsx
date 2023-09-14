import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { searchMovies, showShortFilms } from '../../utils/Search'
import Preloader from '../Preloader/Preloader'

function SavedMovies({ savedMovies, onDelete, onLoad }) {

  function handleFindFilms(thumbler, films = savedMovies, findString = filterString) {
    setFilter(thumbler)
    if (findString === '') {
      thumbler ?
        setFiltredMovies(films.length > 0 ? showShortFilms(films) : []) :
        setFiltredMovies(films.length > 0 ? films : []);
      return
    }
    const foundFilms = searchMovies(findString, films);
    if (foundFilms.length === 0) {
      setFiltredMovies([false])
      return
    }
    if (thumbler) {
      console.log(thumbler);
      const shortFilms = showShortFilms(foundFilms)
      setFiltredMovies(shortFilms.length > 0 ? shortFilms : [false])
    } else {
      setFiltredMovies(foundFilms.length > 0 ? foundFilms : [false]);
    }
  }

  function onSearch({ findString, thumbler }) {
    setFilter(thumbler);
    setFilterString(findString);
    handleFindFilms(thumbler, savedMovies, findString);
  }
  const [filter, setFilter] = useState();
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    handleFindFilms(filter, savedMovies, filterString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);

  return (
    <section aria-label='saved-movies'>
      <SearchForm
        onSubmit={onSearch}
        handleShortFilms={handleFindFilms} />
      {onLoad && <Preloader />}
      <MoviesCardList
        movieList={filtredMovies}
        savedMovies={savedMovies}
        onDelete={onDelete} />
    </section>
  );
}

export default SavedMovies;
