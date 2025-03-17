import styled from "styled-components";

const ButtonShow = () => {
  const popupShow = () => {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup__input").focus();
  };

  return (
    <Button type="button" onClick={popupShow}>
      Расчет платежей
    </Button>
  );
};

export default ButtonShow;

const Button = styled.button`
  background: transparent;
  color: #ffffff;
  font-family: "Lab Grotesque Medium";
  font-size: 12px;
  line-height: 16px;
  padding: 12px 24px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  box-shadow: 0px 0px 44px rgba(183, 187, 225, 0.33);

  &:active,
  &:hover {
    background: #ffffff;
    color: #000000;
    transition: all 0.3s ease-out;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    padding: 16px 32px;
  }
`;
