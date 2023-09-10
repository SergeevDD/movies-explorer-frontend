
export function showShortFilms(films) {
  console.log(films);
  return films.filter((film) =>
    film.duration <= 40
  )
}

export function searchMovies(key, store) {
  console.log(key);
  const findedFilms = store.filter((movie) => {
    const regexp = new RegExp(`${key}`, 'im');
    return regexp.test(`${movie.nameRU} ${movie.nameEN}`)
  });
  return findedFilms
}

export function searchBeatfilm(key, store) {
  console.log(key);
  const films = searchMovies(key, store)
  console.log(films);
  localStorage.setItem('findResult', JSON.stringify({
    films: films,
    checkbox: key.checkbox
  }));
  return films;
}

