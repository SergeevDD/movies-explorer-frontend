import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

function SavedMovies() {


    return (
      <section>
        <SearchForm />
        <MoviesCardList store={false}/>
      </section>
    );

    }

export default SavedMovies;
