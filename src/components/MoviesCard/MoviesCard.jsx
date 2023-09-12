import { useLocation } from "react-router-dom";

function MoviesCard({ id, movie, url, duration, onSave, onDelete, savedMovies }) {

  const moviePage = useLocation().pathname === '/movies';
  const isSaved = savedMovies.some(m => m.nameEN === movie.nameEN);
  if (moviePage && isSaved) {
    const savedFilm = savedMovies.find(m => m.nameEN === movie.nameEN);
    id = savedFilm._id
  }

  function handleSave() {
    onSave(
      {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: url,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }
    )
  }

  function handleDelete() {
      onDelete(id)
  }

  return (
    <li className="card">
      <img
        className="card__image"
        alt={movie.nameRU}
        src={url}
      />
      <h2 className="card__name">{movie.nameRU}</h2>
      <p className="card__duration">
        {duration.hour > 0 ?
          `${duration.hour}ч ${duration.minutes}м` :
          `${duration.minutes}м`
        }
      </p>
      {moviePage &&
        <button
          type="button"
          className={`card__btn ${isSaved ? 'card__btn_saved' : 'card__btn_save'}`}
          onClick={isSaved ? handleDelete : handleSave}
        >
        </button>}
      {!moviePage &&
        <button
          type="button"
          className='card__btn card__btn_delete'
          onClick={handleDelete}
        >
        </button>}
    </li>
  );
}

export default MoviesCard;

/* import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id } = useContext(CurrentUserContext);
  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some(i => i._id === _id);
  const cardLikeButtonClassName = (
    `photo__like-btn ${isLiked && 'photo__like-btn_active'}`
  );

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card, isLiked)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return (
    <li className="photo__card">
      <img
        onClick={handleClick}
        className="photo__image"
        alt={card.name}
        src={card.link}
      />
      <h2 className="photo__name">{card.name}</h2>
      <label className="photo__likes">
        <button
          onClick={handleLikeClick}
          type="button"
          className={cardLikeButtonClassName}>
        </button>
        <span className="photo__like-value">{card.likes.length}</span>
      </label>
      {isOwn && <button className="photo__delete-btn" onClick={handleDeleteClick} />}
    </li>
  )
}

export default Card */
