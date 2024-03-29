import { useEffect, useState } from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { showShortFilms, searchBeatfilm } from '../../utils/Search'
import useResize from '../../utils/useResizer'
import Preloader from '../Preloader/Preloader'

function Movies({ movies, savedMovies, onSave, onDelete, onLoad, getCollection }) {

  function handleShortFilms(thumb, films = movies) {
    if (thumb && localStorage.getItem('findShortResult')) {
      const foundShort = JSON.parse(localStorage.getItem('findShortResult'));
      setFiltredMovies(foundShort.length === 0 ? [false] : foundShort)
    } else if (localStorage.getItem('findResult')) {
      const found = JSON.parse(localStorage.getItem('findResult'));
      setFiltredMovies(found.length === 0 ? [false] : found)
    }
  }

  function onSearch({ findString, thumbler }) {
    if (movies.length === 0) {
      getCollection()
        .then((movies) => {
          setListLength(size.quantity);
          const found = searchBeatfilm({ thumbler, findString }, movies)
          handleShortFilms(thumbler, found);
        })
    } else {
      setListLength(size.quantity);
      const found = searchBeatfilm({ thumbler, findString }, movies)
      handleShortFilms(thumbler, found);
    }
  }

  const { size } = useResize();
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [chunk, setChunk] = useState(size.add);
  const [moreBtn, setMoreBtn] = useState(false);

  function addMoreFilms() {
    if (filtredMovies.length >= listLength) {
      const newLength =
        listLength + chunk <= filtredMovies.length + 1 ?
          listLength + chunk :
          filtredMovies.length
      setListLength(newLength);
    }
  }

  useEffect(() => {
    setListLength(size.quantity);
    if (localStorage.getItem('findResult')) {
      const pastSearchResult = JSON.parse(localStorage.getItem('findResult'));
      if (pastSearchResult.length === 0) {
        setFiltredMovies([false])
        return
      }
      if (localStorage.getItem('thumbler') === 'true') {
        const filmList = showShortFilms(pastSearchResult)
        setFiltredMovies(filmList.length === 0 ? [false] : filmList);
      } else {
        setFiltredMovies(pastSearchResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setChunk(size.add);
  }, [size]);

  useEffect(() => {
    if (filtredMovies.length > listLength) {
      setMoreBtn(true);
    } else {
      setMoreBtn(false);
    }
  }, [filtredMovies, listLength])

  return (
    <section aria-label='movies' className='movies-main'>
      <SearchForm onSubmit={onSearch} handleShortFilms={handleShortFilms} />
      {onLoad && <Preloader />}
      <MoviesCardList
        movieList={filtredMovies}
        listLength={listLength}
        savedMovies={savedMovies}
        onSave={onSave}
        onDelete={onDelete}
        onRequest={onLoad}
      />
      <div className='movies-main__more'>
        {moreBtn &&
          <button
            onClick={addMoreFilms}
            className='movies-main__button-more'
          >
            Ещё
          </button>}
      </div>
    </section>
  );
}

export default Movies;
