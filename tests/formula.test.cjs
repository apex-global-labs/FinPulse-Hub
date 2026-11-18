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

test("Retirement savings projects growth and inflation-adjusted value",()=>{const x=F.retirementSavings(10000,200,5,10,2);assert.ok(x.futureValue>x.totalContributions);assert.ok(x.inflationAdjustedValue<x.futureValue)});
test("401k calculator applies employer match up to salary cap",()=>{const x=F.retirement401k(60000,10,50,6,5000,5,10);near(x.employerMatchAnnual,1800);near(x.employeeContributions,60000);near(x.employerContributions,18000)});
test("IRA comparison returns simplified after-tax scenarios",()=>{const x=F.iraComparison(7000,20,6,22,22);assert.ok(x.traditionalAfterTax>0);assert.ok(x.rothAfterTax>0);near(x.difference,x.rothAfterTax-x.traditionalAfterTax)});
test("Inflation calculator estimates future cost and purchasing power",()=>{const x=F.inflationCalculator(1000,3,10);near(x.futureCost,1343.916379,0.001);near(x.purchasingPower,744.0939,0.01)});
test("CD calculator calculates fixed-APY maturity value",()=>{const x=F.certificateDeposit(10000,4.5,12);near(x.futureValue,10450);near(x.interestEarned,450)});
test("APY calculator converts nominal rate by compounding frequency",()=>{const x=F.apyCalculator(10000,12,12);near(x.apy,12.682503,0.001);near(x.interestEarned,1268.25,0.02)});
test("New retirement, inflation and deposit tools reject invalid inputs",()=>{assert.throws(()=>F.retirementSavings(-1,100,5,10));assert.throws(()=>F.retirement401k(60000,10,50,6,0,5,0));assert.throws(()=>F.iraComparison(7000,20,6,101,22));assert.throws(()=>F.inflationCalculator(1000,3,101));assert.throws(()=>F.certificateDeposit(1000,4,0));assert.throws(()=>F.apyCalculator(1000,4,0))});

test("CD term and APY compounding frequency require whole months and periods",()=>{assert.throws(()=>F.certificateDeposit(1000,4,2.5));assert.throws(()=>F.apyCalculator(1000,4,2.5))});

test("Tax calculator applies credits without allowing negative tax",()=>{const x=F.taxEstimate(50000,20,15000);near(x.grossTax,10000);near(x.tax,0);near(x.afterTax,50000)});
test("Progressive income tax applies marginal rates to each band only",()=>{const x=F.progressiveIncomeTax(80000,10000,10000,10,40000,12,90000,22,24);near(x.taxableIncome,70000);near(x.tax,11200);near(x.marginalRate,22)});
test("Sales tax calculates discount before tax",()=>{const x=F.salesTax(100,10,10);near(x.taxableAmount,90);near(x.tax,9);near(x.finalTotal,99)});
test("VAT GST adds or extracts the entered rate",()=>{near(F.vatGst(100,15,"add").total,115);near(F.vatGst(115,15,"remove").base,100);near(F.vatGst(115,15,"remove").tax,15)});
test("Tax refund estimator distinguishes refund and amount due",()=>{near(F.taxRefund(9000,10500,0).refund,1500);near(F.taxRefund(10000,9000,500).amountDue,500)});
test("Salary take-home calculates annual, monthly and paycheck net",()=>{const x=F.salaryTakeHome(60000,20,5,200,50,26);near(x.netAnnual,42000);near(x.netMonthly,3500);near(x.netPerPaycheck,1615.3846,0.001)});
test("Tax and salary calculators reject invalid rates and brackets",()=>{assert.throws(()=>F.taxEstimate(1000,101,0));assert.throws(()=>F.progressiveIncomeTax(50000,1000,20000,10,10000,12,30000,20,25));assert.throws(()=>F.salesTax(100,101,5));assert.throws(()=>F.vatGst(100,101));assert.throws(()=>F.salaryTakeHome(1000,101,0,0,0,12))});


