"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, ".prerender-pilot");
const SITE_URL = process.env.FINPULSE_SITE_URL || "https://apex-global-labs.github.io/FinPulse-Hub/";
const PILOTS = [
  { id: "mortgage", name: "Mortgage Calculator" },
  { id: "percentage", name: "Percentage Calculator" },
  { id: "age-calculator", name: "Age Calculator" },
  { id: "length-converter", name: "Length Converter" },
  { id: "word-counter", name: "Word Counter" }
];
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".webp":"image/webp" };

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}
async function serveFile(req, res) {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    let file;
    if (url.pathname.startsWith("/seo-prerender-pilot/")) {
      file = path.resolve(OUT, decodeURIComponent(url.pathname.slice("/seo-prerender-pilot/".length)));
      if (!inside(OUT, file)) throw new Error("Invalid generated path");
    } else {
      file = path.resolve(ROOT, "." + decodeURIComponent(url.pathname));
      if (!inside(ROOT, file)) throw new Error("Invalid repository path");
    }
    let stat;
    try { stat = await fs.stat(file); } catch {}
    if (stat?.isDirectory()) file = path.join(file, "index.html");
    const body = await fs.readFile(file);
    res.writeHead(200, { "content-type": mime[path.extname(file).toLowerCase()] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}
function canonicalFor(id) {
  const slugs = {
    mortgage: "mortgage-calculator",
    percentage: "percentage-calculator",
    "age-calculator": "age-calculator",
    "length-converter": "length-converter",
    "word-counter": "word-counter"
  };
  const slug = slugs[id];
  if (!slug) throw new Error("Unknown static SEO pilot route: " + id);
  const base = SITE_URL.endsWith("/") ? SITE_URL : SITE_URL + "/";
  return new URL("tools/" + slug + "/", base).href;
}
function staticRouteHtml(source, id, canonical) {
  let html = source.replace(/<html lang="en"([^>]*)>/i, '<html lang="en"$1 data-static-prerender="true" data-static-canonical="' + canonical + '" data-tool-id="' + id + '">');
  if (html === source) throw new Error(id + ": could not add static route markers");
  html = html.replace("<head>", '<head><base href="../../"><script src="../../seo-prerender-bootstrap.js"></script>');
  html = html.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + canonical + '">');
  html = html.replace("<h1>Online Math Calculator</h1>", '<div class="calc-home-title">Online Math Calculator</div>');
  html = html.replace("<h1>Make better sense<br><em>of your money.</em></h1>", '<div class="hero-title">Make better sense<br><em>of your money.</em></div>');
  const toolName = PILOTS.find(tool => tool.id === id)?.name;
  if (!toolName || !html.includes("<h2>" + toolName + "</h2>")) throw new Error(id + ": rendered tool heading missing");
  html = html.replace("<h2>" + toolName + "</h2>", "<h1>" + toolName + "</h1>");
  if (!html.includes('data-static-prerender="true"')) throw new Error(id + ": static marker missing");
  if (!html.includes('data-tool-id="' + id + '"')) throw new Error(id + ": tool marker missing");
  return html;
}
async function checkStaticSource(id, name, canonical) {
  const html = await fs.readFile(path.join(OUT, id, "index.html"), "utf8");
  assert.match(html, /<title>[^<]+<\/title>/i, id + ": title missing from initial HTML");
  assert.match(html, /<meta name="description" content="[^"]+"/i, id + ": description missing");
  assert.ok(html.includes('<link rel="canonical" href="' + canonical + '">'), id + ": canonical missing");
  const safeName = name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  assert.match(html, new RegExp("<h1[^>]*>" + safeName + "</h1>", "i"), id + ": H1 missing");
  assert.match(html, /id="formula-panel"[\s\S]*?<\/section>/i, id + ": formula/guide missing");
  assert.match(html, /class="[^"]*\bseo-content\b[^"]*"[^>]*>[\s\S]*?<details/i, id + ": FAQ missing");
  const jsonLd = html.match(/<script id="tool-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(jsonLd, id + ": JSON-LD missing");
  const graph = JSON.parse(jsonLd[1]);
  const software = graph["@graph"].find(item => item["@type"] === "SoftwareApplication");
  const faq = graph["@graph"].find(item => item["@type"] === "FAQPage");
  assert.ok(software, id + ": SoftwareApplication missing");
  assert.ok(faq, id + ": FAQPage missing");
  assert.equal(software.url, canonical, id + ": SoftwareApplication canonical mismatch");
  assert.equal(faq.url, canonical, id + ": FAQPage canonical mismatch");
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, id + ": static page should have exactly one H1");
  return { id, name, bytes: Buffer.byteLength(html), title: html.match(/<title>([^<]+)<\/title>/i)[1], canonical };
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });
  const server = http.createServer(serveFile);
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  const browser = await chromium.launch({ headless: true });
  const report = [];
  try {
    for (const tool of PILOTS) {
      const canonical = canonicalFor(tool.id);
      const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
      await page.goto(base + "/?tool=" + encodeURIComponent(tool.id), { waitUntil: "domcontentloaded" });
      await page.locator("#app .heading h2").waitFor();
      await page.locator("#formula-panel").waitFor();
      await page.locator(".seo-content details").first().waitFor();
      await page.locator("#tool-structured-data").waitFor({ state: "attached" });
      await page.waitForFunction(() => {
        const node = document.getElementById("tool-structured-data");
        try { return !!node && JSON.parse(node.textContent)["@graph"]?.length >= 2; } catch { return false; }
      });
      const html = staticRouteHtml(await page.content(), tool.id, canonical);
      const dir = path.join(OUT, tool.id);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, "index.html"), html);
      await page.close();
      report.push(await checkStaticSource(tool.id, tool.name, canonical));
    }
    await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), siteUrl: SITE_URL, routes: report }, null, 2));

    // Critical SEO content is present when JavaScript is disabled.
    for (const tool of PILOTS) {
      const page = await browser.newPage({ javaScriptEnabled: false });
      await page.goto(base + "/seo-prerender-pilot/" + tool.id + "/", { waitUntil: "domcontentloaded" });
      assert.equal(await page.locator("#app .heading h1").innerText(), tool.name, tool.id + ": no-JS H1");
      assert.ok(await page.locator("#formula-panel").count(), tool.id + ": no-JS formula");
      assert.ok(await page.locator(".seo-content details").count() >= 1, tool.id + ": no-JS FAQ");
      assert.ok(await page.locator("#tool-structured-data").count(), tool.id + ": no-JS JSON-LD");
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonicalFor(tool.id));
      await page.close();
    }

    // Hydration and calculations for all five representative tool types.
    for (const tool of PILOTS) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await page.goto(base + "/seo-prerender-pilot/" + tool.id + "/", { waitUntil: "domcontentloaded" });
      await page.locator("#app .heading h1").waitFor();
      assert.equal(await page.locator("#app .heading h1").count(), 1, tool.id + ": hydrated static route must retain exactly one H1");
      assert.equal(await page.locator("#app .heading h2").count(), 0, tool.id + ": hydrated static route must not downgrade H1 to H2");
      const expectedCanonical = canonicalFor(tool.id);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), expectedCanonical, tool.id + ": canonical changed during hydration");
      const hydratedGraph = await page.locator("#tool-structured-data").evaluate(node => JSON.parse(node.textContent));
      const hydratedSoftware = hydratedGraph["@graph"].find(item => item["@type"] === "SoftwareApplication");
      const hydratedFaq = hydratedGraph["@graph"].find(item => item["@type"] === "FAQPage");
      assert.equal(hydratedSoftware?.url, expectedCanonical, tool.id + ": hydrated SoftwareApplication URL mismatch");
      assert.equal(hydratedFaq?.url, expectedCanonical, tool.id + ": hydrated FAQPage URL mismatch");
      assert.equal(await page.locator("#form").count(), 1, tool.id + ": form did not hydrate");
      const textarea = page.locator("#form textarea").first();
      const number = page.locator('#form input[type="number"]').first();
      if (await textarea.count()) await textarea.fill("FinPulse Hub static SEO prerender test text.");
      else if (await number.count()) await number.fill(tool.id === "mortgage" ? "275000" : "12345");
      await page.locator("#form").evaluate(form => form.requestSubmit());
      await page.waitForFunction(() => {
        const value = document.querySelector("#app .result .value")?.textContent?.trim();
        return !!value && value !== "—";
      }, null, { timeout: 15000 });
      await page.close();
    }

    // Share, embed, existing query route and browser back/forward.
    const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
    await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
    const page = await context.newPage();
    await page.goto(base + "/seo-prerender-pilot/mortgage/", { waitUntil: "domcontentloaded" });
    await page.locator("#app .heading h1").waitFor();
    const input = page.locator('#form input[type="number"]').first();
    const before = await page.locator("#app .result .value").innerText();
    if (await input.count()) await input.fill("275000");
    await page.locator("#form").evaluate(form => form.requestSubmit());
    await page.waitForFunction(() => {
      const value = document.querySelector("#app .result .value")?.textContent?.trim();
      return !!value && value !== "—";
    });
    const after = await page.locator("#app .result .value").innerText();
    assert.ok(after && after !== "—", "Mortgage calculation result missing");

    await page.locator("#share-link").click();
    const shared = await page.evaluate(() => navigator.clipboard.readText());
    assert.ok(shared.includes("tool=mortgage"), "Share link did not retain selected tool");

    const embedMarkup = await page.locator("#embed-code").inputValue();
    const embedMatch = embedMarkup.match(/src="([^"]+)"/);
    assert.ok(embedMatch, "Embed iframe URL missing");
    const embedUrl = new URL(embedMatch[1]);
    assert.equal(embedUrl.searchParams.get("tool"), "mortgage");
    assert.equal(embedUrl.searchParams.get("embed"), "1");
    const embedPage = await context.newPage();
    await embedPage.goto(embedUrl.href, { waitUntil: "domcontentloaded" });
    await embedPage.locator("#form").waitFor();
    assert.ok(await embedPage.locator("body").evaluate(body => body.classList.contains("embed-mode")), "Embed mode failed");
    await embedPage.close();

    await page.goto(base + "/?tool=percentage", { waitUntil: "domcontentloaded" });
    await page.locator("#app .heading h2").waitFor();
    assert.ok((await page.locator("#app .heading h2").innerText()).includes("Percentage"), "Existing ?tool= route failed");
    await page.goBack();
    await page.locator("#app .heading h1").waitFor();
    assert.ok(page.url().includes("/seo-prerender-pilot/mortgage/"), "Back navigation did not restore static route");
    await page.goForward();
    await page.locator("#app .heading h2").waitFor();
    assert.ok(page.url().includes("?tool=percentage"), "Forward navigation did not restore query route");
    await context.close();

    console.log("SEO_PRERENDER_PILOT", JSON.stringify({
      routes: report,
      noJavaScriptRoutesPassed: PILOTS.length,
      hydratedCalculatorRoutesPassed: PILOTS.length,
      mortgageCalculation: { before, after },
      shareLink: "passed",
      embedMode: "passed",
      queryRoute: "passed",
      backForward: "passed",
      outputDirectory: ".prerender-pilot/"
    }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
