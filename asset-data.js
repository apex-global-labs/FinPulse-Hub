(()=>{"use strict";
const assets=[
{symbol:"BTC",name:"Bitcoin",kind:"crypto",baselinePrice:null,baselineCurrency:"USD",priceMode:"manual-hypothetical",isRealtime:false},
{symbol:"ETH",name:"Ethereum",kind:"crypto",baselinePrice:null,baselineCurrency:"USD",priceMode:"manual-hypothetical",isRealtime:false},
{symbol:"USDT",name:"Tether",kind:"stablecoin",baselinePrice:null,baselineCurrency:"USD",priceMode:"manual-hypothetical",isRealtime:false}
];
const assetClasses=[
{ id:"cash",label:"Cash / cash equivalents",returnAssumption:null,requiresUserInput:true },
{ id:"bonds",label:"Bonds (user-entered assumption)",returnAssumption:null,requiresUserInput:true },
{ id:"diversified",label:"Diversified portfolio (user-entered assumption)",returnAssumption:null,requiresUserInput:true },
{ id:"equities",label:"Equities (user-entered assumption)",returnAssumption:null,requiresUserInput:true },
{ id:"custom",label:"Custom asset / assumption",returnAssumption:null,requiresUserInput:true }
];
window.FinPulseAssetData={assets,assetClasses,pricePolicy:{mode:"user-entered-baseline-only",isRealtime:false,disclaimer:"Any entered baseline is a hypothetical input for arithmetic only, not a real-time exchange quote, forecast, or investment recommendation."}};
})();