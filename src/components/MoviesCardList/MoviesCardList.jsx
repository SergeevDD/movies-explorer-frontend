import { useCallback, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movieList, onRequest }) {

  const location = useNavigate();


  const convertToHour = useCallback((duration) => {
    return {
      hour: (duration / 60).toFixed(0),
      minutes: duration % 60
    }
  }, [])

  return (
    <section className="movie" aria-label="films">
      {onRequest && <Preloader />}
      {movieList[0] ? <ul className="movie__list">
        {movieList.map((movie) => (<MoviesCard
          key={movie._id || movie.id}
          name={movie.nameRU}
          url={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` :
            movie.image}
          duration={convertToHour(movie.duration)}
          owner={movie.owner || false} />)
        )}
      </ul> :
        !movieList[0] && <p className='movie__text'>Ничего не найдено</p>
      }
    </section>
  );
}

export default MoviesCardList;
