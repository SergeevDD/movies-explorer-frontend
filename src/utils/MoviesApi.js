import Api from "./Api";

const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 3c534f09-d342-4d2e-b9ef-3f9b232c8ade',
  }
})

export function getMoviesList() {
  return api.request(`beatfilm-movies`, {
    method: 'GET',
    headers: api.headers
  })
}
