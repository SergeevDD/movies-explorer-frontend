import { Link } from "react-router-dom";
import logo from "../../images/logo/logo.svg"

function FormContainer({ onSubmit, children }) {
  return (
    <section
      className="form-container"
    >
      <form
        onSubmit={onSubmit}
        className="form-container__form"
        name={`form`}
        noValidate
      >
        <Link to="/" className='form-container__logo'>
        <img
          src={logo}
          alt="логотип"
        />
      </Link>
      <h2 className="form-container__title">{true ? 'Добро пожаловать!' : 'Рады видеть!'}</h2>
        {children}
      </form>
      <span className="form-container__text">
        {
          `${true ? 'Уже ' : 'Ещё не '}зарегистрированы?`
        }
      <Link className="form-container__link">
        {true ? 'Войти' : 'Регистрация'}
      </Link>
      </span>

    </section>
  );
}

export default FormContainer;
