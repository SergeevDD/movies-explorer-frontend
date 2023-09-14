import { useState, useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useInputValdator from "../../utils/useInputValidator";

function Profile({ logout, onSubmit, onRequest }) {

  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [apiError, setApiError] = useState('');
  const [lock, setLock] = useState(true);

  const name = useInputValdator(currentUser.name);
  const email = useInputValdator(currentUser.email);

  const currentName = useRef(currentUser.name);
  const currentEmail = useRef(currentUser.email);

  useEffect(() => {
    if (
      name.value !== currentName.current ||
      email.value !== currentEmail.current
    ) {
      setLock(false);
    } else {
      setLock(true);
    }

  }, [name, email])

  useEffect(() => {
    name.handleSetValid();
    email.handleSetValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  function handleEditUser() {
    setIsEdit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      email: email.value,
      name: name.value
    }).then((profileResult) => {
      if (profileResult) {
        setApiError(profileResult);
      } else {
        setIsEdit(false);
        currentName.current=name.value;
        currentEmail.current=email.value;
      }
    })
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
              disabled={isEdit || onRequest}
              onChange={name.handleChangeValue}
              name='name'
              type="text"
              pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
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
              disabled={isEdit || onRequest}
              onChange={email.handleChangeValue}
              type="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
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
              <span className="profile__error">
                {apiError}
              </span>
              <button
                disabled={((!email.isCanged || !name.isCanged) && (!email.validity || !name.validity)) || onRequest}
                type="submit"
                className={`profile__button-save
                ${((email.isCanged || name.isCanged) && (name.validity && email.validity)) && !onRequest ? '' : 'profile__button-save_disabled'}`
                }
              >
                {onRequest ? 'Сохранение ...' : 'Сохранить'}
              </button>
            </>)
          }
          {!isEdit &&
            (<>
              <button
                type="button"
                className={`profile__button ${!lock ? '' : 'profile__button_disabled'}`
                }
                disabled={lock}
                onClick={handleEditUser}
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
