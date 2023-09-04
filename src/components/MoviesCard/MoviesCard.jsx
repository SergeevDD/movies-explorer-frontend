import noImage from '../../images/noimage.jpg'

function MoviesCard({movie,store}) {

  return (
    <li className="card">
      <img
        className="card__image"
        alt={movie.name}
        src={movie.url || noImage}
      />
      {console.log(store)}
      <h2 className="card__name">{movie.name}</h2>
      <p className="card__duration">{movie.duration}</p>
      {store &&<button type="button" className={`card__btn ${movie.like ? 'card__btn_saved' : 'card__btn_save'}`}></button>}
      {!store &&<button type="button" className='card__btn card__btn_delete'></button>}
    </li>
  );
}

export default MoviesCard;
