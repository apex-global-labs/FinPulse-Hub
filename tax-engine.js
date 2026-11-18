(()=>{"use strict";
function progressive(amount,bands){let previous=0,tax=0,breakdown=[];for(const b of bands){const upper=b.upTo,portion=Math.max(0,Math.min(amount,upper)-previous),due=portion*b.rate/100;if(portion>0)breakdown.push({portion,rate:b.rate,tax:due});tax+=due;previous=upper;if(amount<=upper)break;}return{tax,breakdown,marginalRate:(bands.find(b=>amount<=b.upTo)||bands[bands.length-1]).rate};}
function estimate(profileId,gross,deductions=0,stateId="none",stateStatus="single"){
const p=window.FinPulseTaxData.profiles[profileId];if(!p)throw Error("Choose a supported tax jurisdiction and year.");
for(const [v,n] of [[gross,"Gross income"],[deductions,"Deductions"]])if(!Number.isFinite(v)||v<0)throw Error(n+" must be a valid non-negative amount.");
if(deductions>gross)throw Error("Deductions cannot exceed gross income.");
let allowance=p.allowance||0;if(p.taperAllowanceAbove&&gross>p.taperAllowanceAbove)allowance=Math.max(0,allowance-(gross-p.taperAllowanceAbove)/2);
const taxable=Math.max(0,gross-deductions-allowance);let tax=0,breakdown=[],marginalRate=0;
if(p.components){for(const c of p.components){const componentTaxable=Math.max(0,gross-deductions-(c.allowance||0));const x=progressive(componentTaxable,c.bands);const due=Math.max(0,x.tax-(c.credit||0));tax+=due;marginalRate+=x.marginalRate;breakdown.push({component:c.name,tax:due,marginalRate:x.marginalRate,taxableIncome:componentTaxable,credit:c.credit||0});}}
else{const x=progressive(taxable,p.bands);tax=x.tax;marginalRate=x.marginalRate;breakdown=x.breakdown;}
let stateTax=0,stateTaxableIncome=0,stateName="";
if(profileId.startsWith("US-")&&stateId&&stateId!=="none"){
const st=window.FinPulseStateData.states[stateId];if(!st)throw Error("Choose a supported US state.");
const config=st[stateStatus==="joint"?"joint":"single"];stateName=st.name;stateTaxableIncome=Math.max(0,gross-deductions-config.standardDeduction);const sx=progressive(stateTaxableIncome,config.bands);stateTax=sx.tax;tax+=stateTax;breakdown.push({component:st.name+" state income tax",tax:stateTax,marginalRate:sx.marginalRate,taxableIncome:stateTaxableIncome});
}
const beforeMinimum=tax;if(p.minimumTax&&gross>allowance)tax=Math.max(tax,p.minimumTax);
return{profile:p.label,currency:p.currency,grossIncome:gross,deductions,personalAllowance:allowance,taxableIncome:taxable,stateTaxableIncome,stateTax,stateName,tax,effectiveRate:gross?tax/gross*100:0,marginalRate,breakdown,minimumTaxApplied:tax>beforeMinimum,note:"Educational estimate using selected 2026 brackets and standard deductions only. State-specific exemptions, credits, recapture, local taxes and special surtaxes may change US state liability. Payroll contributions are calculated separately; credits, reliefs and individual eligibility rules may change actual liability."};
}
function payroll(profileId,gross,filingStatus="single"){
if(!Number.isFinite(gross)||gross<0)throw Error("Gross income must be a valid non-negative amount.");
const items=[];const add=(name,amount)=>items.push({name,amount:Math.max(0,amount)});
if(profileId.startsWith("US-")){const p=window.FinPulseStateData.payroll.US;const status=profileId.endsWith("joint")?"joint":profileId.endsWith("separate")?"separate":profileId.endsWith("hoh")?"hoh":"single";add("Social Security (6.2%, wage-base limited)",Math.min(gross,p.socialSecurityWageBase)*p.socialSecurityRate/100);add("Medicare (1.45%)",gross*p.medicareRate/100);add("Additional Medicare (0.9%)",Math.max(0,gross-p.additionalMedicareThreshold[status])*p.additionalMedicareRate/100);}
else if(profileId.startsWith("UK-2026-")){const p=window.FinPulseStateData.payroll.UK;add("Employee National Insurance — Class 1",Math.max(0,Math.min(gross,p.upperEarningsLimit)-p.primaryThreshold)*p.mainRate/100+Math.max(0,gross-p.upperEarningsLimit)*p.upperRate/100);}
else if(profileId.startsWith("CA-2026-")){const qc=profileId.endsWith("-QC"),p=window.FinPulseStateData.payroll[qc?"QC":"CA"],basic=qc?p.qppBasicExemption:p.cppBasicExemption,max=qc?p.qppMaximumPensionable:p.cppMaximumPensionable,rate=qc?p.qppRate:p.cppRate,max2=qc?p.qpp2Maximum:p.cpp2Maximum,rate2=qc?p.qpp2Rate:p.cpp2Rate;const base=Math.max(0,Math.min(gross,max)-basic);add(qc?"Québec Pension Plan (QPP)":"Canada Pension Plan (CPP)",base*rate/100);add(qc?"QPP second additional contribution":"CPP second additional contribution",Math.max(0,Math.min(gross,max2)-max)*rate2/100);add("Employment Insurance (EI)",Math.min(gross,p.eiMaximumInsurable)*p.eiRate/100);if(qc)add("Québec Parental Insurance Plan (QPIP)",Math.min(gross,p.qpipMaximumInsurable)*p.qpipRate/100);}
const total=items.reduce((a,x)=>a+x.amount,0);return{items,total,note:items.length?"Estimated employee payroll contributions for a full calendar / tax year. Employer-side contributions, prior-employer year-to-date earnings, special exemptions and pay-period rounding are not included.":"No statutory employee payroll contribution profile is configured for this jurisdiction."};
}
window.FinPulseTaxEngine={estimate,payroll};
})();