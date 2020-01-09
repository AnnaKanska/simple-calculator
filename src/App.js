import React, { useState } from "react";
import "./App.css";

const stages = {
  accFirstVal: "accFirstVal",
  selectOp: "selectOp",
  accSecondVal: "accSecondVal",
  displayResult: "displayResult"
};

function App() {
  const [calculatorState, setCalculatorState] = useState({
    currentNum: 0,
    storedNum: null,
    operation: null,
    stage: stages.accFirstVal
  });

  const addNumber = i => {
    setCalculatorState(calculatorState => {
      switch (calculatorState.stage) {
        case stages.accFirstVal:
        case stages.accSecondVal:
          return {
            ...calculatorState,
            currentNum: Number(`${calculatorState.currentNum}` + i),
            storedNum: eval(
              [
                calculatorState.storedNum,
                calculatorState.operation,
                calculatorState.currentNum
              ].join("")
            )
          };
        case stages.selectOp:
          return {
            ...calculatorState,
            currentNum: i,
            stage: stages.accSecondVal
          };
        case stages.displayResult:
          return {
            ...calculatorState,
            currentNum: i,
            stage: stages.accFirstVal,
            storedNum: null
          };
        default:
          return calculatorState;
      }
    });
  };

  const numbers = new Array(10).fill(0);
  const numDisplay = numbers.map((_, i) => (
    <div key={i} className={`section num${+i}`} onClick={() => addNumber(i)}>
      {i}
    </div>
  ));

  const operationClick = e => {
    setCalculatorState(calculatorState => {
      switch (calculatorState.stage) {
        case stages.accFirstVal:
          return {
            ...calculatorState,
            storedNum: calculatorState.currentNum,
            currentNum: null,
            operation: e,
            stage: stages.selectOp
          };
        case stages.selectOp:
          return {
            ...calculatorState,
            operation: e
          };
        case stages.displayResult:
        case stages.accSecondVal:
          return {
            ...calculatorState,
            storedNum: eval(
              [
                calculatorState.storedNum,
                calculatorState.operation,
                calculatorState.currentNum
              ].join("")
            ),
            operation: e,
            currentNum: null,
            stage: stages.selectOp
          };
        default:
          return calculatorState;
      }
    });
  };

  const getResult = () => {
    setCalculatorState(calculatorState => {
      switch (calculatorState.stage) {
        case stages.selectOp:
          return {
            ...calculatorState,
            currentNum: calculatorState.storedNum,
            storedNum: null,
            stage: stages.accFirstVal
          };
        default:
          return {
            ...calculatorState,
            currentNum: null,
            storedNum: eval(
              [
                calculatorState.storedNum,
                calculatorState.operation,
                calculatorState.currentNum
              ].join("")
            ),
            operation: null,
            stage: stages.displayResult
          };
      }
    });
  };
  const displayValue =
    calculatorState.stage === stages.accFirstVal ||
    calculatorState.stage === stages.accSecondVal
      ? calculatorState.currentNum
      : [calculatorState.storedNum, calculatorState.operation];
  console.log(calculatorState);
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
