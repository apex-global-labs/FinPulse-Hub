"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { createServer } = require("node:http");
const { readFile, mkdir, writeFile } = require("node:fs/promises");
const { join } = require("node:path");

let server;
let browser;

test("all 220 registered tools execute their default calculation handler in desktop and mobile Chromium", { timeout: 360000 }, async t => {
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
          name: a.textContent.trim()
        }))
      );
      assert.equal(tools.length, 220, "published registry link count");
      assert.equal(new Set(tools.map(x => x.id)).size, 220, "tool IDs must be unique");
      assert.equal(new Set(tools.map(x => x.name)).size, 220, "tool names must be unique");

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
        const row = await page.evaluate(() => {
          const heading = document.querySelector("#app .heading h2");
          const result = document.querySelector("#app .result .value");
          const category = document.querySelector("#app .heading .kicker");
          const fields = [...document.querySelectorAll("#app .fields input[name], #app .fields select[name], #app .fields textarea[name]")];
          const unlabeled = fields.filter(el => !el.id || !document.querySelector('label[for="' + CSS.escape(el.id) + '"]'));
          return {
            name: heading?.textContent.trim(),
            category: category?.textContent.trim(),
            result: result?.textContent.trim(),
            resultLabel: document.querySelector("#app .result .label")?.textContent.trim(),
            resultDetail: document.querySelector("#app .result .sub")?.textContent.trim(),
            fields: fields.map(el => ({
              key: el.name,
              label: document.querySelector('label[for="' + CSS.escape(el.id) + '"]')?.textContent.trim() || "",
              type: el.type || el.tagName.toLowerCase(), value: el.value
            })),
            unlabeled: unlabeled.map(el => el.name),
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1
          };
        });
        const issues = [];
        if (row.name !== tool.name) issues.push("heading mismatch");
        if (!row.category) issues.push("category missing");
        if (!row.result || row.result === "—" || row.resultLabel === "CHECK YOUR INPUTS") issues.push("default handler failed: " + row.resultLabel + " — " + row.resultDetail);
        if (!row.fields.length) issues.push("input fields missing");
        if (row.unlabeled.length) issues.push("unlabeled inputs: " + row.unlabeled.join(", "));
        if (row.horizontalOverflow) issues.push("horizontal overflow");
        completed[viewport.name].push(tool.id);
        const record = { id: tool.id, ...row, status: issues.length ? "failed" : "default-handler-passed", issues };
        if (issues.length) failures.push({ viewport: viewport.name, id: tool.id, name: tool.name, issues, fields: row.fields });
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
      desktopPassed: records.filter(x => x.status === "default-handler-passed").length,
      mobilePassed: mobileRecords.filter(x => x.status === "default-handler-passed").length,
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
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
});
