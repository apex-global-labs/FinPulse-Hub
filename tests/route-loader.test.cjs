const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const loader = fs.readFileSync(path.join(root, "route-loader.js"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const mathRoutes = [
  "linear-equation",
  "quadratic-equation",
  "simultaneous-equations",
  "polynomial-calculator",
  "logarithm",
  "matrix-operations",
  "matrix-determinant"
];

const expectedMathScripts = [
  "advanced-math-core.js",
  "advanced-math-tools.js",
  "smart-ui.js",
  "global-context.js",
  "translation-engine.js",
  "tool-content-runtime.js",
  "app.js"
];

const expectedFullScripts = [
  "finance-core.js",
  "math-core.js",
  "math-tools.js",
  "advanced-math-core.js",
  "advanced-math-tools.js",
  "date-time-core.js",
  "date-time-tools.js",
  "unit-converter-core.js",
  "unit-converter-tools.js",
  "developer-tools.js",
  "education-lifestyle-tools.js",
  "qrcode.js",
  "lifestyle-tools.js",
  "health-activity-tools.js",
  "health-wellness-tools.js",
  "smart-ui.js",
  "global-context.js",
  "translation-engine.js",
  "tool-content-runtime.js",
  "tax-data.js",
  "tax-state-data.js",
  "tax-engine.js",
  "asset-data.js",
  "app.js",
  "home-calculator-core.js",
  "home-calculator.js"
];

function loadedScripts(search) {
  const appended = [];
  const appElement = { innerHTML: "" };
  const document = {
    createElement() {
      return { dataset: {} };
    },
    body: {
      appendChild(script) {
        appended.push(script.src);
        script.onload();
      }
    },
    querySelector(selector) {
      return selector === "#app" ? appElement : null;
    }
  };
  const context = {
    URLSearchParams,
    Promise,
    window: { location: { search } },
    document,
    console
  };
  vm.runInNewContext(loader, context);
  return { scripts: appended, placeholder: appElement.innerHTML };
}

test("Math routes load only the math engines and shared runtime in dependency order", () => {
  for (const route of mathRoutes) {
    const result = loadedScripts("?tool=" + route);
    assert.deepEqual(result.scripts, expectedMathScripts, route);
    const expectedTitle = {
      "linear-equation": "Linear Equation Solver",
      "quadratic-equation": "Quadratic Equation Solver",
      "simultaneous-equations": "Simultaneous Equations Solver",
      "polynomial-calculator": "Polynomial Calculator",
      "logarithm": "Logarithm Calculator",
      "matrix-operations": "Matrix Operations Calculator",
      "matrix-determinant": "Matrix Determinant Calculator"
    }[route];
    assert.ok(result.placeholder.includes("<h2>" + expectedTitle + "</h2>"), route + " should pre-render its LCP heading");
    assert.ok(result.placeholder.includes('aria-hidden="true"'), route + " placeholder must not duplicate accessible content");
  }
});

test("homepage and non-Math routes retain the complete legacy script set and order", () => {
  assert.deepEqual(loadedScripts("").scripts, expectedFullScripts);
  assert.deepEqual(loadedScripts("?tool=triangle-area").scripts, expectedFullScripts);
  assert.deepEqual(loadedScripts("?tool=mortgage").scripts, expectedFullScripts);
});

test("dynamic scripts are ordered and the HTML uses the route loader", () => {
  assert.ok(loader.includes("script.async = false"));
  assert.ok(html.includes('<script src="route-loader.js" defer></script>'));
  const executableHtml = html.replace(/<!--[\s\S]*?-->/g, "");
  assert.ok(!executableHtml.includes('<script src="app.js" defer></script>'));
  assert.ok(!executableHtml.includes('<script src="finance-core.js" defer></script>'));
});

test("Math route app registry is scoped and does not fetch the full directory mapping", () => {
  assert.ok(app.includes("MATH_BATCH_ROUTE_IDS.has(requestedTool)"));
  assert.ok(app.includes('D.filter(tool=>MATH_BATCH_ROUTE_IDS.has(tool.id))'));
  assert.ok(app.includes("if(!MATH_BATCH_ROUTE_IDS.has(requestedTool))renderDirectoryAfterMapping()"));
  for (const registry of [
    "FinPulseMathTools",
    "FinPulseAdvancedMathTools",
    "FinPulseDateTimeTools",
    "FinPulseUnitTools",
    "FinPulseDeveloperTools",
    "FinPulseEducationTools",
    "FinPulseLifestyleTools",
    "FinPulseHealthTools",
    "FinPulseHealthTools2"
  ]) {
    assert.ok(app.includes("window." + registry + "?.registry||[]"), registry + " must be optional for selective loading");
  }
});
