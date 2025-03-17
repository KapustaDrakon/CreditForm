import "./ButtonShow.css";

const ButtonShow = () => {
  const popupShow = () => {
    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".popup__input").focus();
  };

  return (
    <button type="button" className="button-show" onClick={popupShow}>
      Расчет платежей
    </button>
  );
};

export default ButtonShow;
