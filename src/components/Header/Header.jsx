import logo from '../../images/logo/logo.svg';
import Navigation from '../Navigation/Navigation';
import burger from '../../images/logo/burger.svg';
import { MenuContext } from '../../contexts/menuStateContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {

  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);
  const menuHandler = () => {
    toggleMenuMode();
  }

  return (
    <header className="header">
      <Link to="/" className='header__link'>
        <img className="header__logo"
          src={logo}
          alt="логотип"
        />
      </Link>
      {loggedIn ?
        <Navigation isMenuOpen={isMenuOpen} menuHandler={menuHandler} /> :
        <div className='header__login'>
          <Link to='sign-up' className="header__link">Регистрация</Link>
          <Link to='sign-in' className="header__link header__link_green">Войти</Link>
        </div>
      }
      {loggedIn && <img className="header__menu"
        src={burger}
        alt="меню"
        onClick={menuHandler}
      />}

    </header >
  );
}

export default Header;
