import ToolTip from "../ToolTip/ToolTip";

function InfoContainer({ tipsList, onDelete }) {

  return (
    <section
      className="tooltip-container"
      aria-label="info"
    >
      {tipsList.map(({ _id, type, message }) =>
      (<ToolTip
        key={_id}
        type={type}
        message={message}
        onDelete={() => onDelete(_id)}
      />
      ))
      }
    </section>
  );
}

export default InfoContainer
