import { useEffect, useState } from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { searchBeatfilm, showShortFilms } from '../../utils/Search'
import { getMoviesList } from '../../utils/MoviesApi'
import useResize from '../../utils/useResizer'


function Movies({ movies, setMovies, savedMovies, onSave, onDelete, addToolTip }) {

  function onSearch({ name }) {
    localStorage.setItem('findString', name);
    localStorage.setItem('thumbler', filter);
    const found = searchBeatfilm(name, movies)
    if (filter) {
      const foundShort = showShortFilms(found);
      setFiltredMovies(foundShort.length === 0 ? [false] : foundShort)
    } else {
      setFiltredMovies(searchBeatfilm(name, movies))
    }
  }
  const { size } = useResize();
  const [filtredMovies, setFiltredMovies] = useState([false]);
  const [filter, toggleFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showedCount, setShowedCount] = useState(0);
  const [moreBtn, setMoreBtn] = useState(false);


  useEffect(() => {
    getMoviesList()
      .then((list) => {
        setMovies(list)
      })
      .catch((err) => {
        addToolTip('error', `Сервер Beat Film сейчас недоступен, попробуйте позже: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text);
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('findResult')) {
      const pastSearchResult = JSON.parse(localStorage.getItem('findResult')).films;
      if (pastSearchResult.length > size.quantity) {
        setMoreBtn(true);
        setShowedCount(size.quantity);
        /* Повторяется после поиска коротких работакет только при монтировании*/
      }
      if (filter) {
        const filmList = showShortFilms(pastSearchResult)
        setFiltredMovies(filmList.length === 0 ? [false] : filmList)
      } else {
        setFiltredMovies(pastSearchResult.slice(0,showedCount))
      }
    }
  }, [filter])


  return (
    <section>
      {console.log(size)}
      <SearchForm handleCheckBox={toggleFilter} onSubmit={onSearch} />
      <MoviesCardList
        movieList={filtredMovies}
        onDelete={onDelete}
        onRequest={isLoading}
      />
      {moreBtn &&
        <button
          className='movie__button-more'
        >
          Ещё
        </button>}
    </section>
  );
}

export default Movies;
