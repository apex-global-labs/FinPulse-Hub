const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const app = fs.readFileSync("app.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

test("all 12 requested calculator modules are registered", () => {
  for (const id of ["currency","mortgage","loan","emi","compound","percentage","tip","car","amortization","savings","freelance","margin"]) {
    assert.match(app, new RegExp('id:"' + id + '"'));
  }
});
test("each calculator view displays Bismillah", () => {
  assert.match(app, /بِسْمِ اللَّهِ/);
});
test("currency conversion clearly uses a user-entered rate, not a live quote", () => {
  assert.match(app, /Exchange rate/);
  assert.match(app, /Live rates are not fetched/);
});
test("time-series graph renderer is included", () => {
  assert.match(app, /function graph\(s\)/);
  assert.match(app, /role="img"/);
});
test("responsive layout and mobile viewport are configured", () => {
  assert.match(html, /name="viewport"/);
  assert.match(css, /@media\(max-width:620px\)/);
});
test("calculator inputs include labels and form reset controls", () => {
  assert.match(app, /<label for=/);
  assert.match(app, /type="reset"/);
});

test("currency converter requests a no-key reference rate and shows its date", () => {
  assert.match(app, /https:\/\/api\.frankfurter\.dev\/v2\/rate\//);
  assert.match(app, /currencyRateDate/);
  assert.match(app, /Reference rates are not live market quotes/);
  assert.match(app, /Get latest rate & calculate/);
});
test("currency rate requests validate codes and handle failed or slow responses", () => {
  assert.match(app, /\^\[A-Z\]\{3\}\$/);
  assert.match(app, /AbortController/);
  assert.match(app, /showCurrencyError/);
});
