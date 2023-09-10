import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useInputValdator from "../../utils/useInputValidator";

function Profile({ loggedIn, logout, onSubmit }) {

  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false)

  const name = useInputValdator('');
  const email = useInputValdator('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      email: email.value,
      name: name.value
    });
  }

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
      <form
        onSubmit={handleSubmit}
        className="profile__form"
        noValidate
      >
        <fieldset className="profile__input-field">
          <label className="profile__input-name profile__input-name_underline">
            Имя
            <input
              onChange={name.handleChangeValue}
              name='name'
              type="text"
              pattern="[a-zA-Z]*"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
              placeholder="Введите имя"
              value={name.value}
            />
          </label>
          <span
            className="profile__error"
          >
            {name.validateMsg}
          </span>
          <label className="profile__input-name">
            E-mail
            <input
              onChange={email.handleChangeValue}
              type="email"
              name="email"
              className="profile__input"
              required minLength="2"
              maxLength="200"
              placeholder="pochta@yandex.ru"
              value={email.value}
            />

          </label>
          <span
            className="profile__error"
          >
            {email.validateMsg}
          </span>
        </fieldset>
        <div className="profile__button-container">
          {isEdit &&
            (<>
              <span
                className="profile__error"
              >
                При обновлении профиля произошла ошибка.
              </span>
              <button
                type="submit"
                className='profile__button-save'
              >
                Сохранить
              </button>
            </>)
          }
          {!isEdit &&
            (<>
              <button
                type="button"
                className='profile__button'
                onClick={() => setIsEdit(true)}
              >
                Редактировать
              </button>
              <button
                type="submit"
                className='profile__button profile__button-exit'
                onClick={logout}
              >
                Выйти из аккаунта
              </button>
            </>)
          }
        </div>
      </form>
    </section>
  );
}

export default Profile;
