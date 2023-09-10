import FormContainer from "../FormContainer/FormContainer";
import useInputValdator from "../../utils/useInputValidator";

function Login({ handleLogin }) {

  const email = useInputValdator('');
  const password = useInputValdator('');

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      email: email.value,
      password: password.value,
    }
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <>
        <fieldset className="form-container__input-field">
          <label
            htmlFor="input-mail-login"
            className="form-container__input-name"
          >
            E-mail
          </label>
          <input
            onChange={email.handleChangeValue}
            type="email"
            name="email"
            id="input-mail-login"
            className="form-container__input"
            placeholder="pochta@yandex.ru"
            required
            value={email.value}
          />
          <span
            className="form-container__error"
            id="input-placename-error"
          >
            {email.validateMsg}
          </span>
          <label
            htmlFor="input-pass-login"
            className="form-container__input-name"
          >
            Пароль
          </label>
          <input
            onChange={password.handleChangeValue}
            type="password"
            name="passwrd"
            id='input-pass-login'
            placeholder="Введите пароль"
            className="form-container__input"
            required
            value={password.value}
          />
          <span
            className="form-container__error"
          >
            {password.validateMsg}
          </span>
        </fieldset>
        <button
          disabled={!email.validity || !password.validity}
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
