import { useState } from "react";

export const useApp = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [pointer, setPointer] = useState("");

  const handleOperatorsClick = (value) => {
    if (!firstNumber) return;
    if (secondNumber) {
      handleOperator("=");
    }
    setOperator(value);
    setPointer("second");
  };

  const handleOperator = (value) => {
    const mathOperator = {
      "+": () => handleOperatorsClick("+"),
      "-": () => handleOperatorsClick("-"),
      x: () => handleOperatorsClick("*"),
      "/": () => handleOperatorsClick("/"),
      C: () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperator("");
        setPointer("");
      },
      "=": () => {
        if (!firstNumber || !secondNumber || !operator) return;
        setFirstNumber(
          // eslint-disable-next-line no-eval
          String(eval(`${firstNumber} ${operator} ${secondNumber}`))
        );
        setSecondNumber("");
        setOperator("");
        setPointer("");
      },
      ".": () => {
        if (pointer === "second") {
          if (secondNumber.includes(".")) return;
          setSecondNumber(secondNumber + value);
        } else {
          if (firstNumber.includes(".")) return;
          setFirstNumber(firstNumber + value);
        }
      },
    };

    if (mathOperator[value]) {
      mathOperator[value]();
      return;
    }

    if (pointer === "second") {
      setSecondNumber((currentValue) => currentValue + value);
    } else {
      setFirstNumber((currentValue) => currentValue + value);
    }
  };

  const makeDisplay = `${firstNumber || 0}  ${operator} ${secondNumber}`;

  return { handleOperator, makeDisplay };
};
