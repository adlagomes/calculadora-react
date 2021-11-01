import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import "./Calculator.css";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) { 
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const result = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      switch (currentOperation) {
        case "/":
          values[0] = values[0] / values[1];
          values[1] = 0;
          if (isNaN(values[0]) || !isFinite(values[0])) {
            this.clearMemory();
            return;
          }
          break;
        case "*":
          values[0] = values[0] * values[1];
          values[1] = 0;
          break;
        case "-":
          values[0] = values[0] - values[1];
          values[1] = 0;
          break;
        case "+":
          values[0] = values[0] + values[1];
          values[1] = 0;
          break;
        default:
          break;
      }

      // ESSE CÓDIGO FOI REFATORADO PARA O SWITCH ACIMA, VISTO QUE O USO DO EVAL() É MAL VISTO! //
      // values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);                     //
      // values[1] = 0                                                                          //

      this.setState({
        displayValue: values[0].toString(), // toString para que retorne uma string pro dislpayValue, ao invés de retornar um Number. Isso evita o erro do "." depois do "=".
        operation: result ? null : operation,
        current: result ? 0 : 1,
        clearDisplay: !result,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    const addDigit = (n) => this.addDigit(n); // Esse this. presente dentro do render representar o objeto atual.
    const setOperation = (op) => this.setOperation(op);
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
