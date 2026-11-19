(()=>{"use strict";const PI=Math.PI;
const tables={
length:{mm:.001,cm:.01,m:1,km:1000,in:.0254,ft:.3048,yd:.9144,mi:1609.344,nmi:1852},
mass:{mg:1e-6,g:.001,kg:1,tonne:1000,oz:.028349523125,lb:.45359237,stone:6.35029318},
area:{mm2:1e-6,cm2:1e-4,m2:1,km2:1e6,ha:10000,acre:4046.8564224,ft2:.09290304,yd2:.83612736},
volume:{mL:1e-6,L:.001,m3:1,tspUS:4.92892159375e-6,tbspUS:1.478676478125e-5,cupUS:.0002365882365,flOzUS:2.95735295625e-5,pintUS:.000473176473,quartUS:.000946352946,gallonUS:.003785411784,gallonUK:.00454609},
speed:{mps:1,kph:1/3.6,mph:.44704,ftps:.3048,knot:.514444444444},
pressure:{Pa:1,kPa:1000,MPa:1e6,bar:100000,atm:101325,psi:6894.757293168,mmHg:133.322387415},
energy:{J:1,kJ:1000,MJ:1e6,cal:4.184,kcal:4184,Wh:3600,kWh:3600000,BTU:1055.05585262,eV:1.602176634e-19},
power:{W:1,kW:1000,MW:1e6,hp:745.699871582,metricHp:735.49875,BTUh:.2930710702},
frequency:{Hz:1,kHz:1000,MHz:1e6,GHz:1e9,rpm:1/60},
angle:{rad:1,deg:PI/180,grad:PI/200,turn:2*PI,arcmin:PI/10800,arcsec:PI/648000},
density:{kgm3:1,gcm3:1000,gmL:1000,kgL:1000,lbft3:16.01846337396,lbgalUS:119.8264273},
storage:{B:1,KB:1e3,MB:1e6,GB:1e9,TB:1e12,PB:1e15,KiB:1024,MiB:1048576,GiB:1073741824,TiB:1099511627776,PiB:1125899906842624},
transfer:{bps:1,Kbps:1e3,Mbps:1e6,Gbps:1e9,Bps:8,KBps:8e3,MBps:8e6,GBps:8e9},
storage:{B:1,KB:1e3,MB:1e6,GB:1e9,TB:1e12,PB:1e15,KiB:1024,MiB:1048576,GiB:1073741824,TiB:1099511627776,PiB:1125899906842624},
transfer:{bps:1,Kbps:1e3,Mbps:1e6,Gbps:1e9,Bps:8,KBps:8e3,MBps:8e6,GBps:8e9},
cooking:{mL:1,L:1000,tspUS:4.92892159375,tbspUS:14.78676478125,cupUS:236.5882365,flOzUS:29.5735295625,pintUS:473.176473,quartUS:946.352946,cupMetric:250,tspMetric:5,tbspMetric:15}
};
function convert(kind,value,from,to){if(!Number.isFinite(value))throw Error("Enter a finite numeric value.");
if(kind==="temperature"){if(from==="K"&&value<0)throw Error("Kelvin cannot be below absolute zero.");const c=from==="F"?(value-32)*5/9:from==="K"?value-273.15:value;if(to==="K"&&c+273.15<0)throw Error("Temperature is below absolute zero.");return to==="F"?c*9/5+32:to==="K"?c+273.15:c}
if(kind==="fuel"){if(value<=0)throw Error("Fuel economy must be greater than zero.");const kmL=from==="L100"?100/value:from==="mpgUS"?value*.425143707:from==="mpgUK"?value*.354006:value;return to==="L100"?100/kmL:to==="mpgUS"?kmL/.425143707:to==="mpgUK"?kmL/.354006:kmL}
const t=tables[kind];if(!t||!(from in t)||!(to in t))throw Error("Choose supported units for this conversion.");return value*t[from]/t[to]}
function format(n){if(!Number.isFinite(n))throw Error("The converted result is outside the supported numeric range.");return new Intl.NumberFormat("en-US",{maximumFractionDigits:10,maximumSignificantDigits:12}).format(n)}
function baseConvert(value,from,to){const s=String(value).trim();if(!s||s.length>128)throw Error("Enter a number containing 1–128 digits.");const valid={2:/^[01]+$/,8:/^[0-7]+$/,10:/^[0-9]+$/,16:/^[0-9a-f]+$/i};if(!valid[from].test(s))throw Error("The value contains a digit that is invalid for base "+from+".");let v=0n;for(const ch of s.toLowerCase())v=v*BigInt(from)+BigInt(parseInt(ch,16));return v.toString(Number(to)).toUpperCase()}
const romanMap=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
function romanEncode(value){if(!Number.isInteger(value)||value<1||value>3999)throw Error("Roman numerals support whole numbers from 1 to 3,999.");let out="";for(const [n,s] of romanMap)while(value>=n){out+=s;value-=n}return out}
function romanDecode(value){const s=String(value).trim().toUpperCase();if(!s||!/^[MDCLXVI]+$/.test(s))throw Error("Enter a Roman numeral using I, V, X, L, C, D or M.");let i=0,n=0;for(const [v,t] of romanMap)while(s.slice(i,i+t.length)===t){n+=v;i+=t.length}if(i!==s.length||romanEncode(n)!==s)throw Error("Enter a canonical Roman numeral from I to MMMCMXCIX.");return n}
function paper(size,orientation){let w,h;const A=[[841,1189],[594,841],[420,594],[297,420],[210,297],[148,210],[105,148],[74,105],[52,74],[37,52],[26,37]],B=[[1000,1414],[707,1000],[500,707],[353,500],[250,353],[176,250],[125,176],[88,125],[62,88],[44,62],[31,44]];if(/^A(10|[0-9])$/.test(size))[w,h]=A[Number(size.slice(1))];else if(/^B(10|[0-9])$/.test(size))[w,h]=B[Number(size.slice(1))];else{const us={Letter:[215.9,279.4],Legal:[215.9,355.6],Tabloid:[279.4,431.8],Executive:[184.15,266.7]};if(!us[size])throw Error("Choose a supported ISO A/B or US paper size.");[w,h]=us[size]}if(orientation==="landscape")[w,h]=[h,w];return{width:w,height:h}}
window.FinPulseUnitCore={tables,convert,format,baseConvert,romanEncode,romanDecode,paper};})();