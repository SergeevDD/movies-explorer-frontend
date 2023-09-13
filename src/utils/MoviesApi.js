import Api from "./Api";

const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  }
})

export function getMoviesList() {
  return api.request(`beatfilm-movies`, {
    method: 'GET',
    headers: api.headers
  })
}
