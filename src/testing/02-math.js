const sum = (a, b) => a + b;

const multiply = (a, b) => a * b;

/**
 * @description divide two numbers
 * @param {*} a
 * @param {*} b
 * @returns null or number
 */
const divide = (a, b) => (b !== 0 ? a / b : null);

const average = (...args) => {
  const sumGrades = args.reduce((a, b) => a + b, 0);
  return sumGrades / args.length;
};

export { sum, multiply, divide, average };
