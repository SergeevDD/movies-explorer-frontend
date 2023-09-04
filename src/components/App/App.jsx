import { Route, Routes, useLocation, } from 'react-router-dom';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer'
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useState } from 'react';
import NavState from '../../contexts/menuStateContext';
import Main from '../Main/Main'
import { renderFooter, renderHeader } from '../../utils/renderChoose';
import NotFound from '../NotFound/NotFound';

function App() {

  const where = useLocation();

  const [isLoggedIn, setLoggedIn] = useState(false);



  return (
    <>
      <NavState>
        {renderHeader(where) && < Header loggedIn={isLoggedIn} />}
        <main>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
      </NavState>
      {renderFooter(where) && <Footer />}
    </>
  );
}

export default App;
