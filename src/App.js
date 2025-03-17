import "./App.css";
import Popup from "./components/Popup/Popup";
import ButtonShow from "./components/ButtonShow/ButtonShow";
import { useState } from "react";

function App() {
  const [months, setMonths] = useState('12');
  const [time, setTime] = useState('month');

  return (
    <div className="app">
      <Popup months={months} setMonths={setMonths} time={time} setTime={setTime} />
      <ButtonShow />
    </div>
  );
}

export default App;
