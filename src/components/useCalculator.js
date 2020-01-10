import { useState } from "react";
import stages from "./stages";

export default function useCalculator() {
  const [calculatorState, setCalculatorState] = useState({
    currentNum: 0,
    storedNum: null,
    operation: null,
    stage: stages.accFirstVal
  });

  const addNumber = i => {
    setCalculatorState(calculatorState => {
      const currentNum = [stages.accFirstVal, stages.accSecondVal].includes(
        calculatorState.stage
      )
        ? Number(`${calculatorState.currentNum}` + i)
        : i;

      const stage =
        calculatorState.stage === stages.selectOp
          ? stages.accSecondVal
          : calculatorState.stage === stages.displayResult
          ? stages.accFirstVal
          : calculatorState.stage;

      const storedNum =
        calculatorState.stage === stages.displayResult
          ? null
          : calculatorState.storedNum;

      return {
        ...calculatorState,
        currentNum,
        stage,
        storedNum
      };
    });
  };

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

  return {
    calculatorState,
    addNumber,
    operationClick,
    getResult,
    displayValue
  };
}
