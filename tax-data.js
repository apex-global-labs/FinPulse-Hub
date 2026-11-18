(()=>{"use strict";
const bands=(rows)=>rows.map(([upTo,rate])=>({upTo,rate}));
const us={
 "US-2026-single":{label:"United States — Federal · Single · 2026",currency:"USD",allowance:16100,bands:bands([[12400,10],[50400,12],[105700,22],[201775,24],[256225,32],[640600,35],[Infinity,37]])},
 "US-2026-joint":{label:"United States — Federal · Married filing jointly · 2026",currency:"USD",allowance:32200,bands:bands([[24800,10],[100800,12],[211400,22],[403550,24],[512450,32],[768700,35],[Infinity,37]])},
 "US-2026-separate":{label:"United States — Federal · Married filing separately · 2026",currency:"USD",allowance:16100,bands:bands([[12400,10],[50400,12],[105700,22],[201775,24],[256225,32],[384350,35],[Infinity,37]])},
 "US-2026-hoh":{label:"United States — Federal · Head of household · 2026",currency:"USD",allowance:24150,bands:bands([[17700,10],[67450,12],[105700,22],[201750,24],[256200,32],[640600,35],[Infinity,37]])}
};
const uk={
 "UK-2026-eng":{label:"United Kingdom — England, Wales & Northern Ireland · 2026–27",currency:"GBP",allowance:12570,taperAllowanceAbove:100000,bands:bands([[37700,20],[125140,40],[Infinity,45]])},
 "UK-2026-sct":{label:"United Kingdom — Scotland · 2026–27",currency:"GBP",allowance:12570,taperAllowanceAbove:100000,bands:bands([[3967,19],[16956,20],[31092,21],[62430,42],[125140,45],[Infinity,48]])}
};
const caFederal=bands([[58523,14],[117045,20.5],[181440,26],[258482,29],[Infinity,33]]);
const caProv={
AB:{label:"Alberta",bands:bands([[61200,8],[154259,10],[185111,12],[246813,13],[370220,14],[Infinity,15]])},
BC:{label:"British Columbia",bands:bands([[50363,5.6],[100728,7.7],[115648,10.5],[140430,12.29],[190405,14.7],[265545,16.8],[Infinity,20.5]])},
MB:{label:"Manitoba",bands:bands([[47564,10.8],[101200,12.75],[Infinity,17.4]])},
NB:{label:"New Brunswick",bands:bands([[52333,9.4],[104666,14],[193861,16],[Infinity,19.5]])},
NL:{label:"Newfoundland and Labrador",bands:bands([[44678,8.7],[89354,14.5],[159528,15.8],[223340,17.8],[285319,19.8],[570638,20.8],[1141275,21.3],[Infinity,21.8]])},
NT:{label:"Northwest Territories",bands:bands([[53003,5.9],[106009,8.6],[172346,12.2],[Infinity,14.05]])},
NS:{label:"Nova Scotia",bands:bands([[30995,8.79],[61991,14.95],[97417,16.67],[157124,17.5],[Infinity,21]])},
NU:{label:"Nunavut",bands:bands([[55801,4],[111602,7],[181439,9],[Infinity,11.5]])},
ON:{label:"Ontario",bands:bands([[53891,5.05],[107785,9.15],[150000,11.16],[220000,12.16],[Infinity,13.16]])},
PE:{label:"Prince Edward Island",bands:bands([[33928,9.5],[65820,13.47],[106890,16.6],[142520,17.62],[200000,19],[Infinity,20]])},
SK:{label:"Saskatchewan",bands:bands([[54532,10.5],[155805,12.5],[Infinity,14.5]])},
YT:{label:"Yukon",bands:bands([[58523,6.4],[117045,9],[181440,10.9],[500000,12.8],[Infinity,15]])}
};
const canada={};for(const [code,p] of Object.entries(caProv))canada["CA-2026-"+code]={label:"Canada — Federal + "+p.label+" · 2026",currency:"CAD",components:[{name:"Federal",bands:caFederal},{name:p.label,bands:p.bands}]};
const bd={
 "BD-2026-general":{label:"Bangladesh — General individual · AY 2026–27",currency:"BDT",allowance:375000,bands:bands([[300000,10],[700000,15],[1200000,20],[3200000,25],[Infinity,30]]),minimumTax:5000},
 "BD-2026-women-senior":{label:"Bangladesh — Women / age 65+ · AY 2026–27",currency:"BDT",allowance:425000,bands:bands([[300000,10],[700000,15],[1200000,20],[3200000,25],[Infinity,30]]),minimumTax:5000},
 "BD-2026-third-gender-disability":{label:"Bangladesh — Third gender / disability · AY 2026–27",currency:"BDT",allowance:500000,bands:bands([[300000,10],[700000,15],[1200000,20],[3200000,25],[Infinity,30]]),minimumTax:5000},
 "BD-2026-freedom-fighter":{label:"Bangladesh — Gazetted freedom fighter / July fighter · AY 2026–27",currency:"BDT",allowance:525000,bands:bands([[300000,10],[700000,15],[1200000,20],[3200000,25],[Infinity,30]]),minimumTax:5000}
};
canada["CA-2026-QC"]={label:"Canada — Federal + Québec · 2026",currency:"CAD",components:[{name:"Federal",bands:caFederal},{name:"Québec",bands:bands([[54345,14],[108680,19],[132245,24],[Infinity,25.75]]),credit:18952*0.14}]};
const profiles={...us,...uk,...canada,...bd};
const sources={
 US:"https://www.irs.gov/pub/irs-pdf/p505.pdf",
 UK:"https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past",
 UK_SCOTLAND:"https://www.gov.uk/scottish-income-tax/how-it-works",
 CA:"https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
 BD:"https://nbr.gov.bd/uploads/paripatra/Income-tax_Paripatra_2025-2026-1.pdf"
};
sources.US_STATES="https://statewisenews.com/state-income-tax-rates/";sources.QUEBEC="https://www.revenuquebec.ca/en/citizens/income-tax-return/completing-your-income-tax-return/income-tax-rates/";sources.FICA="https://www.irs.gov/publications/p15";sources.UK_NI="https://www.gov.uk/government/publications/budget-2026-overview-of-tax-legislation-and-rates-ootlar/annex-a-rates-and-allowances";sources.CA_PAYROLL="https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032oc-jan/t4032oc-january-general-information.html";sources.QC_PAYROLL="https://www.revenuquebec.ca/en/businesses/source-deductions-and-employer-contributions/employers-principal-changes-for-2026/";
window.FinPulseTaxData={profiles,sources,checkedOn:"2026-11-18"};
})();