import styled from "styled-components";

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
      <ButtonsLi key={name}>
        <Button
          type="button"
          id="buttons-months__button"
          className={buttonClass}
          onClick={() => setMonths(name)}
        >
          {label}
        </Button>
      </ButtonsLi>
    );
  });

  return (
    <ButtonsMonthsContainer>
      <ButtonsMonthsText>Количество месяцев?</ButtonsMonthsText>
      <ButtonsUl>{amountButtons}</ButtonsUl>
    </ButtonsMonthsContainer>
  );
};

export default ButtonsMonths;

const ButtonsLi = styled.li`
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

const Button = styled.button`
  font-family: "Lab Grotesque Regular";
  font-size: 14px;
  line-height: 24px;
  background: #eef0f2;
  border: none;
  border-radius: 50px;
  padding: 6px 12px;
  cursor: pointer;
`;

const ButtonsMonthsText = styled.span`
  font-family: "Lab Grotesque Medium";
  font-size: 14px;
  line-height: 24px;
`;

const ButtonsUl = styled.ul`
  display: flex;
  gap: 8px;
`;

const ButtonsMonthsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 38px;
  }
`;
