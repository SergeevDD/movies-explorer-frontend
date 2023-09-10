import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from "../../images/logo/logo.svg"


function FormContainer({ onSubmit, children, ...props }) {


const location = useLocation().pathname === '/sign-up';

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
        <h2 className="form-container__title">{location ? 'Добро пожаловать!' : 'Рады видеть!'}</h2>
        {children}
      </form>
      <span className="form-container__text">
        {
          `${location ? 'Уже ' : 'Ещё не '}зарегистрированы?`
        }
        <Link to={location ? '/sign-in' : '/sign-up'}
        className="form-container__link">
          {location ? 'Войти' : 'Регистрация'}
        </Link>
      </span>

    </section>
  );
}

export default FormContainer;
