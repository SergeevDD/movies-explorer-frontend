import FormContainer from "../FormContainer/FormContainer";
import useInputValdator from "../../utils/useInputValidator";
import { useState } from "react";

function Login({ handleLogin, onRequest }) {

  const email = useInputValdator('');
  const password = useInputValdator('');
  const [apiError, setApiError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      email: email.value,
      password: password.value,
    }
    ).then((loginResult) => {
      if (loginResult) {
        setApiError(loginResult);
      }
    })
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
            disabled={onRequest}
            onChange={email.handleChangeValue}
            type="email"
            name="email"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
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
            disabled={onRequest}
            onChange={password.handleChangeValue}
            type="password"
            name="password"
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
        <span className="form-container__error form-container__error_api">{apiError}</span>
        <button
          disabled={(!email.validity || !password.validity) || onRequest}
          name="loginBtn"
          type="submit"
          className={`form-container__button
          ${(password.validity && email.validity) && !onRequest ? '' : 'form-container__button_disabled'}`
          }>
          {onRequest ? 'Вход ...':'Войти'}
        </button>
      </>
    </FormContainer>
  );
}

export default Login;
