function Footer() {

  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <ul className="footer__links">
          <li>
            <a href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
              className="footer__link">Яндекс.Практикум</a>
          </li>
          <li>
            <a href="https://github.com/SergeevDD"
              target="_blank"
              rel="noreferrer"
              className="footer__link">Github</a>
          </li>
        </ul>
        <span className="footer__copyright">&copy; 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
