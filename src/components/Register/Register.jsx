import FormContainer from "../FormContainer/FormContainer";

function Register() {

  return (
    <FormContainer>
      <>
        <fieldset className="form-container__input-field">
          <label
            htmlFor="input-name"
            className="form-container__input-name"
          >
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="input-name"
            className="form-container__input"
            required
            placeholder="Виталий"
            minLength="2"
            maxLength="30"
          />
          <span
            className="form-container__error"
            id="input-placename-error">
          </span>
          <label
            htmlFor="input-mail"
            className="form-container__input-name"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="input-mail"
            className="form-container__input"
            placeholder="pochta@yandex.ru"
            required
          />
          <span
            className="form-container__error">
          </span>
          <label
            htmlFor="input-pass"
            className="form-container__input-name"
          >
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="input-pass"
            className="form-container__input"
            placeholder="Введите пароль"
            required
            minLength="2"
          />
          <span
            className="form-container__error">
          </span>
        </fieldset>
        <button
          name="registerBtn"
          type="submit"
          className='form-container__button'>
          Зарегистрироваться
        </button>
      </>
    </FormContainer>
  );
}

export default Register;
