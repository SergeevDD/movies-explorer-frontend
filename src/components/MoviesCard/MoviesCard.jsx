import noImage from '../../images/noimage.jpg'

function MoviesCard({movie}) {

  return (
    <li className="card">
      <img
        className="card__image"
        alt='Постер фильма'
        src={movie.url || noImage}
      />
      <h2 className="card__name">{movie.name}</h2>
      <p className="card__duration">{movie.duration}</p>
      <button type="button" className={`card__btn ${!true ? 'card__btn_saved' : 'card__btn_save'}`}></button>
    </li>
  );
}

export default MoviesCard;
