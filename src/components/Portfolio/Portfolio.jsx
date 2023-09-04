import arrow from '../../images/logo/arrow.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__cell">
          <a className="portfolio__link"
            href="https://sergeevdd.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer">
            <span>Статичный сайт</span>
            <img className="portfolio__arrow"
            src={arrow}
            alt="стрелка"
          />
          </a>
        </li>
        <li className="portfolio__cell">
          <a className="portfolio__link"
            href="https://sergeevdd.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer">
            <span>Адаптивный сайт</span>
            <img className="portfolio__arrow"
            src={arrow}
            alt="стрелка"
          />
          </a>
        </li>
        <li className="portfolio__cell">
          <a className="portfolio__link"
            href="http://sergeev.dmitry.nomoredomains.xyz"
            target="_blank"
            rel="noreferrer">
           <span>Одностраничное приложение</span>
            <img className="portfolio__arrow"
            src={arrow}
            alt="стрелка"
          />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
