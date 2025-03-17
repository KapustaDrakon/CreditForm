import { useEffect } from "react";
import styled from "styled-components";

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
      <ResultButtonsLi key={name}>
        <ResultButton
          type="button"
          id="result__button"
          className={buttonClass}
          onClick={() => setTime(name)}
        >
          {label}
        </ResultButton>
      </ResultButtonsLi>
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
    <ResultContainer id="result">
      <ResultText>Итого ваш платеж по кредиту:</ResultText>
      <ResultButtonsUl>{timeButtons}</ResultButtonsUl>
      <ResultShow>{formatResult(Math.ceil(result))}</ResultShow>
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  margin-top: 16px;
  display: none;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 38px;

  @media (min-width: 768px) {
    margin-top: 18px;
    gap: 17px;
    margin-bottom: 80px;
  }

  @media (min-width: 1440px) {
    margin-top: 22px;
    margin-bottom: 49px;
    gap: 11px;
  }
`;

const ResultText = styled.span`
  font-family: "Lab Grotesque Medium";
  font-size: 14px;
  line-height: 24px;
`;

const ResultButtonsUl = styled.ul`
  display: flex;
  gap: 6px;
`;

const ResultButtonsLi = styled.li`
  & .selected {
    background: linear-gradient(
        to left bottom,
        rgba(220, 49, 49, 1) 0%,
        rgba(255, 79, 79, 0) 93%
      ),
      #ff5e56;
    color: #ffffff;
  }
`;

const ResultButton = styled.button`
  font-family: "Lab Grotesque Regular";
  background: #eef0f2;
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const ResultShow = styled.span`
  font-size: 20px;
  line-height: 24px;
  margin-top: 8px;

  @media (min-width: 768px) {
    margin-top: 9px;
  }

  @media (min-width: 1440px) {
    margin-top: 20px;
  }
`;
