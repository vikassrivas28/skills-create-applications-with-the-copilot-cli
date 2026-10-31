const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");
const { calculate } = require("../calculator.js");

const calculatorPath = path.join(__dirname, "..", "calculator.js");

test("adds numbers", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(calculate(-2, "+", 3), 1);
});

test("subtracts numbers", () => {
  assert.equal(calculate(10, "-", 4), 6);
  assert.equal(calculate(4, "-", 10), -6);
});

test("multiplies numbers", () => {
  assert.equal(calculate(45, "*", 2), 90);
  assert.equal(calculate(-3, "*", 4), -12);
});

test("divides numbers", () => {
  assert.equal(calculate(20, "/", 5), 4);
  assert.equal(calculate(7, "/", 2), 3.5);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate(20, "/", 0), {
    message: "Cannot divide by zero.",
  });
  assert.throws(() => calculate(20, "/", -0), {
    message: "Cannot divide by zero.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "%", 3), {
    message: "Unsupported operation: %",
  });
});

test("CLI prints a calculation result", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "2", "+", "3"], {
    encoding: "utf8",
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "5\n");
  assert.equal(result.stderr, "");
});

test("CLI reports division by zero", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "20", "/", "0"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /Cannot divide by zero\./);
});

test("CLI rejects invalid numbers and missing arguments", () => {
  const invalidNumber = spawnSync(
    process.execPath,
    [calculatorPath, "not-a-number", "+", "3"],
    { encoding: "utf8" },
  );
  assert.equal(invalidNumber.status, 1);
  assert.match(invalidNumber.stderr, /Invalid number: not-a-number/);

  const missingArguments = spawnSync(process.execPath, [calculatorPath, "2", "+"], {
    encoding: "utf8",
  });
  assert.equal(missingArguments.status, 1);
  assert.match(missingArguments.stderr, /Usage:/);
});
