const Calculator = require("./calculator");
let calc = new Calculator();

test("should add two numbers", () => {
  expect(calc.add(2, 3)).toBe(5);
});

test("should subtract two numbers", () => {
  expect(calc.subtract(5, 3)).toBe(2);
});

test("should multiply two numbers", () => {
  expect(calc.multiply(2, 3)).toBe(6);
});

test("multiplication by zero should result in zero", () => {
  expect(calc.multiply(2, 0)).toBe(0);
});

test("should divide two numbers", () => {
  expect(calc.divide(6, 3)).toBe(2);
});

test("should throw an error when dividing by zero", () => {
  expect(() => calc.divide(6, 0)).toThrow("Cannot divide by zero");
});

test("should return NaN when adding non-numeric values", () => {
  expect(calc.add(2, "abc")).toBeNaN();
  expect(calc.add("abc", 3)).toBeNaN();
  expect(calc.add("abc", "def")).toBeNaN();
});

test("addition with text should not return string", () => {
  expect(calc.add(4, "test")).not.toBeInstanceOf(String);
});

test("should subtract zero", () => {
  expect(calc.subtract(5, 0)).toBe(5);
  expect(calc.subtract(0, 5)).toBe(-5);
});

test("should return fractional result when division is not exact", () => {
  expect(calc.divide(7, 2)).toBe(3.5);
});