test("Paycheck calculator separates regular, overtime and deductions",()=>{const x=F.paycheck(20,40,5,1.5,100,10,5,20,10);near(x.regularPay,800);near(x.overtimePay,150);near(x.gross,1050);near(x.net,862.5)});
test("Payroll calculator estimates monthly and annual employer costs",()=>{const x=F.payroll(5,3000,10,200,100);near(x.grossMonthly,15000);near(x.employerTaxesMonthly,1500);near(x.benefitsMonthly,1000);near(x.totalMonthly,17600);near(x.totalAnnual,211200)});
test("Overtime calculator applies the entered multiplier",()=>{const x=F.overtimePay(20,40,5,1.5);near(x.regular,800);near(x.overtime,150);near(x.gross,950);near(x.blendedRate,950/45)});
test("Discount calculator applies sequential discounts before tax",()=>{const x=F.discountCalculator(100,20,10,10,5);near(x.totalDiscount,28);near(x.discountedSubtotal,72);near(x.tax,7.2);near(x.total,84.2)});
test("Exchange fee calculator applies fixed and percentage fees plus rate markup",()=>{const x=F.exchangeFeeMarkup(1000,1.1,2,1,5);near(x.fee,15);near(x.customerRate,1.078);near(x.convertedAmount,1061.83);near(x.effectiveRate,1.06183)});
test("International transfer comparison identifies higher recipient amount",()=>{const x=F.internationalTransferCompare(1000,1.1,5,1,2,2,1.5,1);assert.equal(x.bestProvider,"B");assert.ok(x.providerB.convertedAmount>x.providerA.convertedAmount)});
test("Payroll and transfer calculators reject invalid values",()=>{assert.throws(()=>F.payroll(1.5,1000,5,0,0));assert.throws(()=>F.payroll(2,1000,101,0,0));assert.throws(()=>F.overtimePay(20,40,5,0));assert.throws(()=>F.discountCalculator(100,101,0,0));assert.throws(()=>F.exchangeFeeMarkup(10,1,0,100,1));assert.throws(()=>F.internationalTransferCompare(10,1,0,100,0,0,0,0))});

global.window = global.window || {};
require("../tax-data.js");
require("../tax-engine.js");
const Tax = global.window.FinPulseTaxEngine;
test("2026 US federal single brackets apply the standard deduction and marginal rates",()=>{const x=Tax.estimate("US-2026-single",100000,0);near(x.taxableIncome,83900);near(x.tax,13170);near(x.effectiveRate,13.17);});
test("2026 US federal married filing jointly uses its own bracket schedule",()=>{const x=Tax.estimate("US-2026-joint",150000,0);near(x.taxableIncome,117800);near(x.tax,15340);});
test("2026 UK England tax includes personal allowance and progressive bands",()=>{const x=Tax.estimate("UK-2026-eng",60000,0);near(x.taxableIncome,47430);near(x.tax,11432);});
test("2026 UK personal allowance tapers above GBP 100000",()=>{const x=Tax.estimate("UK-2026-eng",110000,0);near(x.personalAllowance,7570);near(x.tax,33432);});
test("2026 Scotland uses separate Scottish marginal bands",()=>{const x=Tax.estimate("UK-2026-sct",60000,0);near(x.taxableIncome,47430);near(x.tax,13182.05,0.02);});
test("Bangladesh AY 2026-27 applies general tax-free threshold and minimum tax",()=>{const x=Tax.estimate("BD-2026-general",1000000,0);near(x.taxableIncome,625000);near(x.tax,78750);});
test("Bangladesh special taxpayer profiles use their distinct tax-free allowances",()=>{const a=Tax.estimate("BD-2026-general",500000,0),b=Tax.estimate("BD-2026-women-senior",500000,0);assert.ok(b.tax<a.tax);});
test("Canada 2026 combines federal and selected provincial marginal brackets",()=>{const x=Tax.estimate("CA-2026-AB",100000,0);near(x.taxableIncome,100000);near(x.tax,25472.005,0.02);assert.equal(x.breakdown.length,2);});
test("Tax engine rejects unknown profiles and invalid income/deductions",()=>{assert.throws(()=>Tax.estimate("US-unknown",10000,0));assert.throws(()=>Tax.estimate("US-2026-single",-1,0));assert.throws(()=>Tax.estimate("US-2026-single",1000,2000));});
