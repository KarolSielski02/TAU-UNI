class Calculator {
  add(a, b) {
    if (isNaN(a) || isNaN(b)) {
      return NaN;
    }
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

module.exports = Calculator;
