import { redirect, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
   redirect('/404')

  function handleBack() {
    navigate(-1)
  }

  return (
    <article className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__back-btn" onClick={handleBack}>Назад</button>
    </article>
  );
}

export default NotFound;
