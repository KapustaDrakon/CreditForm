import styled from "styled-components";
import { useState } from "react";
import ButtonsMonths from "../ButtonsMonths/ButtonsMonths";
import Result from "../Result/Result";

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
      document.getElementById("popup__input-error").style.display = "none";
      document.getElementById("popup__input").style.border =
        "1px solid #dfe3e6";
      document.getElementById("result").style.display = "none";
    } else {
      return setInputValue("");
    }
    setInputValue(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!inputValue) {
      document.getElementById("popup__input-error").style.display = "inline";
      document.getElementById("popup__input").style.border =
        "1px solid #ea0029";
    } else {
      document.getElementById("result").style.display = "flex";
    }
  };

  const popupClose = () => {
    document.getElementById("popup").style.display = "none";
    setInputValue("");
    setMonths("12");
    document.getElementById("result").style.display = "none";
  };

  const popupAddResult = () => {
    const resultObj = {
      "Сумма кредита": formatInput(inputValue),
      "Количество месяцев": months,
      "Платеж по кредиту": time === "year" ? "в год" : "в месяц",
      "Сумма платежа": Math.ceil(result),
    };
    console.log(resultObj);
    return popupClose();
  };

  return (
    <PopupContainer id="popup">
      <PopupBackground onClick={popupClose} />
      <PopupContent>
        <PopupWrapper>
          <PopupButtonClose
            type="button"
            id="popup__button-close"
            onClick={popupClose}
          >
            <img src={close} alt="close" />
          </PopupButtonClose>
          <PopupTitle>Платежи по кредиту</PopupTitle>
          <PopupText>
            Введите сумму кредита и выберите срок, на который вы хотите его
            оформить.<br></br>Мы автоматически рассчитаем для вас ежемесячный
            платеж, чтобы вы могли лучше спланировать свои финансы.
          </PopupText>

          <PopupForm id="popup__form" onSubmit={onSubmitForm}>
            <PopupInputLabel htmlFor="popup__input">
              Ваша сумма кредита
            </PopupInputLabel>
            <PopupInputWrapper>
              <PopupInput
                id="popup__input"
                type="text"
                placeholder="Введите данные"
                className="popup__input"
                value={inputValue ? formatInput(inputValue) : ""}
                onChange={(e) => onChangeInputValue(e)}
              />
              <PopupInputError id="popup__input-error">
                Поле обязательно для заполнения
              </PopupInputError>
            </PopupInputWrapper>
            <PopupButtonCalc type="submit" id="popup__button-calc">
              Рассчитать
            </PopupButtonCalc>
          </PopupForm>

          <ButtonsMonths months={months} setMonths={setMonths} />
          <Result
            time={time}
            setTime={setTime}
            months={months}
            money={inputValue}
            result={result}
            setResult={setResult}
          />
        </PopupWrapper>

        <PopupButtonAdd
          type="button"
          id="popup__button-add"
          onClick={popupAddResult}
        >
          Добавить
        </PopupButtonAdd>
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;

const PopupContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  background: #ffffff;
`;

const PopupContent = styled.div`
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  background: #ffffff;
  z-index: 10;

  @media (min-width: 768px) {
    width: 453px;
    height: max-content;
    min-height: 476px;
    border-radius: 30px;
    padding: 32px;
  }

  @media (min-width: 1440px) {
    width: 552px;
  }
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const PopupWrapper = styled.div`
  width: 100%;
`;

const PopupButtonClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  background: inherit;
  padding: 6px;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    padding: 11px;
    right: 12px;

    & img {
      width: 18px;
      height: 18px;
    }
  }

  @media (min-width: 1440px) {
    right: 16px;
  }
`;

const PopupTitle = styled.h2`
  margin-top: 16px;
  margin-bottom: 16px;
  font-family: "Lab Grotesque Medium";
  font-size: 18px;
  line-height: 24px;
  font-weight: normal;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 6px;
    font-size: 28px;
    line-height: 40px;
  }
`;

const PopupText = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #808080;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 10px;
  }
`;

const PopupInputLabel = styled.label`
  font-family: "Lab Grotesque Medium";
  font-size: 14px;
  line-height: 24px;
`;

const PopupInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const PopupInput = styled.input`
  padding: 8px 10px;
  width: 100%;
  border: 1px solid #dfe3e6;
  border-radius: 3px;
  outline: none;
  caret-color: #808080;
  font-family: "Lab Grotesque Regular";
  font-size: 14px;
  line-height: 24px;
`;

const PopupInputError = styled.span`
  display: none;
  color: #ea0029;
  font-size: 10px;
  line-height: 12px;

  &:hover {
    border: 1px solid #000000;
  }

  &::placeholder {
    color: #bec5cc;
    font-size: 14px;
    line-height: 24px;
    font-family: "Lab Grotesque Regular";
  }
`;

const PopupButtonCalc = styled.button`
  background: inherit;
  border: none;
  font-family: "Lab Grotesque Medium";
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 24px;
  color: #ea0029;
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    color: #f53a31;
  }

  &:active {
    color: #ea0029;
  }

  @media (min-width: 768px) {
    margin-bottom: 17px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 16px;
  }
`;

const PopupButtonAdd = styled.button`
  width: 100%;
  height: 40px;
  font-family: "Lab Grotesque Medium";
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  background: linear-gradient(
      to left bottom,
      rgba(220, 49, 49, 1) 0%,
      rgba(255, 79, 79, 0) 93%
    ),
    #ff5e56;
  cursor: pointer;
  box-shadow: 0 0 24px rgba(234, 0, 41, 0.33);

  &:hover,
  &:active {
    background: #ea0029;
    box-shadow: 0 0 24px rgba(234, 0, 41, 0.33);
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    height: 56px;
  }
`;
