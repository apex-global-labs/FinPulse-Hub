"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { createServer } = require("node:http");
const { readFile, mkdir, writeFile } = require("node:fs/promises");
const { join } = require("node:path");

let server;
let browser;

test("all 220 registered tools execute with valid representative inputs in desktop and mobile Chromium", { timeout: 360000 }, async t => {
  server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    const path = pathname.replace(/^\/+/, "") || "index.html";
    try {
      const data = await readFile(join(process.cwd(), path));
      const type = path.endsWith(".css") ? "text/css"
        : path.endsWith(".js") ? "text/javascript"
        : path.endsWith(".svg") ? "image/svg+xml"
        : "text/html";
      res.writeHead(200, { "content-type": type });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  browser = await chromium.launch({ headless: true });
  const base = "http://127.0.0.1:" + server.address().port;
  const records = [];
  const mobileRecords = [];
  const failures = [];
  const runtimeErrors = [];
  const completed = { desktop: [], mobile: [] };

  try {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "mobile", width: 390, height: 844 }
    ]) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      page.on("pageerror", error => runtimeErrors.push(viewport.name + ": " + error.message));
      page.on("console", message => {
        if (message.type() === "error") runtimeErrors.push(viewport.name + " console: " + message.text());
      });
      await page.goto(base, { waitUntil: "networkidle" });
      const tools = await page.locator("#tool-links a").evaluateAll(links =>
        links.map(a => ({
          id: new URL(a.href).searchParams.get("tool"),
          name: a.querySelector(".tool-card strong")?.textContent.trim() || a.textContent.trim()
        }))
      );
      assert.equal(tools.length, 220, "published registry link count");
      assert.equal(new Set(tools.map(x => x.id)).size, 220, "tool IDs must be unique");
      assert.equal(new Set(tools.map(x => x.name)).size, 220, "tool names must be unique");

      await page.goto(base + "?tool=" + encodeURIComponent(tools[0].id), { waitUntil: "domcontentloaded" });
      for (const tool of tools) {
        await page.locator("#search").fill(tool.name);
        try {
          await page.waitForFunction(
            name => {
              const heading = document.querySelector("#app .heading h2");
              return heading?.textContent.trim() === name;
            },
            tool.name,
            { timeout: 5000 }
          );
        } catch (error) {
          const diagnostic = await page.evaluate(() => ({
            search: document.querySelector("#search")?.value,
            heading: document.querySelector("#app .heading h2")?.textContent.trim() || null,
            resultLabel: document.querySelector("#app .result .label")?.textContent.trim() || null,
            resultDetail: document.querySelector("#app .result .sub")?.textContent.trim() || null
          }));
          throw new Error(viewport.name + " failed to render " + tool.id + " (" + tool.name + "): " + JSON.stringify(diagnostic) + "; " + error.message);
        }
        if (tool.id === "activity-goal-progress-tracker") {
          const initialPrompt = await page.locator("#app .result .value").textContent();
          const initialLabel = await page.locator("#app .result .label").textContent();
          if (initialPrompt.trim() !== "Enter your own goal" || initialLabel.trim() !== "USER-ENTERED GOAL REQUIRED") failures.push({ viewport: viewport.name, id: tool.id, name: tool.name, issues: ["blank optional goal should show the user-defined goal prompt"] });
        }
        const firstPreset = page.locator('#app button[data-preset="0"]').first();
        if (await firstPreset.count()) await firstPreset.click();
        if (tool.id === "probability") {
          await page.locator("#f-a").fill("0.4");
          await page.locator("#f-b").fill("0.3");
        }
        await page.evaluate(() => {
          const fields = [...document.querySelectorAll("#app .fields input[name], #app .fields select[name], #app .fields textarea[name]")];
          for (const el of fields) {
            if (el.value !== "") continue;
            if (el.tagName === "SELECT") {
              const options = [...el.options].filter(option => option.value !== "");
              if (options.length) el.value = (el.name === "to" && options.length > 1 ? options[1] : options[0]).value;
            } else if (el.type === "datetime-local") {
              el.value = el.name === "end" ? "2026-11-21T10:00" : "2026-11-21T09:00";
            } else if (el.type === "date") {
              el.value = "2026-11-21";
            } else if (el.type === "time") {
              el.value = el.name === "end" ? "10:00" : "09:00";
            } else if (el.type === "number") {
              el.value = "1";
            } else if (el.tagName === "TEXTAREA") {
              if (el.name === "holidays") continue;
              el.value = "FinPulse functional audit sample";
            } else {
              el.value = "sample";
            }
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        const row = await page.evaluate(() => {
          const heading = document.querySelector("#app .heading h2");
          const result = document.querySelector("#app .result .value");
          const category = document.querySelector("#app .heading .kicker");
          const fields = [...document.querySelectorAll("#app .fields input[name], #app .fields select[name], #app .fields textarea[name]")];
          const unlabeled = fields.filter(el => !el.id || !document.querySelector('label[for="' + CSS.escape(el.id) + '"]'));
          const breakdownAncestors = [];
          for (let el = document.querySelector("#breakdown-table table"); el; el = el.parentElement) {
            const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
            breakdownAncestors.push({ tag: el.tagName.toLowerCase(), id: el.id, className: typeof el.className === "string" ? el.className : "", width: Math.round(rect.width), right: Math.round(rect.right), overflowX: style.overflowX, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth });
            if (el.id === "app") break;
          }
          return {
            name: heading?.textContent.trim(),
            category: category?.textContent.trim(),
            result: result?.textContent.trim(),
            resultLabel: document.querySelector("#app .result .label")?.textContent.trim(),
            resultDetail: document.querySelector("#app .result .sub")?.textContent.trim(),
            fields: fields.map(el => ({
              key: el.name,
              label: document.querySelector('label[for="' + CSS.escape(el.id) + '"]')?.textContent.trim() || "",
              type: el.type || el.tagName.toLowerCase(), value: el.value,
              options: el.tagName === "SELECT" ? [...el.options].map(option => ({ value: option.value, selected: option.selected })) : undefined
            })),
            unlabeled: unlabeled.map(el => el.name),
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
            breakdownScroll: (() => {
              const el = document.querySelector("#breakdown-panel .schedule-scroll");
              if (!el) return null;
              const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
              return { width: Math.round(rect.width), right: Math.round(rect.right), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: style.overflowX };
            })(),
            metricDiagnostics: [...document.querySelectorAll("#metrics .metric strong")].map(el => {
              const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
              return { width: Math.round(rect.width), right: Math.round(rect.right), parentWidth: Math.round(el.parentElement.getBoundingClientRect().width), display: style.display, gridColumn: style.gridColumn, minWidth: style.minWidth, maxWidth: style.maxWidth, whiteSpace: style.whiteSpace, overflowWrap: style.overflowWrap };
            }),
            strongDiagnostics: [...document.querySelectorAll("#app strong")].map(el => {
              const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
              const ancestors = [];
              for (let p = el.parentElement; p && p.id !== "app"; p = p.parentElement) ancestors.push({ tag: p.tagName.toLowerCase(), id: p.id, className: typeof p.className === "string" ? p.className : "", width: Math.round(p.getBoundingClientRect().width), overflowX: getComputedStyle(p).overflowX });
              return { text: el.textContent.trim().slice(0, 80), width: Math.round(rect.width), right: Math.round(rect.right), display: style.display, minWidth: style.minWidth, maxWidth: style.maxWidth, whiteSpace: style.whiteSpace, overflowWrap: style.overflowWrap, ancestors };
            }),
            breakdownAncestors,
            overflowNodes: [...document.querySelectorAll("body *")].map(el => {
              const rect = el.getBoundingClientRect();
              return { tag: el.tagName.toLowerCase(), id: el.id, className: typeof el.className === "string" ? el.className : "", inCategories: !!el.closest("#categories"), width: Math.round(rect.width), right: Math.round(rect.right), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
            }).filter(x => x.width > 0 && x.right > window.innerWidth + 1 && !x.inCategories).sort((a, b) => b.right - a.right).slice(0, 12)
          };
        });
        const issues = [];
        if (row.name !== tool.name) issues.push("heading mismatch");
        if (!row.category) issues.push("category missing");
        if (!row.result || row.result === "—" || row.resultLabel === "CHECK YOUR INPUTS") issues.push("representative handler failed: " + row.resultLabel + " — " + row.resultDetail);
        if (!row.fields.length) issues.push("input fields missing");
        if (row.unlabeled.length) issues.push("unlabeled inputs: " + row.unlabeled.join(", "));
        if (row.horizontalOverflow) issues.push("horizontal overflow");
        if (["url-encoder-decoder", "base64-encoder-decoder", "json-formatter-validator"].includes(tool.id)) {
          if (!row.breakdownScroll || row.breakdownScroll.overflowX !== "auto" || row.breakdownScroll.width > viewport.width + 1 || row.breakdownScroll.right > viewport.width + 1) {
            issues.push("breakdown table must scroll inside its mobile panel");
          }
        }
        completed[viewport.name].push(tool.id);
        const record = { id: tool.id, ...row, status: issues.length ? "failed" : "representative-handler-passed", issues };
        if (issues.length) failures.push({ viewport: viewport.name, id: tool.id, name: tool.name, issues, fields: row.fields, metricDiagnostics: row.metricDiagnostics, strongDiagnostics: row.strongDiagnostics });
        if (viewport.name === "desktop") records.push(record);
        else mobileRecords.push(record);
      }
      await page.close();
    }

    const categories = {};
    for (const row of records) categories[row.category] = (categories[row.category] || 0) + 1;
    assert.equal(records.length, 220, "desktop inventory must contain 220 tools");
    assert.equal(mobileRecords.length, 220, "mobile inventory must contain 220 tools");
    console.log("FUNCTIONAL_AUDIT_SUMMARY " + JSON.stringify({
      tools: records.length,
      viewports: ["desktop", "mobile"],
      executions: records.length * 2,
      desktopPassed: records.filter(x => x.status === "representative-handler-passed").length,
      mobilePassed: mobileRecords.filter(x => x.status === "representative-handler-passed").length,
      failures,
      categories,
      runtimeErrors
    }));
    console.log("FUNCTIONAL_AUDIT_REGISTRY " + JSON.stringify(records));
    assert.deepEqual(failures, [], "tool functional failures");
    assert.deepEqual(runtimeErrors, [], "browser runtime/console errors");
  } finally {
    try {
      await mkdir("artifacts", { recursive: true });
      await writeFile("artifacts/220-tool-functional-audit.json", JSON.stringify({
        sourceCommit: process.env.GITHUB_SHA || "local",
        viewports: completed,
        desktopRegistry: records,
        mobileRegistry: mobileRecords,
        failures,
        runtimeErrors
      }, null, 2) + "\n");
    } catch (error) {
      console.error("Could not persist functional audit artifact: " + error.message);
    }
    try {
      const categories = {};
      for (const row of records) categories[row.category] = (categories[row.category] || 0) + 1;
      const coverage = {
        "EVERYDAY FINANCE": "Expected-value formula tests: tests/formula.test.cjs",
        "LOANS & HOUSING": "Expected-value formula tests: tests/formula.test.cjs",
        "SAVINGS & GROWTH": "Expected-value formula tests: tests/formula.test.cjs",
        "FREELANCE & BUSINESS": "Expected-value formula tests: tests/formula.test.cjs",
        "RETIREMENT & INVESTING": "Expected-value formula tests: tests/formula.test.cjs",
        "TAX & INCOME": "Expected-value formula tests: tests/formula.test.cjs",
        "PAYROLL & PAY": "Expected-value formula tests: tests/formula.test.cjs",
        "SHOPPING & PRICING": "Expected-value formula tests: tests/formula.test.cjs",
        "CURRENCY & TRANSFERS": "Expected-value formula tests: tests/formula.test.cjs",
        "PROPERTY & PLANNING": "Expected-value formula tests: tests/formula.test.cjs",
        "PERSONAL FINANCE": "Expected-value formula tests: tests/formula.test.cjs",
        "MATH & STATISTICS": "Expected-value formula tests: math-batch-1, advanced-math-batch-2; handler regression tests: math-batch-3",
        "DATE & TIME": "Expected-value date/time core tests and all 25 default handlers: date-time-batch-3",
        "UNIT & DATA CONVERTERS": "Expected-value conversion-family tests and selected handler outputs: unit-converter.test",
        "DEVELOPER & TEXT UTILITIES": "Expected-value transformation/logic tests and 20 default-preset executions: developer-tools.test and education-lifestyle.test",
        "EDUCATION & STUDY TOOLS": "Expected-value calculation tests: education-lifestyle.test",
        "HOME & CONSTRUCTION ESTIMATES": "Expected-value quantity/area/volume tests: education-lifestyle.test and lifestyle-tools.test",
        "EVERYDAY LIFESTYLE TOOLS": "Expected-value cost, commission, bill-split and comparison tests: lifestyle-tools.test",
        "DEVELOPER & EVERYDAY TOOLS": "Generator output, validation and PNG preview tests (QR generator; not a formula calculator)",
        "HEALTH & WELLNESS · SLEEP": "Expected-value sleep duration/schedule/log tests: health-activity-tools.test",
        "HEALTH & WELLNESS · PACE & ACTIVITY": "Expected-value pace, speed, distance and race calculation tests: health-activity-tools.test",
        "HEALTH & WELLNESS · USER-ENTERED TOOLS": "Expected-value interval, duration, activity, step, elevation and log tests: health-wellness-tools.test"
      };
      const mobileById = new Map(mobileRecords.map(row => [row.id, row]));
      const lines = [
        "# FinPulse Hub — 220-tool functional audit",
        "",
        "- Source commit: " + (process.env.GITHUB_SHA || "local"),
        "- Tools registered: " + records.length,
        "- Browser executions: " + (records.length + mobileRecords.length) + " (desktop + mobile Chromium)",
        "- Desktop handler passes: " + records.filter(x => x.status === "representative-handler-passed").length + "/" + records.length,
        "- Mobile handler passes: " + mobileRecords.filter(x => x.status === "representative-handler-passed").length + "/" + mobileRecords.length,
        "- Browser runtime/console errors: " + runtimeErrors.length,
        "- Functional/layout failures: " + failures.length,
        "",
        "## Formula / calculation test coverage",
        "",
        "The evidence column identifies the existing suite with expected-value formula or logic assertions. These are grouped engine/family tests, not a claim that every tool has a separate standalone test case. The browser sweep independently executes each registered tool handler with representative inputs in both viewports.",
        "",
        "| Coverage class | Tools |",
        "|---|---:|",
        "| Formula / calculation / transformation expected-value suites | " + records.filter(x => x.id !== "qr-code-generator").length + " |",
        "| Non-formula generator output and validation suite | " + records.filter(x => x.id === "qr-code-generator").length + " |",
        "| Render-only tools (no calculation/logic or generator-output suite identified) | " + records.filter(x => !coverage[x.category]).length + " |",
        "",
        "## Complete tool inventory",
        "",
        "| Tool ID | Tool | Category | Inputs | Desktop | Mobile | Existing calculation-test evidence |",
        "|---|---|---|---|---|---|---|"
      ];
      const categorySummary = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));
      const inventoryHeading = lines.indexOf("## Complete tool inventory");
      lines.splice(inventoryHeading, 0, "## Category inventory", "", "| Category | Tool count |", "|---|---:|", ...categorySummary.map(([name, count]) => "| " + name + " | " + count + " |"), "");
      const formulaTools = records.filter(row => row.id !== "qr-code-generator");
      const generatorTools = records.filter(row => row.id === "qr-code-generator");
      const renderOnlyTools = records.filter(row => !coverage[row.category]);
      lines.push(
        "",
        "### Formula / calculation / transformation expected-value list (" + formulaTools.length + ")",
        "",
        formulaTools.map(row => "- " + row.id + " — " + row.name + " (" + row.category + ")").join("\n") || "None",
        "",
        "### Non-formula generator output / validation list (" + generatorTools.length + ")",
        "",
        generatorTools.map(row => "- " + row.id + " — " + row.name).join("\n") || "None",
        "",
        "### Render-only list (" + renderOnlyTools.length + ")",
        "",
        renderOnlyTools.map(row => "- " + row.id + " — " + row.name).join("\n") || "None"
      );
      for (const row of records) {
        const mobile = mobileById.get(row.id);
        const inputText = row.fields.map(field => field.key + " (" + field.label.replace(/\|/g, "/") + ")").join(", ").replace(/\|/g, "/");
        const desktopStatus = row.status === "representative-handler-passed" ? "PASS" : "FAIL";
        const mobileStatus = mobile?.status === "representative-handler-passed" ? "PASS" : "FAIL";
        lines.push("| " + row.id + " | " + row.name.replace(/\|/g, "/") + " | " + row.category.replace(/\|/g, "/") + " | " + inputText + " | " + desktopStatus + " | " + mobileStatus + " | " + (coverage[row.category] || "No formula/logic suite mapped; render/handler smoke only") + " |");
      }
      lines.push("", "## Failures", "", failures.length ? failures.map(item => "- " + item.viewport + " — " + item.id + " (" + item.name + "): " + item.issues.join("; ")).join("\n") : "None", "", "## Browser runtime errors", "", runtimeErrors.length ? runtimeErrors.map(error => "- " + error).join("\n") : "None", "");
      await writeFile("artifacts/220-tool-functional-audit.md", lines.join("\n"));
    } catch (error) {
      console.error("Could not persist functional audit Markdown: " + error.message);
    }
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
});
