import { useState } from "react";
import ButtonsMonths from "../ButtonsMonths/ButtonsMonths";
import Result from "../Result/Result";
import "./Popup.css";

import close from "../../assets/images/jam_close.svg";

const Popup = ({ months, setMonths, time, setTime }) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);

  const formatInput = (value) => {
    value = value.toString().replaceAll("₽", "").replaceAll(" ", "");
    return (
      value
        .toString()
        .split("")
        .map((num, i, arr) => {
          return (arr.length - 1 - i) % 3 === 0 && i !== arr.length - 1
            ? num + " "
            : num;
        })
        .join("") + " ₽"
    );
  };

  const onChangeInputValue = (event) => {
    event.target.value = event.target.value
      .toString()
      .replaceAll("₽", "")
      .replaceAll(" ", "");
    if (!/^\d+$/.test(event.target.value)) return;

    if (event.target.value === inputValue) {
      event.target.value = event.target.value.slice(0, -1);
    }

    if (event.target.value) {
      document.querySelector(".popup__input-error").style.display = "none";
      document
        .querySelector(".popup__input")
        .classList.remove("popup__input_border-error");
      document.querySelector(".result").style.display = "none";
    } else {
      return setInputValue("");
    }
    setInputValue(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!inputValue) {
      document.querySelector(".popup__input-error").style.display = "inline";
      document
        .querySelector(".popup__input")
        .classList.add("popup__input_border-error");
    } else {
      document.querySelector(".result").style.display = "flex";
    }
  };

  const popupClose = () => {
    document.querySelector(".popup").style.display = "none";
    setInputValue("");
    setMonths("12");
    document.querySelector(".result").style.display = "none";
  };

  const popupAddResult = () => {
    const resultObj = {
      "Сумма кредита": formatInput(inputValue),
      "Количество месяцев": months,
      "Платеж по кредиту": time === "year" ? "в год" : "в месяц",
      "Сумма платежа": result,
    };
    console.log(resultObj);
    return popupClose();
  };

  return (
    <div className="popup">
      <div className="popup__background" onClick={popupClose} />
      <div className="popup__content">
        <div className="popup__content-wrapper">
          <button
            type="button"
            className="popup__button-close"
            onClick={popupClose}
          >
            <img src={close} alt="close" />
          </button>
          <h2 className="popup__title">Платежи по кредиту</h2>
          <p className="popup__text">
            Введите сумму кредита и выберите срок, на который вы хотите его
            оформить.<br></br>Мы автоматически рассчитаем для вас ежемесячный
            платеж, чтобы вы могли лучше спланировать свои финансы.
          </p>

          <form className="popup__form" onSubmit={onSubmitForm}>
            <label htmlFor="popup-input" className="popup__label">
              Ваша сумма кредита
            </label>
            <div className="popup__input-wrapper">
              <input
                id="popup-input"
                type="text"
                placeholder="Введите данные"
                className="popup__input"
                value={inputValue ? formatInput(inputValue) : ""}
                onChange={(e) => onChangeInputValue(e)}
              />
              <span className="popup__input-error">
                Поле обязательно для заполнения
              </span>
            </div>
            <button type="submit" className="popup__button-calc">
              Рассчитать
            </button>
          </form>

          <ButtonsMonths months={months} setMonths={setMonths} />
          <Result
            time={time}
            setTime={setTime}
            months={months}
            money={inputValue}
            result={result}
            setResult={setResult}
          />
        </div>

        <button
          type="button"
          className="popup__button-add"
          onClick={popupAddResult}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default Popup;
