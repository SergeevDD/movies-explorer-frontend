import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { searchMovies } from '../../utils/Search';

function SavedMovies({ savedMovies, onDelete }) {

  function onSearch({ key, store }) {
    setFiltredMovies(searchMovies(key, store));
  }

  const [filtredMovies, setFiltredMovies] = useState([]);
  const [filter, toggleFilter] = useState(false);

  useEffect(() => {
    console.log('ghjghjg', savedMovies);
    setFiltredMovies(savedMovies);
  }, [savedMovies]);

  return (
    <section>
      {console.log('saved>', filtredMovies)}
      <SearchForm onSubmit={onSearch} handleCheckBox={toggleFilter} />
      <MoviesCardList movieList={filtredMovies} onDelete={onDelete} />
    </section>
  );

}

export default SavedMovies;
