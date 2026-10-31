#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
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
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function main(args) {
  if (args.length !== 3) {
    throw new Error("Usage: node src/calculator.js <number> <operator> <number>");
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

module.exports = { calculate };
