"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { join } = require("node:path");

let server;
let browser;

test("all 220 registered tools execute their default calculation handler in desktop and mobile Chromium", { timeout: 240000 }, async t => {
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
  const runtimeErrors = [];

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
        await page.waitForFunction(
          name => {
            const heading = document.querySelector("#app .heading h2");
            const result = document.querySelector("#app .result .value");
            return heading?.textContent.trim() === name &&
              result && result.textContent.trim() !== "" &&
              result.textContent.trim() !== "—" &&
              !document.querySelector("#app .result .label")?.textContent.includes("CHECK YOUR INPUTS");
          },
          tool.name,
          { timeout: 5000 }
        );
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
            fields: fields.map(el => ({
              key: el.name,
              label: document.querySelector('label[for="' + CSS.escape(el.id) + '"]')?.textContent.trim() || "",
              type: el.type || el.tagName.toLowerCase()
            })),
            unlabeled: unlabeled.map(el => el.name),
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1
          };
        });
        assert.equal(row.name, tool.name, viewport.name + " heading: " + tool.id);
        assert.ok(row.category, viewport.name + " category missing: " + tool.id);
        assert.ok(row.result, viewport.name + " result missing: " + tool.id);
        assert.ok(row.fields.length > 0, viewport.name + " input fields missing: " + tool.id);
        assert.deepEqual(row.unlabeled, [], viewport.name + " unlabeled inputs: " + tool.id);
        assert.equal(row.horizontalOverflow, false, viewport.name + " horizontal overflow: " + tool.id);
        if (viewport.name === "desktop") records.push({ id: tool.id, ...row, status: "default-handler-passed" });
      }
      await page.close();
    }

    assert.deepEqual(runtimeErrors, [], "browser runtime/console errors");
    const categories = {};
    for (const row of records) categories[row.category] = (categories[row.category] || 0) + 1;
    assert.equal(records.length, 220);
    console.log("FUNCTIONAL_AUDIT_SUMMARY " + JSON.stringify({
      tools: records.length,
      viewports: ["desktop", "mobile"],
      executions: records.length * 2,
      categories,
      runtimeErrors: runtimeErrors.length
    }));
    console.log("FUNCTIONAL_AUDIT_REGISTRY " + JSON.stringify(records));
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
});
