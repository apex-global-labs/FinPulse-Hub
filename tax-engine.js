(()=>{"use strict";
function progressive(amount,bands){let previous=0,tax=0,breakdown=[];for(const b of bands){const upper=b.upTo,portion=Math.max(0,Math.min(amount,upper)-previous),due=portion*b.rate/100;if(portion>0)breakdown.push({portion,rate:b.rate,tax:due});tax+=due;previous=upper;if(amount<=upper)break;}return{tax,breakdown,marginalRate:(bands.find(b=>amount<=b.upTo)||bands[bands.length-1]).rate};}
function phasedAmount(base,phaseOut,income){if(!phaseOut)return base;if(income<=phaseOut.start)return base;if(income>=phaseOut.end)return phaseOut.min;return Math.max(phaseOut.min,base-(income-phaseOut.start)*(base-phaseOut.min)/(phaseOut.end-phaseOut.start));}
function estimate(profileId,gross,deductions=0,stateId="none",stateStatus="single",options={}){
const p=window.FinPulseTaxData.profiles[profileId];if(!p)throw Error("Choose a supported tax jurisdiction and year.");
for(const [v,n] of [[gross,"Gross income"],[deductions,"Deductions"]])if(!Number.isFinite(v)||v<0)throw Error(n+" must be a valid non-negative amount.");
if(deductions>gross)throw Error("Deductions cannot exceed gross income.");
const manualStateTax=options?.manualStateTax??0;if(!Number.isFinite(manualStateTax)||manualStateTax<0)throw Error("Manual state tax must be a valid non-negative amount.");if(manualStateTax>0&&(!profileId.startsWith("US-")||!stateId||stateId==="none"))throw Error("Choose a US state before entering a manual state tax amount.");
const disabledDependents=options?.disabledDependents??0;
if(!Number.isInteger(disabledDependents)||disabledDependents<0||disabledDependents>10)throw Error("Eligible disabled dependent count must be a whole number from 0 to 10.");
let allowance=p.allowance||0;
if(profileId.startsWith("BD-2026-"))allowance+=disabledDependents*(p.dependentDisabilityAllowance||0);
const adjustedNetIncome=Math.max(0,gross-deductions);
if(p.taperAllowanceAbove&&adjustedNetIncome>p.taperAllowanceAbove)allowance=Math.max(0,allowance-(adjustedNetIncome-p.taperAllowanceAbove)/2);
const taxable=Math.max(0,adjustedNetIncome-allowance);let tax=0,breakdown=[],marginalRate=0,creditTotal=0;
if(p.components){
for(const component of p.components){
const componentTaxable=Math.max(0,adjustedNetIncome-(component.allowance||0));
const x=progressive(componentTaxable,component.bands);
const creditAmount=phasedAmount(component.creditAmount||0,component.phaseOut,adjustedNetIncome);
const credit=Math.min(x.tax,creditAmount*(component.creditRate||0)/100);
let due=Math.max(0,x.tax-credit);
if(component.abatement)due*=1-component.abatement;
tax+=due;creditTotal+=credit;
marginalRate+=x.marginalRate*(component.abatement?1-component.abatement:1);
breakdown.push({component:component.name,tax:due,marginalRate:x.marginalRate,taxableIncome:componentTaxable,credit,creditAmount,abatement:component.abatement||0});
}
}else{
const x=progressive(taxable,p.bands);tax=x.tax;marginalRate=x.marginalRate;breakdown=x.breakdown;
}
let stateTax=0,stateTaxableIncome=null,stateName="",stateNote="",stateTaxMode="not-included";
if(profileId.startsWith("US-")&&stateId&&stateId!=="none"){
const st=window.FinPulseStateData.states[stateId];if(!st)throw Error("Choose a supported US state.");
if(!["single","joint"].includes(stateStatus))throw Error("US state estimate currently supports Single or Married Filing Jointly only.");
stateName=st.name;stateTax=manualStateTax;stateTaxMode="manual";stateNote="State tax is a user-entered annual amount. No unverified 2026 state brackets, deductions, credits, local taxes or special rules were applied.";
if(stateTax>0){tax+=stateTax;breakdown.push({component:st.name+" state income tax (manual input)",tax:stateTax,manual:true});}
}
const beforeMinimum=tax;
if(p.minimumTax&&adjustedNetIncome>allowance)tax=Math.max(tax,p.minimumTax);
let note="Educational estimate using selected 2026 jurisdiction rates and simplified assumptions. This is not a tax return or filing calculation. ";
if(profileId.startsWith("CA-2026-"))note+="Canadian federal and provincial/territorial basic personal amount non-refundable credits are applied, including the federal BPA phase-out, Manitoba BPA phase-out and Québec federal abatement. Other personal credits, provincial surtaxes/health premiums, local taxes, age/spouse/dependant/disability/tuition credits and special elections are not fully modeled. ";
if(profileId.startsWith("US-")&&stateId&&stateId!=="none")note+="The 2026 state schedule is not automatically calculated. Any state amount included is manually entered; local taxes, credits, exemptions, deductions and special adjustments are not calculated. The state estimate is incomplete and not authoritative. ";
if(profileId.startsWith("BD-2026-"))note+="Bangladesh AY 2026–27 applies the Tk 50,000 additional tax-free threshold per eligible child/dependent with disability entered; only one parent/legal guardian may claim for a dependent. A Tk 5,000 minimum tax applies when net total income exceeds the applicable tax-free threshold under the published 2026–27 budget framework. Source-based minimum tax, rebates, surcharge, wealth surcharge, special income sources and other eligibility conditions are not modeled. ";
note+=stateNote;
return{profile:p.label,currency:p.currency,grossIncome:gross,deductions,personalAllowance:allowance,taxableIncome:taxable,stateTaxableIncome,stateTax,stateName,stateTaxMode,tax,creditTotal,effectiveRate:gross?tax/gross*100:0,marginalRate,breakdown,minimumTaxApplied:tax>beforeMinimum,note};
}
function payroll(profileId,gross,filingStatus="single"){
if(!Number.isFinite(gross)||gross<0)throw Error("Gross income must be a valid non-negative amount.");
const items=[];const add=(name,amount)=>items.push({name,amount:Math.max(0,amount)});
if(profileId.startsWith("US-")){const p=window.FinPulseStateData.payroll.US;const status=profileId.endsWith("joint")?"joint":profileId.endsWith("separate")?"separate":profileId.endsWith("hoh")?"hoh":"single";add("Social Security (6.2%, wage-base limited)",Math.min(gross,p.socialSecurityWageBase)*p.socialSecurityRate/100);add("Medicare (1.45%)",gross*p.medicareRate/100);add("Additional Medicare (0.9%)",Math.max(0,gross-p.additionalMedicareThreshold[status])*p.additionalMedicareRate/100);}
else if(profileId.startsWith("UK-2026-")){const p=window.FinPulseStateData.payroll.UK;add("Employee National Insurance — Class 1",Math.max(0,Math.min(gross,p.upperEarningsLimit)-p.primaryThreshold)*p.mainRate/100+Math.max(0,gross-p.upperEarningsLimit)*p.upperRate/100);}
else if(profileId.startsWith("CA-2026-")){const qc=profileId.endsWith("-QC"),p=window.FinPulseStateData.payroll[qc?"QC":"CA"],basic=qc?p.qppBasicExemption:p.cppBasicExemption,max=qc?p.qppMaximumPensionable:p.cppMaximumPensionable,rate=qc?p.qppRate:p.cppRate,max2=qc?p.qpp2Maximum:p.cpp2Maximum,rate2=qc?p.qpp2Rate:p.cpp2Rate;const base=Math.max(0,Math.min(gross,max)-basic);add(qc?"Québec Pension Plan (QPP)":"Canada Pension Plan (CPP)",base*rate/100);add(qc?"QPP second additional contribution":"CPP second additional contribution",Math.max(0,Math.min(gross,max2)-max)*rate2/100);add("Employment Insurance (EI)",Math.min(gross,p.eiMaximumInsurable)*p.eiRate/100);if(qc)add("Québec Parental Insurance Plan (QPIP)",Math.min(gross,p.qpipMaximumInsurable)*p.qpipRate/100);}
const total=items.reduce((a,x)=>a+x.amount,0);
let note=items.length?"Estimated employee payroll contributions for a full calendar / tax year. Employer-side contributions, prior-employer year-to-date earnings, multiple-employer coordination, special exemptions and pay-period rounding are not included.":"No statutory employee payroll contribution profile is configured for this jurisdiction.";
if(profileId.startsWith("BD-2026-"))note="Bangladesh statutory payroll withholding and employee/employer contribution rules are not configured in this calculator. This result is not a statutory net-pay estimate; employer withholding under applicable NBR rules, benefits, provident fund, gratuity, exemptions and year-to-date reconciliation are excluded.";
return{items,total,note};
}
window.FinPulseTaxEngine={estimate,payroll};
})();