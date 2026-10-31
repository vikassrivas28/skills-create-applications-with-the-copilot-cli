#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (^), and square root (sqrt).
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Cannot calculate modulo by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

function calculate(first, operator, second) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return first / second;
    case "%":
      return modulo(first, second);
    case "^":
      return power(first, second);
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function main(args) {
  if (args.length === 2 && args[0] === "sqrt") {
    const input = args[1];
    const number = Number(input);
    if (input.trim() === "" || !Number.isFinite(number)) {
      throw new Error(`Invalid number: ${input}`);
    }
    console.log(squareRoot(number));
    return;
  }

  if (args.length !== 3) {
    throw new Error(
      "Usage: node src/calculator.js <number> <operator> <number> or node src/calculator.js sqrt <number>",
    );
  }

  const [firstInput, operator, secondInput] = args;
  const first = Number(firstInput);
  const second = Number(secondInput);

  if (firstInput.trim() === "" || !Number.isFinite(first)) {
    throw new Error(`Invalid number: ${firstInput}`);
  }
  if (secondInput.trim() === "" || !Number.isFinite(second)) {
    throw new Error(`Invalid number: ${secondInput}`);
  }

  console.log(calculate(first, operator, second));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
