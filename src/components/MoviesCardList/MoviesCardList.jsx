import MoviesCard from '../MoviesCard/MoviesCard'
import { movies } from '../../tempMoviesList'

function MoviedCardList() {
  return (
    <section className="movie" aria-label="films">
      <ul className="movie__list">
        {movies.map((movie) =>
        (<MoviesCard
          key={movie._id}
          movie={movie}
        />)
        )}
      </ul>
      <button className='movie__button-more'>Ещё</button>
    </section>
  );
}

export default MoviedCardList;
