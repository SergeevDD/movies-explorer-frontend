import { NavLink } from 'react-router-dom'
import profile from '../../images/logo/profile.svg'
import close from '../../images/logo/close.svg'

function Navigation({ isMenuOpen, menuHandler }) {

  return (
    <nav className={`navigation ${isMenuOpen ? 'navigation_active' : ''}`}>
      <img className='navigation__close'
        src={close}
        alt="закрыть"
        onClick={menuHandler} />
      <ul className='navigation__menu'>
        <li>
          <NavLink to="/"
            className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
            activeclassname='navigation__link navigation__link_active'
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            to="movies"
            className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
            activeclassname='navigation__link_active'
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="saved-movies"
            className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
            activeclassname='navigation__link_active'
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink to="profile">
        <img className='navigation__button'
          src={profile}
          alt="меню" />
      </NavLink>
    </nav>
  );
}

export default Navigation;
