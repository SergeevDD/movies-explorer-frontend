import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  function logout() {
    navigate('/');
  }

  const [isEdit, setIsEdit] = useState(false)

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${'Виталий!'}`}</h2>
      <form
        className="profile__form"
        noValidate
      >
        <fieldset className="profile__input-field">
          <label className="profile__input-name profile__input-name_underline">Имя
            <input
              name='name'
              type="text"
              className="profile__input"
              required
              minLength="2"
              maxLength="40"
              placeholder="Виталий"
            />

          </label>
          <span
            className="profile__error"
          >
          </span>
          <label className="profile__input-name">E-mail
            <input
              type="email"
              name="email"
              className="profile__input"
              required minLength="2"
              maxLength="200"
              placeholder="pochta@yandex.ru"
            />

          </label>
          <span
            className="profile__error"
          >
          </span>
        </fieldset>
        <div className="profile__button-container">
          {isEdit && (<>
            <span
              className="profile__error"
            >
              При обновлении профиля произошла ошибка.
            </span>
            <button
              type="submit"
              className={`profile__button-save `}
            >
              Сохранить
            </button></>)}
          {!isEdit &&
            (<>
              <button
                type="submit"
                className={`profile__button `}
                onClick={() => setIsEdit(true)}
                navigate
              >
                Редактировать
              </button>
              <button
                type="submit"
                className={`profile__button profile__button-exit`}
                onClick={logout}
              >
                Выйти из аккаунта
              </button></>)}
        </div>
      </form>
    </section>
  );
}

export default Profile;
