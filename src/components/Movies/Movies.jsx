import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm';

function Movies() {

  return (
    <section>
      <SearchForm />
      <MoviesCardList store={true} />
    </section>
  );
}

export default Movies;
