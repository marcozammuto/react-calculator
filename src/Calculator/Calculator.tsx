import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("0");
  const [currentNumber, setCurrentNumber] = useState("0");
  const [decimalClicked, setDecimalClicked] = useState(false);
  const [equalsClicked, setEqualsClicked] = useState(false);
  const [rightBegin, setRightBegin] = useState(false);
  const [zeroReset, setZeroReset] = useState(false);
  const [lastSymbolClicked, setLastSymbolClicked] = useState("");
  const [symbolClicked, setSymbolClicked] = useState(false);

  const addNum = (num) => {
    if (input.length < 14) {
      if (!num && zeroReset) {
        null;
      } else {
        let arr = [input];
        if (arr[0] === "0") {
          arr.shift();
        }
        arr.push(num);
        let result = arr.join("");
        const lastNumRegex = /\d+$/;
        let lastNum = result.match(lastNumRegex);
        if (!decimalClicked) {
          const lastNumRegex = /[+\-*/]?(\d+\.?\d*)$/;
          let lastNumMatch = result.match(lastNumRegex);
          if (lastNumMatch) {
            let lastNum = lastNumMatch[1];
            console.log(lastNum);
            setInput(result);
            setOutput(lastNum);
            setCurrentNumber(lastNum);
            setRightBegin(true);
            setDecimalClicked(false);
            setEqualsClicked(false);
            setLastSymbolClicked("");
            setSymbolClicked(false);
            setZeroReset(false);
          } else {
            setInput(result);
            setOutput(result);
            setCurrentNumber(`${currentNumber}${lastNum}`);
            setRightBegin(true);
            setDecimalClicked(true);
            setEqualsClicked(false);
            setLastSymbolClicked("");
            setZeroReset(false);
          }
        } else {
          setInput(result);
          setOutput(lastNum);
          setCurrentNumber(lastNum);
          setRightBegin(true);
          setDecimalClicked(true);
          setEqualsClicked(false);
          setLastSymbolClicked("");
          setZeroReset(false);
        }
      }
    }
  };

  const decimal = () => {
    if (!output.includes(".")) {
      if (decimalClicked) {
        setInput(`${input}.`);
        setOutput(`${output}.`);
        setCurrentNumber(`${currentNumber}.`);
        setDecimalClicked(true);
        setZeroReset(false);
      } //else if (equalsClicked) {
      //   setInput("0.");
      //   setOutput("0.");
      //   setCurrentNumber("0.");
      //   setDecimalClicked(true);
      //   setZeroReset(false);
      // }
    } else {
      console.log("Decimal error");
    }
  };

  const addOperator = (symb) => {
    if (rightBegin && symb !== lastSymbolClicked && !equalsClicked) {
      setInput(`${input}${symb}`);
      setOutput(symb);
      setCurrentNumber("0");
      setDecimalClicked(false);
      setZeroReset(false);
      setLastSymbolClicked(symb);
      setEqualsClicked(false);
      setSymbolClicked(true);
    } else if (rightBegin && symb !== lastSymbolClicked && equalsClicked) {
      const resultAfterEquals = /(?<==)\d*/.exec(input);
      setInput(`${resultAfterEquals}${symb}`);
      setOutput(symb);
      setCurrentNumber(resultAfterEquals);
      setDecimalClicked(true);
      setZeroReset(true);
      setLastSymbolClicked(symb);
      setEqualsClicked(false);
      setSymbolClicked(true);
    } else {
      console.log("Symbol error");
    }
  };

  const clear = () => {
    setInput("0");
    setOutput("0");
    setCurrentNumber("0");
    setDecimalClicked(false);
    setEqualsClicked(false);
    setRightBegin(false);
    setZeroReset(false);
    setLastSymbolClicked("");
    setSymbolClicked(false);
  };

  const equals = () => {
    if (!output && equalsClicked) {
      setOutput(0);
      setInput(0);
    } else if (input && !equalsClicked) {
      let amount = input;
      let pointFilter = "";
      if (amount.includes("=")) {
        amount = amount.replace("=", "");
      }
      const dotRegex = /\.{2,}/g;
      if (amount.match(dotRegex)) {
        pointFilter = amount.replace(dotRegex, ".");
      } else {
        pointFilter = amount;
      }
      const multipleDotsRegex = /(?<=\d\.\d)\.(?=\d)/g;
      if (pointFilter.match(multipleDotsRegex)) {
        pointFilter = pointFilter.replace(multipleDotsRegex, "");
      }
      const commaZeroRegex = /\.0/g;
      if (pointFilter.match(commaZeroRegex)) {
        let result = `${eval(pointFilter)}.0`;
        setOutput(result);
        setZeroReset(true);
      }
      const multipleOperatorsRegex = /(?<=\d)[+*-\/]{2,}(?=\d)/g;
      let match = pointFilter.match(multipleOperatorsRegex);
      if (match) {
        let stringer = match.toString();
        if (stringer.endsWith("+")) {
          pointFilter = pointFilter.replace(multipleOperatorsRegex, "+");
        } else if (stringer.endsWith("*")) {
          pointFilter = pointFilter.replace(multipleOperatorsRegex, "*");
        } else if (stringer.endsWith("/")) {
          pointFilter = pointFilter.replace(multipleOperatorsRegex, "/");
        }
      }
      let result = eval(pointFilter);

      const zeroCommaRegex = /^0\./;
      if (pointFilter.match(zeroCommaRegex)) {
        result = `0${pointFilter}`;
        setInput(result);
      }

      setInput(`${pointFilter}=${result}`);
      setOutput(result);
      setCurrentNumber(result);
      setDecimalClicked(true);
      setRightBegin(true);
      setZeroReset(false);
      setLastSymbolClicked("");
      setEqualsClicked(true);
    }
    
  };

  return (
    <div style={{ display: "flex" }}>
      <h2>React prog #1: Calculator</h2>
      <div id="calculator">
        <div id="display-wrap">
          <p id="input">{input}</p>
          <p id="display">{output}</p>
        </div>
        <div id="keyboard">
          <button id="clear" className="jumbo" onClick={clear}>
            AC
          </button>
          <button id="decimal" className="operator" onClick={decimal}>
            .
          </button>
          <button
            id="add"
            className="operator"
            onClick={() => addOperator("+")}
          >
            +
          </button>
          <button id="seven" className="unit" onClick={() => addNum("7")}>
            7
          </button>
          <button id="eight" className="unit" onClick={() => addNum("8")}>
            8
          </button>
          <button id="nine" className="unit" onClick={() => addNum("9")}>
            9
          </button>
          <button
            id="subtract"
            className="operator"
            onClick={() => addOperator("-")}
          >
            -
          </button>
          <button id="four" className="unit" onClick={() => addNum("4")}>
            4
          </button>
          <button id="five" className="unit" onClick={() => addNum(5)}>
            5
          </button>
          <button id="six" className="unit" onClick={() => addNum(6)}>
            6
          </button>
          <button
            id="multiply"
            className="operator"
            onClick={() => addOperator("*")}
          >
            x
          </button>
          <button id="one" className="unit" onClick={() => addNum(1)}>
            1
          </button>
          <button id="two" className="unit" onClick={() => addNum(2)}>
            2
          </button>
          <button id="three" className="unit" onClick={() => addNum(3)}>
            3
          </button>
          <button
            id="divide"
            className="operator"
            onClick={() => addOperator("/")}
          >
            /
          </button>
          <button id="zero" className="unit" onClick={() => addNum(0)}>
            0
          </button>

          <button id="equals" className="jumbo" onClick={() => equals()}>
            =
          </button>
        </div>
      </div>
      <div
        style={{
          fontSize: "5px",
          color: "black",
        }}
      >
        <p>Input:{input}</p>
        <p>Output:{output}</p>
        <p>CurrentNum:{currentNumber}</p>
        <p>DecimalClick:{decimalClicked ? "true" : "false"}</p>
        <p>CurrentNum: {currentNumber}</p>
        <p>EqualsClick: {equalsClicked ? "true" : "false"}</p>
        <p>RightBeg: {rightBegin ? "true" : "false"}</p>
        <p>ZeroReset: {zeroReset ? "true" : "false"}</p>
        <p>lastSymbolClick: {lastSymbolClicked}</p>
        <p>SymbolClicked: {symbolClicked ? "true" : "false"}</p>{" "}
      </div>
    </div>
  );
};

export default Calculator;
