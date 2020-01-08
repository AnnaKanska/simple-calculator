import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentNum, setCurrentNum] = useState(0);
  const [storedNum, setStoredNum] = useState(null);
  const [operation, setOperation] = useState(null);
  // const [result, setResult] = useState(null);

  const addNumber = i => {
    if (currentNum === null) {
      setCurrentNum(i);
    } else {
      setCurrentNum(currentNum === 0 ? i : Number(`${currentNum}` + i));
    }
  };
  console.log(
    "current-",
    currentNum,
    "stored-",
    storedNum,
    "operation-",
    operation
  );
  const numbers = new Array(10).fill(0);
  const numDisplay = numbers.map((_, i) => (
    <div key={i} className={`section num${+i}`} onClick={() => addNumber(i)}>
      {i}
    </div>
  ));

  const operationClick = e => {
    setOperation(e);
    if (currentNum != null && operation === null) {
      //checking if it's accumulating the first value
      setStoredNum(currentNum);
      setCurrentNum(null);
    }
  };

  const getResult = () => {
    setCurrentNum(null);
    setStoredNum(eval([storedNum, operation, currentNum].join("")));
    setOperation(null);
  };

  const displayValue =
    currentNum !== null ? currentNum : [storedNum, operation];

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
