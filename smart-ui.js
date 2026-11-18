(()=>{"use strict";
const currencies=[
{code:"USD",name:"US Dollar",symbol:"$"},{code:"EUR",name:"Euro",symbol:"€"},{code:"GBP",name:"British Pound",symbol:"£"},{code:"BDT",name:"Bangladeshi Taka",symbol:"৳"},{code:"CAD",name:"Canadian Dollar",symbol:"CA$"},{code:"AUD",name:"Australian Dollar",symbol:"A$"},{code:"INR",name:"Indian Rupee",symbol:"₹"},{code:"JPY",name:"Japanese Yen",symbol:"¥"},{code:"CHF",name:"Swiss Franc",symbol:"CHF"},{code:"SGD",name:"Singapore Dollar",symbol:"S$"},{code:"AED",name:"UAE Dirham",symbol:"د.إ"},{code:"SAR",name:"Saudi Riyal",symbol:"﷼"},{code:"NZD",name:"New Zealand Dollar",symbol:"NZ$"},{code:"ZAR",name:"South African Rand",symbol:"R"},{code:"CNY",name:"Chinese Yuan",symbol:"¥"}
];
const checkedOn="2026-11-18";
const presets=[
{id:"custom",label:"Custom / enter my local rate",rate:0,note:"No country-wide rate is assumed; enter the applicable local or product-specific rate.",source:"User-entered local rate"},
{id:"US",label:"United States — local rate required",rate:0,note:"The United States has no single nationwide general sales-tax rate; state and local rules vary. Zero is only a starting placeholder, not a claim that the sale is tax-free.",source:"State and local rate must be confirmed for the place of supply"},
{id:"GB",label:"United Kingdom — standard VAT",rate:20,note:"Standard VAT rate. Reduced, zero-rated and exempt supplies exist.",source:"https://www.gov.uk/vat-rates"},
{id:"BD",label:"Bangladesh — standard VAT",rate:15,note:"Standard VAT rate for taxable supplies; exemptions, reduced or product-specific treatments may apply.",source:"https://nbr.gov.bd/faq/vat-faq"},
{id:"CA-AB",label:"Canada — Alberta (GST)",rate:5,note:"GST rate; other province-specific taxes and supply rules may affect the total.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-BC",label:"Canada — British Columbia (GST + PST)",rate:12,note:"Combined 5% GST and 7% PST standard starting point; exemptions and place-of-supply rules may apply.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-MB",label:"Canada — Manitoba (GST + PST)",rate:12,note:"Combined 5% GST and 7% PST standard starting point.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-NB",label:"Canada — New Brunswick (HST)",rate:15,note:"HST rate shown by the CRA for the province.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-NL",label:"Canada — Newfoundland and Labrador (HST)",rate:15,note:"HST rate shown by the CRA for the province.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-NS",label:"Canada — Nova Scotia (HST)",rate:14,note:"HST rate shown by the CRA, effective April 1, 2025.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-ON",label:"Canada — Ontario (HST)",rate:13,note:"HST rate shown by the CRA for the province.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-QC",label:"Canada — Quebec (GST + QST)",rate:14.975,note:"Combined 5% GST and 9.975% QST indicative rate; QST administration and transaction rules can differ.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-PE",label:"Canada — Prince Edward Island (HST)",rate:15,note:"HST rate shown by the CRA for the province.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-SK",label:"Canada — Saskatchewan (GST + PST)",rate:11,note:"Combined 5% GST and 6% PST standard starting point.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"},
{id:"CA-TERR",label:"Canada — Territories (GST)",rate:5,note:"GST rate shown by the CRA for Northwest Territories, Nunavut and Yukon.",source:"https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html"}
];
function sliderConfig(field){const key=String(field[0]).toLowerCase(),label=String(field[1]).toLowerCase(),v=Math.max(0,Number(field[2])||0);let max;
if(key==="multiplier"||label.includes("multiplier"))max=5;
else if(/rate|percent|tax|discount|markup|margin|inflation|apy|return|dti|withholding|contribution/.test(key+" "+label))max=Math.max(100,v*1.5);
else if(/year/.test(key+" "+label))max=Math.max(50,v*1.5);
else if(/month|term/.test(key+" "+label))max=Math.max(600,v*1.5);
else if(/day/.test(key+" "+label))max=Math.max(3660,v*1.5);
else if(/hour/.test(key+" "+label))max=Math.max(168,v*1.5);
else if(/week/.test(key+" "+label))max=Math.max(52,v*1.5);
else if(/people|employee|period|frequency|count/.test(key+" "+label))max=Math.max(100,v*2);
else max=Math.max(1000,v*3);
max=Math.min(Math.max(max,1),1000000000);
const integer=/year|month|term|day|hour|week|people|employee|period|frequency|count/.test(key+" "+label);
const percent=/rate|percent|tax|discount|markup|margin|inflation|apy|return|dti|withholding|contribution/.test(key+" "+label);
return{max,step:integer?"1":percent?"0.01":"0.01"}}
function currencySymbol(code){const c=currencies.find(x=>x.code===code);return c?c.symbol:code+" "}\nfunction currencyLabel(code){const c=currencies.find(x=>x.code===code);return c?c.symbol+" "+c.code+" — "+c.name:code}
function getCountryPreset(tool,id){const p=presets.find(x=>x.id===id);return p?{...p,checkedOn}:null}
window.FinPulseSmartUI={currencies,cryptoAssets:[{symbol:"BTC",name:"Bitcoin"},{symbol:"ETH",name:"Ethereum"},{symbol:"USDT",name:"Tether"}],sliderConfig,currencyLabel,currencySymbol,countryPresets:{"sales-tax":presets,"vat-gst":presets},getCountryPreset};
})();