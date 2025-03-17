import { useEffect } from "react";
import "./Result.css";

const Result = ({ time, setTime, months, money, result, setResult }) => {
  useEffect(() => {
    setResult(time === "month" ? money / months : (money / months) * 12);
  }, [money, months, setResult, time]);

  const buttons = [
    { name: "year", label: "в год" },
    { name: "month", label: "в месяц" },
  ];

  const timeButtons = buttons.map(({ name, label }) => {
    const isActive = time === name;
    const buttonClass = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button
          type="button"
          className={`result__button ${buttonClass}`}
          onClick={() => setTime(name)}
        >
          {label}
        </button>
      </li>
    );
  });

  const formatResult = (value) => {
    return (
      value
        .toString()
        .split("")
        .map((num, i, arr) => {
          return (arr.length - 1 - i) % 3 === 0 && i !== arr.length - 1
            ? num + " "
            : num;
        })
        .join("") + " рублей"
    );
  };

  return (
    <div className="result">
      <span className="result__text">Итого ваш платеж по кредиту:</span>
      <ul className="result__buttons">{timeButtons}</ul>
      <span className="result__result-show">
        {formatResult(Math.ceil(result))}
      </span>
    </div>
  );
};

export default Result;
