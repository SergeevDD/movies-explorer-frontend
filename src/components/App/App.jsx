import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NavState from '../../contexts/menuStateContext'
import Main from '../Main/Main'
import DeletePopup from '../DeletePopup/DeletePopup'
import { renderFooter, renderHeader } from '../../utils/renderChoose'
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import {
  getCurrentUserData,
  getUserMovies,
  updateCurrentUserData,
  addUserFilm,
  removeUserFilm,
  authorize,
  register,
  logout,
  checkToken
}
  from '../../utils/MainApi';
import { getMoviesList } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoContainer from '../InfoContainer/InfoContainer';
import UnknownUserElement from '../../UnknownUserRoute/UnknownUserRoute';

function App() {

  function clearStorage() {
    localStorage.removeItem('findResult');
    localStorage.removeItem('findShortResult');
    localStorage.removeItem('thumbler');
    localStorage.removeItem('findString');
    setMovies([]);
    setUserMovies([]);
  }

  function getBeatFilmCollection() {
    setIsLoading(true)
  return  getMoviesList()
      .then((movies) => {
        setMovies(movies);
        addToolTip('access', `База фильмов beatfilm загружена`);
        return movies
      })
      .catch((err) => {
        addToolTip('error', `Проблема с соединением или сервер недоступен. Попробуйте позже`);
        console.log('Ошибка: ', err.status, err.text);
      })
      .finally(() => setIsLoading(false))
  }

  function getUserCollection() {
  return  getUserMovies()
      .then((savedMovies) => {
        setUserMovies(savedMovies );
      })
      .catch((err) => {
        addToolTip('error', `Проблема с соединением или сервер недоступен. Попробуйте позже`);
        console.log('Ошибка: ', err.status, err.text);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUserData({ name, email }) {
    setOnRequest(true);
    return updateCurrentUserData({ name, email })
      .then((newUser) => {
        setCurrentUser(newUser);
        addToolTip('access', `Данные пользователя ${newUser.name} обновлены.`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка обновленя данных пользователя: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
        return ('При обновлении профиля произошла ошибка');
      })
      .finally(() => {
        setOnRequest(false);
      })
  }

  function handleRegister({ name, email, password }) {
    setOnRequest(true);
    return register({ name, email, password })
      .then((user) => {
        addToolTip('access', `Пользователь ${user.name} успешно зарегистрирован.`);
        return authorize({ email, password })
          .catch((err) => {
            addToolTip('error', `Ошибка ошибка авторизации пользователя: ${err.text}`);
            console.log('Ошибка: ', err.status, err.text);
          })
      }).then((user) => {
        if (user.email === email) {
          setLoggedIn(true);
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => {
        addToolTip('error', `Ошибка регистрации пользователя: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text);
        return ('При регистрации возникла ошибка');
      })
      .finally(() => {
        setOnRequest(false);
      })
  }

  function handleLogin({ email, password }) {
    setOnRequest(true);
    return authorize({ email, password })
      .then((user) => {
        if (user.email === email) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        } else {
          addToolTip('error', `Сервер вернул не корректную почту`);
        }
      })
      .catch((err) => {
        addToolTip('error', `Ошибка авторизации: ${err.text}`);
        console.log('Ошибка: ', err);
        return ('При авторизации возникла ошибка');
      })
      .finally(() => {
        setOnRequest(false);
      })
  }

  function handleLogout() {
    logout()
      .then((res) => {
        if (res.bye) {
          navigate("/", { replace: true })
          addToolTip('access', `Выход выполнен, до встречи ${currentUser.name}`);
          setCurrentUser({
            name: "",
            email: "",
          })
          clearStorage();
          setLoggedIn(false);
        }
      }
      )
      .catch((err) => {
        addToolTip('error', `Ошибка выхода из аккаунта: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text);
      });
  }

  function handleAddMovie(movie) {
    addUserFilm(movie)
      .then((newFilm) => {
        setUserMovies([newFilm, ...userMoviesStore]);
        addToolTip('access', `Фильм "${newFilm.nameRU}" добавлен в коллекцию`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка добавления фильма в коллекцию: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      })
  }

  function confirmDelete(id) {
    setIsDeleteOpen(true);
    setWantToDelete(id);
  }

  function handleDeleteMovie(id) {
    const filmId = wantToDelete.length > 0 ? wantToDelete : id;
    removeUserFilm(filmId)
      .then((newFilm) => {
        setUserMovies(state => state.filter((m) => m._id !== filmId));
        addToolTip('access', `Фильм "${newFilm.nameRU}" удален из коллекции`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка удаления фильма из коллекции: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      })
      .finally(() => setWantToDelete(''))
  }

  function addToolTip(type, text) {
    setToolTips([...toolTips, {
      _id: toolTips.length,
      type: type,
      message: text
    }]);
  }

  function deleteToolTip(id) {
    setToolTips(
      toolTips.filter((tip) => tip._id !== id)
    )
  }

  function handleCheckToken() {
    return checkToken()
      .then((res) => {
        if (res.status) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          clearStorage();
        }
      })
      .catch((err) => {
        addToolTip('error', `Ошибка проверки токена: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text);
      })
  }

  function handleGetUser() {
    getCurrentUserData()
      .then((user) => {
        setCurrentUser(user);
        addToolTip('access', `Вы вошли как: ${user.name}`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка получения данных пользователя: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      })
  }

  const navigate = useNavigate();
  const location = useLocation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [wantToDelete, setWantToDelete] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    {
      name: "",
      email: "",
    });
  const [moviesStore, setMovies] = useState([]);
  const [userMoviesStore, setUserMovies] = useState([]);
  const [toolTips, setToolTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  useEffect(() => {
    handleCheckToken();
    if (isLoggedIn) {
      handleGetUser();
      getUserCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <NavState>
          {renderHeader(location) && < Header loggedIn={isLoggedIn} />}
          <main>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/movies" element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={isLoggedIn}
                  movies={moviesStore}
                  savedMovies={userMoviesStore}
                  onSave={handleAddMovie}
                  onDelete={handleDeleteMovie}
                  onLoad={isLoading}
                  getCollection={getBeatFilmCollection}
                />}
              />
              <Route path="/saved-movies" element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={isLoggedIn}
                  savedMovies={userMoviesStore}
                  onDelete={confirmDelete}
                  onLoad={isLoading}
                  getCollection={getUserCollection}
                />}
              />
              <Route path="/profile" element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={isLoggedIn}
                  logout={handleLogout}
                  onSubmit={handleUpdateUserData}
                  onRequest={onRequest}
                />}
              />
              <Route path="/sign-up" element={
                <UnknownUserElement
                  loggedIn={isLoggedIn}
                  element={Register}
                  handleRegister={handleRegister}
                  onRequest={onRequest}
                />}
              />
              <Route path="/sign-in" element={
                <UnknownUserElement
                  loggedIn={isLoggedIn}
                  element={Login}
                  handleLogin={handleLogin}
                  onRequest={onRequest}
                />}
              />
              <Route path='*' element={
                <NotFound />}
              />
            </Routes>

          </main>
        </NavState>
      </CurrentUserContext.Provider>
      {isDeleteOpen &&
        <DeletePopup
          film={wantToDelete}
          isOpen={isDeleteOpen}
          onClose={setIsDeleteOpen}
          onDelete={handleDeleteMovie}
        />
      }
      {renderFooter(location) && <Footer />}
      {toolTips.length !== 0 && <InfoContainer tipsList={toolTips} onDelete={deleteToolTip} />}
    </>
  );
}

export default App;
