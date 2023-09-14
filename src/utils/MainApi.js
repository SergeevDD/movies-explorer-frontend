import Api from "./Api";
import { API_URL } from "./config";

const url = API_URL.MAIN;
const api = new Api({
  baseUrl: url,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function checkToken() {
  return api.request(`check`, {
    method: 'GET',
    headers: api.headers,
    credentials: "include",
  })
};

export function getCurrentUserData() {
  return api.request(`users/me`, {
    method: 'GET',
    headers: api.headers,
    credentials: "include",
  })
};

export function updateCurrentUserData({ email, name }) {
  return api.request(`users/me`, {
    method: 'PATCH',
    headers: api.headers,
    credentials: "include",
    body: JSON.stringify({
      name: name,
      email: email,
    })
  })
};

export function getUserMovies() {
  return api.request(`movies`, {
    method: 'GET',
    headers: api.headers,
    credentials: "include",
  })
};

export function addUserFilm(
  {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  }) {
  return api.request(`movies`, {
    method: 'POST',
    headers: api.headers,
    credentials: "include",
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailerLink: trailer,
      nameRU: nameRU,
      nameEN: nameEN,
      thumbnail: thumbnail,
      movieId: movieId,
    })
  })
};

export function removeUserFilm(filmID) {
  return api.request(`movies/${filmID}`, {
    credentials: "include",
    method: 'DELETE',
    headers: api.headers
  })
}

export function authorize({ email, password }) {
  return api.request(`signin`, {
    method: 'POST',
    headers: api.headers,
    credentials: "include",
    body: JSON.stringify({
      password,
      email,
    })
  })
};

export function register({ name, email, password }) {
  return api.request(`signup`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify({
      name,
      email,
      password,
    })
  })
};

export function logout() {
  return api.request(`signout`, {
    method: 'DELETE',
    headers: api.headers,
    credentials: "include",
  })
};
