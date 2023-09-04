import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <article className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      {console.log(navigate)}
      <button className="not-found__back-btn" onClick={() => navigate(-1)}>Назад</button>
    </article>
  );
}

export default NotFound;
