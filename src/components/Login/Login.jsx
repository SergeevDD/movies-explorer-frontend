import FormContainer from "../FormContainer/FormContainer";

function Login() {

  return (
    <FormContainer>
    <>
      <fieldset className="form-container__input-field">
      <label
            htmlFor="input-mail-login"
            className="form-container__input-name"
          >
            E-mail
          </label>
        <input
          type="email"
          name="email"
          id="input-mail-login"
          className="form-container__input"
          placeholder="pochta@yandex.ru"
          required
          minLength="2"
          maxLength="30"
        />
        <span
          className="form-container__error"
          id="input-placename-error">
        </span>
        <label
            htmlFor="input-pass-login"
            className="form-container__input-name"
          >
            Пароль
          </label>
        <input
          type="password"
          name="passwrd"
          id='input-pass-login'
          placeholder="Введите пароль"
          className="form-container__input"
          required
        />
        <span
          className="form-container__error">
        </span>
      </fieldset>
      <button
        name="loginBtn"
        type="submit"
        className='form-container__button'>
        Войти
      </button>
    </>
    </FormContainer>
  );
}

export default Login;
