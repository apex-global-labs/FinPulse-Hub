(function () {
  "use strict";

  const requestedTool = new URLSearchParams(window.location.search).get("tool");
  const mathRouteMeta = {
    "linear-equation": { title: "Linear Equation Solver", description: "Solve ax + b = 0." },
    "quadratic-equation": { title: "Quadratic Equation Solver", description: "Find real or complex roots of ax² + bx + c = 0." },
    "simultaneous-equations": { title: "Simultaneous Equations Solver", description: "Solve two linear equations with two unknowns." },
    "polynomial-calculator": { title: "Polynomial Calculator", description: "Evaluate a cubic-or-lower polynomial and its derivative." },
    "logarithm": { title: "Logarithm Calculator", description: "Calculate a logarithm for a positive value and valid base." },
    "matrix-operations": { title: "Matrix Operations Calculator", description: "Add, subtract or multiply two 2×2 matrices." },
    "matrix-determinant": { title: "Matrix Determinant Calculator", description: "Calculate the determinant of a 2×2 matrix." }
  };
  const mathBatchRoutes = new Set(Object.keys(mathRouteMeta));

  const mathScripts = [
    "advanced-math-core.js",
    "advanced-math-tools.js",
    "smart-ui.js",
    "global-context.js",
    "translation-engine.js",
    "tool-content-runtime.js",
    "app.js"
  ];

  const fullScripts = [
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

  const scripts = mathBatchRoutes.has(requestedTool) ? mathScripts : fullScripts;

  if (mathBatchRoutes.has(requestedTool)) {
    const app = document.querySelector("#app");
    const meta = mathRouteMeta[requestedTool];
    if (app) {
      app.innerHTML = '<div class="tool-page-layout" data-route-placeholder="true" aria-hidden="true"><div class="tool-primary-column"><div class="heading"><div><div class="kicker">MATH &amp; STATISTICS</div><h2>' + meta.title + '</h2><p>' + meta.description + '</p></div></div></div></div>';
    }
  }

  const pending = [];

  for (const src of scripts) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.routeLoader = "true";

    pending.push(new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = () => reject(new Error("Unable to load " + src));
    }));

    document.body.appendChild(script);
  }

  Promise.all(pending).catch(error => {
    console.error("FinPulse route scripts failed to load.", error);
    const app = document.querySelector("#app");
    if (app) app.textContent = "The calculator could not be loaded. Please refresh the page.";
  });
})();
