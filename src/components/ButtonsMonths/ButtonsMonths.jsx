import "./ButtonsMonths.css";

const ButtonsMonths = ({ months, setMonths }) => {
  const buttons = [
    { name: "12", label: "12" },
    { name: "24", label: "24" },
    { name: "36", label: "36" },
    { name: "48", label: "48" },
  ];

  const amountButtons = buttons.map(({ name, label }) => {
    const isActive = months === name;
    const buttonClass = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button
          type="button"
          className={`buttons-months__button ${buttonClass}`}
          onClick={() => setMonths(name)}
        >
          {label}
        </button>
      </li>
    );
  });

  return (
    <div className="buttons-months">
      <span className="buttons-months__text">Количество месяцев?</span>
      <ul className="buttons-months__buttons">{amountButtons}</ul>
    </div>
  );
};

export default ButtonsMonths;
