import styled from "styled-components";
import { useState } from "react";

import Popup from "./components/Popup/Popup";
import ButtonShow from "./components/ButtonShow/ButtonShow";

function App() {
  const [months, setMonths] = useState("12");
  const [time, setTime] = useState("month");

  return (
    <AppContent>
      <Popup
        months={months}
        setMonths={setMonths}
        time={time}
        setTime={setTime}
      />
      <ButtonShow />
    </AppContent>
  );
}

export default App;

const AppContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  box-shadow: 0 -0.11px 16.95px 0 rgba(183, 187, 225, 0.33);
`;
