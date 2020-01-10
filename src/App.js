import React from "react";
import useCalculator from "./components/useCalculator";
import "./App.css";

function App() {
  const {
    addNumber,
    operationClick,
    getResult,
    displayValue
  } = useCalculator();

  const numbers = new Array(10).fill(0);
  const numDisplay = numbers.map((_, i) => (
    <div key={i} className={`section num${+i}`} onClick={() => addNumber(i)}>
      {i}
    </div>
  ));

  return (
    <div className="main_container">
      <div className="section display">{displayValue}</div>
      {numDisplay}

      <button onClick={() => operationClick("+")} className="btn plusBtn">
        +
      </button>
      <button onClick={() => operationClick("-")} className="btn minusBtn">
        -
      </button>
      <button
        onClick={() => operationClick("*")}
        className="btn multiplicationBtn"
      >
        *
      </button>
      <button onClick={() => operationClick("/")} className="btn divisionBtn">
        /
      </button>
      <button onClick={getResult} className="btn equalsBtn">
        =
      </button>
    </div>
  );
}

export default App;
