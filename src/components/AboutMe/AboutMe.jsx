import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="student" id="aboutme">
      <h2 className="student__title">Студент</h2>
      <article className="student__card">
        <h3 className="student__name">Виталий</h3>
        <span className="student__about">Фронтенд-разработчик, 30 лет</span>
        <p className="student__paragraph">
          Я родился и живу в Саратове, закончил факультет
          экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл
          курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a
          className="student__link"
          href='https://github.com/SergeevDD'
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img className='student__photo' src={photo} alt="фото студента" />
      </article>
    </section>
  )
}

export default AboutMe;
