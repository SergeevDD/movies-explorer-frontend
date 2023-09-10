export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({
      text: response.statusText,
      status: response.status
    });
  }

  request(url, options) {
    return fetch(`${this._baseUrl + url}`, options)
      .then(this._checkResponse)
  }
}

