import { useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ movieList, listLength, savedMovies, onSave, onDelete }) {

  const convertToHour = useCallback((duration) => {
    return {
      hour: (duration / 60).toFixed(0),
      minutes: duration % 60
    }
  }, [])

  return (
    <section className="movie" aria-label="films">
      {movieList.length !== 0 && movieList[0] !== false ?
        <ul className="movie__list">
          {movieList.slice(0, listLength >= 0 ? listLength : movieList.length).map((movie) => (<MoviesCard
            key={movie._id || movie.id}
            id={movie._id || movie.id}
            movie={movie}
            url={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` :
              movie.image}
            duration={convertToHour(movie.duration)}
            savedMovies={savedMovies}
            onSave={onSave}
            onDelete={onDelete}
          />)
          )}
        </ul> :
        movieList[0] === false && <p className='movie__text'>Ничего не найдено</p>
      }
    </section>
  );
}

export default MoviesCardList;
