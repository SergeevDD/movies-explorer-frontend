import { Link } from "react-scroll";

function NavTab() {

  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__cell">
          <Link
            to="aboutproject"
            spy={true}
            smooth={true}
            duration={500}
            className='navtab__link'
          >
            О проекте
          </Link>
        </li>
        <li className="navtab__cell">
          <Link
            to="tech"
            spy={true}
            smooth={true}
            duration={500}
            className='navtab__link'
          >
            Технологии
          </Link>
        </li>
        <li className="navtab__cell">
          <Link
            to="aboutme"
            spy={true}
            smooth={true}
            duration={500}
            className='navtab__link'
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
