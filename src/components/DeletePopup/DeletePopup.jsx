function DeleteCardPopup({ isOpen, onClose, onDelete }) {

  function handleDelete() {
    onDelete();
    onClose(false)
  }

  function closePopup() {
    onClose(false);
  }

  return (
    <section
      className={`popup ${isOpen ? 'popup_open' : ''}`}
      aria-label='delete-popup'
    >
      <div className="popup__container">
        <h2 className="popup__title">{`Удалить фильм из коллекции?`}</h2>
        <button
          onClick={handleDelete}
          className="popup__button popup__button_confirm"
          type="button"
        >Да
        </button>
        <button
          onClick={closePopup}
          className="popup__button"
          type="button"
        >Нет
        </button>
      </div>
    </section>);
}

export default DeleteCardPopup;
