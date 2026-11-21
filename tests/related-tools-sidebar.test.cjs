const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "redesign.css"), "utf8");

test("related tools are selected from the active canonical subcategory", () => {
  assert.match(app, /directoryMapping\?\.categories\.find/);
  assert.match(app, /item\.toolIds\.includes\(d\.id\)/);
  assert.match(app, /sub\.toolIds\.map\(id=>D\.find\(tool=>tool\.id===id\)\)/);
  assert.match(app, /tool\.id!==d\.id/);
  assert.match(app, /\?tool=/);
});

test("related tools render in an accessible sibling sidebar", () => {
  assert.match(app, /className="tool-page-layout"/);
  assert.match(app, /className="tool-primary-column"/);
  assert.match(app, /className="tool-related-sidebar"/);
  assert.match(app, /setAttribute\("aria-label","Related tools in this group"\)/);
  assert.match(app, /relatedSidebar\.appendChild\(relatedPanel\)/);
});

test("related tools sidebar has desktop, mobile and print layouts", () => {
  assert.match(css, /\.tool-page-layout\{display:grid;grid-template-columns:minmax\(0,1fr\) 238px/);
  assert.match(css, /@media\(max-width:760px\)\{\.tool-page-layout\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(css, /@media print\{\.tool-related-sidebar/);
});

test("brand link returns to the canonical homepage from every tool route", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /<a class="brand" href="https:\/\/apex-global-labs\.github\.io\/FinPulse-Hub\/" aria-label="FinPulse Hub homepage">/);
  assert.doesNotMatch(html, /<a class="brand" href="#">/);
});
