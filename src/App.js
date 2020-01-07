import React, { useState } from "react";
import "./App.css";

function App() {
  const [startingNum, setStartingNum] = useState(0);

  const addNumber = i => {
    setStartingNum(`${startingNum}` + i);
  };

  const numbers = new Array(10).fill(0);
  const numDisplay = numbers.map((_, i) => (
    <div
      key={`num${+i}`}
      className={`num${+i}`}
      value={i}
      onClick={() => addNumber(i)}
    >
      {i}
    </div>
  ));

  return (
    <div>
      <div>
        <h1>{`screen - ${startingNum}`}</h1>
      </div>
      {numDisplay}
    </div>
  );
}

export default App;
