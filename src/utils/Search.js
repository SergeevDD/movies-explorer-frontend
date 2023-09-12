
export function showShortFilms(films) {
  const shortFilms = films.filter((film) => film.duration <= 40)
  return shortFilms
}

export function searchMovies(key, store) {
  console.log(key);
  const regexp = new RegExp(`${key}`, 'im');
  const findedFilms = store.filter((movie) => {
    return regexp.test(`${movie.nameRU} ${movie.nameEN}`)
  });
  return findedFilms
}

export function searchBeatfilm(key, store) {
  console.log(key);
  const films = searchMovies(key.findString, store)
  localStorage.setItem('findResult', JSON.stringify(films));
  localStorage.setItem('thumbler', key.thumbler);
  localStorage.setItem('findString', key.findString);
  localStorage.setItem('findShortResult', JSON.stringify(showShortFilms(films)));
  return films;
}

