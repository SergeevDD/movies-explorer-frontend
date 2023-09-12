import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NavState from '../../contexts/menuStateContext'
import Main from '../Main/Main'
import Preloader from '../Preloader/Preloader'
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
import { getMoviesList } from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoContainer from '../InfoContainer/InfoContainer';

function App() {

  const navigate = useNavigate();

  function handleUpdateUserData({ name, email }) {
    updateCurrentUserData({ name, email })
      .then((newUser) => {
        setCurrentUser(newUser);
        addToolTip('access', `Данные пользователя ${newUser.name} обновлены.`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка обновленя данных пользователя: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      });
  }

  function handleRegister({ name, email, password }) {
    register({ name, email, password })
      .then((user) => {
        if (user.email === email) {
          addToolTip('access', `Пользователь ${user.name} успешно зарегистрирован.`);
          navigate("/sign-in", { replace: true })
        }
      })
      .catch(err => {
        addToolTip('error', `Ошибка регистрации пользователя пользователя: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      });
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((user) => {
        if (user.email === email) {
          handleCheckToken();
        } else {
          addToolTip('error', `Сервер вернул не корректную почту`);
        }
      })
      .catch((err) => {
        addToolTip('error', `Ошибка авторизации: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text);
      });
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
          localStorage.removeItem('findResult');
          localStorage.removeItem('thumbler');
          localStorage.removeItem('findString');
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
        addToolTip('access', `Фильм ${newFilm.name} добавлен в коллекцию`);
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

  function handleDeleteMovie() {
    removeUserFilm(wantToDelete)
      .then((newFilm) => {
        setUserMovies(state => state.filter((c) => c._id !== wantToDelete._id));
        addToolTip('access', `Фильм ${newFilm.name} удален из коллекции`);
      })
      .catch((err) => {
        addToolTip('error', `Ошибка добавления фильма в коллекцию: ${err.text}`);
        console.log('Ошибка: ', err.status, err.text)
      })
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
  return  checkToken()
      .then((res) => {
        if (res.status) {
          console.log(res.status, 'status');
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        } else {
          console.log(res.status, 'status2');
          setLoggedIn(false);
          navigate("/", { replace: true });
          addToolTip('error', `Просмотр в гостевом режиме, авторизируйтесь`);
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


  useEffect(() => {
    handleCheckToken();
    if (isLoggedIn) {
      handleGetUser();
      Promise.all([getMoviesList(), getUserMovies()])
        .then(([movies, savedMovies]) => {
          setUserMovies(savedMovies);
          setMovies(movies);
        })
        .catch((err) => {
          addToolTip('error', `Проблема с соединением или сервер недоступен. Попробуйте позже`);
          console.log('Ошибка: ', err.status, err.text);
        })
        .finally(() => setIsLoading(false))
    }
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
                  onDelete={confirmDelete}
                  onLoad={isLoading}
                />}
              />
              <Route path="/saved-movies" element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={isLoggedIn}
                  savedMovies={userMoviesStore}
                  onDelete={confirmDelete}
                />}
              />
              <Route path="/profile" element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={isLoggedIn}
                  logout={handleLogout}
                  onSubmit={handleUpdateUserData}
                />}
              />
              <Route path="/sign-up" element={
                <Register
                  handleRegister={handleRegister}
                />}
              />
              <Route path="/sign-in" element={
                <Login
                  handleLogin={handleLogin}
                />}
              />
              <Route path='/404' element={<NotFound />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

          </main>
        </NavState>
      </CurrentUserContext.Provider>
      {isDeleteOpen &&
        <DeletePopup
          film={wantToDelete}
          isOpen={isDeleteOpen}
          onClose={setIsDeleteOpen}
          onDeleteMovie={handleDeleteMovie}
        />
      }
      {renderFooter(location) && <Footer />}
      {toolTips.length !== 0 && <InfoContainer tipsList={toolTips} onDelete={deleteToolTip} />}
    </>
  );
}

export default App;
