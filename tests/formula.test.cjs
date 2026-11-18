const test=require("node:test");
const assert=require("node:assert/strict");
const F=require("../finance-core.js");
const near=(actual,expected,tolerance=0.02)=>assert.ok(Math.abs(actual-expected)<=tolerance,actual+" is not within "+tolerance+" of "+expected);

test("Currency Converter applies exchange rate then provider fee",()=>{const x=F.currencyConvert(1000,1.1,2);near(x.gross,1100);near(x.fee,22);near(x.received,1078)});
test("Mortgage Calculator subtracts down payment before amortizing",()=>{const x=F.mortgage(250000,50000,6.5,360);near(x.basePayment,1264.14,0.03);assert.equal(x.months,360);assert.ok(x.totalInterest>0)});
test("Loan Calculator handles a standard fixed-rate loan",()=>{const x=F.loan(10000,12,12);near(x.basePayment,888.49,0.02);near(x.totalInterest,661.85,0.03);assert.equal(x.months,12)});
test("EMI Calculator handles reducing-balance monthly instalments",()=>{const x=F.emi(500000,10,60);near(x.basePayment,10623.52,0.03);assert.equal(x.months,60)});
test("Compound Interest Calculator compounds balance and end-of-month deposits",()=>{const x=F.compoundInterest(1000,100,12,12);near(x.futureValue,2395.07,0.03);near(x.totalContributions,2200);near(x.growth,195.07,0.03)});
test("Percentage Calculator supports of, change and reverse modes",()=>{near(F.percentage("of",200,15).value,30);near(F.percentage("change",80,100).value,25);near(F.percentage("reverse",30,15).value,200);assert.throws(()=>F.percentage("change",0,10))});
test("Tip Calculator calculates tip and equal split",()=>{const x=F.tip(100,15,4);near(x.tipAmount,15);near(x.total,115);near(x.perPerson,28.75);assert.equal(x.people,4)});
test("Auto Loan Calculator includes down payment, trade-in and financed fees",()=>{const x=F.carLoan(30000,5000,1000,6,60,500);near(x.principal,24500);near(x.basePayment,473.65,0.03)});
test("Loan Amortization Calculator returns a full zero-interest schedule",()=>{const x=F.amortization(1000,0,10);near(x.basePayment,100);near(x.totalInterest,0);near(x.totalPaid,1000);assert.equal(x.months,10)});
test("Savings Goal Calculator accounts for existing savings and zero interest",()=>{const x=F.savingsGoal(1200,0,0,12);near(x.monthlyDeposit,100);near(x.projectedBalance,1200);const y=F.savingsGoal(900,1000,0,12);near(y.monthlyDeposit,0)});
test("Freelance Hourly Rate Calculator includes costs and tax reserve",()=>{const x=F.freelanceRate(60000,8000,20,25,46);near(x.annualRevenueTarget,85000);near(x.annualBillableHours,1150);near(x.hourlyRate,73.913043,0.0001);assert.throws(()=>F.freelanceRate(1,1,100,1,1))});
test("Profit Margin Calculator distinguishes margin from markup",()=>{const x=F.profitMargin(10000,7500);near(x.profit,2500);near(x.margin,25);near(x.markup,100/3);assert.equal(F.profitMargin(0,0).margin,null)});
test("Loan and savings calculations reject invalid values",()=>{assert.throws(()=>F.loan(-1,5,12));assert.throws(()=>F.currencyConvert(1,0,0));assert.throws(()=>F.savingsGoal(1,1,-1,12))});

test("Mortgage affordability respects the tighter housing and total-debt limits",()=>{const x=F.mortgageAffordability(8000,650,60000,6.25,30,300,120,0,36,28);near(x.maxHousing,2230);near(x.principalPaymentBudget,1810);assert.ok(x.homePrice>x.maxLoan);assert.ok(x.monthlyDebtRatio<=36.001);assert.ok(x.balances.length>1)});
test("Mortgage payoff extra payments reduce interest and duration",()=>{const x=F.mortgagePayoff(200000,6,25,250);assert.ok(x.interestSaved>0);assert.ok(x.monthsSaved>0);assert.ok(x.acceleratedMonths<x.standardMonths)});
test("Mortgage refinance compares payments, costs and break-even",()=>{const x=F.mortgageRefinance(200000,7,20,5.5,20,4000);assert.ok(x.monthlySavings>0);assert.ok(x.breakEvenMonths>0);assert.ok(Number.isFinite(x.interestCostDifference))});
test("Personal loan accounts for origination fee and net proceeds",()=>{const x=F.personalLoan(15000,11.5,4,3,0);near(x.fee,450);near(x.netProceeds,14550);assert.ok(x.effectiveAnnualCost>11.5);assert.ok(x.totalCost>0)});
test("Student loan extra payments reduce interest and time",()=>{const x=F.studentLoan(32000,5.5,10,75);assert.ok(x.interestSaved>0);assert.ok(x.monthsSaved>0);assert.ok(x.acceleratedPayment>x.standardPayment)});
test("Simple interest uses original principal and day-count basis",()=>{const x=F.simpleInterest(10000,6,180,365);near(x.interest,295.89041096,0.001);near(x.total,10295.89041096,0.001);assert.ok(x.compoundEquivalent>0);assert.throws(()=>F.simpleInterest(10000,6,180,364))});
test("New finance tools reject invalid inputs",()=>{assert.throws(()=>F.mortgageAffordability(8000,650,60000,6,30,300,100,0,120,28));assert.throws(()=>F.mortgagePayoff(100000,6,20,-1));assert.throws(()=>F.mortgageRefinance(100000,6,20,5,0,1000));assert.throws(()=>F.personalLoan(10000,8,5,100,0));assert.throws(()=>F.studentLoan(10000,5,10,-5));assert.throws(()=>F.simpleInterest(10000,6,180,364))});

test("Refinance cost comparison does not count financed closing costs twice",()=>{const x=F.mortgageRefinance(200000,7,20,5.5,20,4000);near(x.interestCostDifference,x.newInterest-x.currentInterest)});
test("Personal loan fee-adjusted annualized cost is independent of optional prepayment",()=>{const a=F.personalLoan(15000,11.5,4,3,0),b=F.personalLoan(15000,11.5,4,3,150);near(a.effectiveAnnualCost,b.effectiveAnnualCost,0.0001);assert.ok(b.totalInterest<a.totalInterest)});
