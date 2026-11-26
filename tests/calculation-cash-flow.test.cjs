"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Core = require("../finance-core.js");

test("Cash flow: compounds monthly inflows and outflows from month one", () => {
  const x = Core.cashFlowProjection(1000, 100, 50, 10, 20, 3);
  assert.equal(x.endingCash, 1149);
  assert.equal(x.totalInflows, 331);
  assert.equal(x.totalOutflows, 182);
  assert.equal(x.netCashChange, 149);
  assert.deepEqual(x.rows.map(r => r.cash), [1050, 1100, 1149]);
  assert.deepEqual(x.balances, [1000, 1050, 1100, 1149]);
  assert.equal(x.monthlySchedule[1].openingBalance, 1050);
});

test("Cash flow: supports every documented projection period", () => {
  for (const period of [3, 6, 12, 24]) {
    const x = Core.cashFlowProjection(100, 10, 5, 0, 0, period);
    assert.equal(x.rows.length, period);
    assert.equal(x.endingCash, 100 + period * 5);
  }
});

test("Cash flow: preserves negative projected balances", () => {
  const x = Core.cashFlowProjection(10, 0, 20, 0, 0, 3);
  assert.equal(x.endingCash, -50);
  assert.equal(x.rows[0].cash, -10);
});

test("Cash flow: rejects negative, non-finite, excessive-growth and unsupported-period inputs", () => {
  assert.throws(() => Core.cashFlowProjection(-1, 0, 0, 0, 0, 3));
  assert.throws(() => Core.cashFlowProjection(0, -1, 0, 0, 0, 3));
  assert.throws(() => Core.cashFlowProjection(0, 0, 0, 101, 0, 3));
  assert.throws(() => Core.cashFlowProjection(0, 0, 0, 0, 101, 3));
  assert.throws(() => Core.cashFlowProjection(0, 0, 0, 0, 0, 4));
  assert.throws(() => Core.cashFlowProjection(Number.NaN, 0, 0, 0, 0, 3));
});
