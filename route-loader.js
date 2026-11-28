(function () {
  "use strict";

  const requestedTool = new URLSearchParams(window.location.search).get("tool");
  const mathBatchRoutes = new Set([
    "linear-equation",
    "quadratic-equation",
    "simultaneous-equations",
    "polynomial-calculator",
    "logarithm",
    "matrix-operations",
    "matrix-determinant"
  ]);

  const mathScripts = [
    "finance-core.js",
    "math-core.js",
    "math-tools.js",
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
