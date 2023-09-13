import FormContainer from "../FormContainer/FormContainer";
import useInputValdator from "../../utils/useInputValidator";
import {  useState } from "react";

function Register({ handleRegister }) {

  const name = useInputValdator('');
  const email = useInputValdator('');
  const password = useInputValdator('');
  const [apiError, setApiError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({
      email: email.value,
      password: password.value,
      name: name.value
    }).then((registerResult) => {
       if (registerResult) {
        setApiError(registerResult);
      }
    })
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <>
        <fieldset className="form-container__input-field">
          <label
            htmlFor="input-name"
            className="form-container__input-name"
          >
            Имя
          </label>
          <input
            onChange={name.handleChangeValue}
            type="text"
            name="name"
            pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
            id="input-name"
            className="form-container__input"
            required
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            value={name.value}
          />
          <span
            className="form-container__error"
            id="input-placename-error"
          >
            {name.validateMsg}
          </span>
          <label
            htmlFor="input-mail"
            className="form-container__input-name"
          >
            E-mail
          </label>
          <input
            onChange={email.handleChangeValue}
            type="email"
            name="email"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            id="input-mail"
            className="form-container__input"
            placeholder="pochta@yandex.ru"
            required
            value={email.value}
          />
          <span
            className="form-container__error"
          >
            {email.validateMsg}
          </span>
          <label
            htmlFor="input-pass"
            className="form-container__input-name"
          >
            Пароль
          </label>
          <input
            onChange={password.handleChangeValue}
            type="password"
            name="password"
            id="input-pass"
            className="form-container__input"
            placeholder="Введите пароль"
            required
            minLength="2"
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
          disabled={!password.validity || !email.validity || !name.validity}
          name="registerBtn"
          type="submit"
          className=
          {`form-container__button
          ${password.validity && email.validity && name.validity ? '' : 'form-container__button_disabled'}`
          }
        >
          Зарегистрироваться
        </button>
      </>
    </FormContainer>
  );
}

export default Register;
