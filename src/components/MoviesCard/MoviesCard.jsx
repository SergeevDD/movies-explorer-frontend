

function MoviesCard({name, url, duration, owner}) {

  return (
    <li className="card">
      <img
        className="card__image"
        alt={name}
        src={url}
      />
      <h2 className="card__name">{name}</h2>
      <p className="card__duration">{`${duration.hour}ч ${duration.minutes}м`}</p>
      {<button type="button" className={`card__btn ${ owner ? 'card__btn_saved' : 'card__btn_save'}`}></button>}
      {<button type="button" className='card__btn card__btn_delete'></button>}
    </li>
  );
}

export default MoviesCard;
