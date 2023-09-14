import Api from "./Api";
import { API_URL } from "./config";

const api = new Api({
  baseUrl: API_URL.BEATFILM,
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
