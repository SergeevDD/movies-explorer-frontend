function AboutProject() {

  return (
    <section className="about" id="aboutproject">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__list">
        <li className="about__cell">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
            финальные доработки.
          </p>
        </li>
        <li className="about__cell">
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </li>
      </ul>
      <table className="about__table">
        <thead>
          <tr>
            <th className="about__heading about__heading_green">1 неделя</th>
            <th className="about__heading">4 недели</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="about__text">Back-end</th>
            <th className="about__text">Front-end</th>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default AboutProject;
