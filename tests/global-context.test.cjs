const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const Global=require("../global-context.js");

test("global registries contain all ISO country/region entries and valid independent locale/currency choices",()=>{
 assert.equal(Global.countries.length,249);
 assert.equal(Global.metadata.countryStandard,"ISO 3166-1 alpha-2");
 assert.equal(Global.metadata.currencyStandard,"ISO 4217");
 assert.equal(new Set(Global.countries.map(x=>x.code)).size,249);
 assert.equal(Global.currencies.length,154);
 assert.equal(new Set(Global.currencies.map(x=>x.code)).size,154);
 assert.deepEqual(Global.locales.map(x=>x.code),["en","hi","ar","ur","zh-CN","ja","ru"]);
 assert.ok(Global.countries.every(x=>/^[A-Z]{2}$/.test(x.code)));
 assert.ok(Global.currencies.every(x=>/^[A-Z]{3}$/.test(x.code)));
});


test("global country and currency labels are generated only when settings are opened or a registry is requested",()=>{
 const source=fs.readFileSync("global-context.js","utf8"),listeners=[];
 const panel={open:false,addEventListener:(name,fn)=>listeners.push({name,fn})};
 let displayNameConstructions=0;
 class DisplayNames{constructor(){displayNameConstructions++}of(code){return code}}
 const document={readyState:"complete",documentElement:{dataset:{}},getElementById:id=>id==="global-context-panel"?panel:null};
 const context={document,Intl:{DisplayNames},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}},dispatchEvent:()=>{}};
 vm.runInNewContext(source,context);
 assert.equal(displayNameConstructions,0);
 assert.ok(listeners.some(x=>x.name==="toggle"));
 void context.FinPulseGlobalContext.currencies;
 assert.equal(displayNameConstructions,1);
});

test("country selection suggests but does not silently change the currency",()=>{
 Global.update({countryCode:null,locale:"en",currencyCode:"USD",currencyMode:"auto",measurementSystem:"metric",financialJurisdiction:null});
 Global.setCountry("BD");
 assert.equal(Global.suggestedCurrency("BD"),"BDT");
 assert.equal(Global.get().currencyCode,"BDT");
 assert.equal(Global.get().countryCode,"BD");
});

test("user can explicitly apply a country currency suggestion and later override it",()=>{
 Global.useSuggestedCurrency();
 assert.equal(Global.get().currencyCode,"BDT");
 assert.equal(Global.get().currencyMode,"auto");
 Global.setCurrency("EUR");
 assert.equal(Global.get().currencyCode,"EUR");
 assert.equal(Global.get().currencyMode,"manual");
 Global.setCountry("IN");
 assert.equal(Global.get().currencyCode,"EUR");
});

test("territories with multiple legal tender currencies preserve alternatives",()=>{
 assert.deepEqual(Global.getCountry("BT").currencies,["BTN","INR"]);
 assert.equal(Global.suggestedCurrency("BT"),"BTN");
 assert.equal(Global.suggestedCurrency("LS"),"LSL");
 assert.equal(Global.suggestedCurrency("NA"),"NAD");
 assert.equal(Global.suggestedCurrency("ZW"),"ZWG");
 assert.equal(Global.suggestedCurrency("PS"),null);
 assert.deepEqual(Global.getCountry("PA").currencies,["PAB","USD"]);
 assert.equal(Global.suggestedCurrency("AQ"),null);
});

test("locale metadata preserves RTL languages without coupling locale to country or currency",()=>{
 const ar=Global.locales.find(x=>x.code==="ar"),ur=Global.locales.find(x=>x.code==="ur");
 assert.equal(ar.direction,"rtl");
 assert.equal(ur.direction,"rtl");
 Global.setLocale("ar");
 assert.equal(Global.get().locale,"ar");
 assert.equal(Global.get().countryCode,"IN");
 assert.equal(Global.get().currencyCode,"EUR");
 assert.match(Global.formatNumber(12345.67),/١٢/);
});

test("currency formatting validates codes and uses locale independently",()=>{
 assert.match(Global.formatMoney(1234.5,"BDT"),/৳|BDT/);
 assert.throws(()=>Global.formatMoney(1,"ZZZ"),/Unsupported ISO currency code/);
 Global.update({countryCode:null,locale:"en",currencyCode:"USD",currencyMode:"manual",measurementSystem:"metric",financialJurisdiction:null});
});

test("homepage exposes accessible independent global settings and loads the module before app.js",()=>{
 const html=fs.readFileSync("index.html","utf8");
 assert.match(html,/id="global-context-panel"/);
 assert.match(html,/id="global-country"/);
 assert.match(html,/id="global-locale"/);
 assert.match(html,/id="global-currency"/);
 assert.match(html,/id="global-use-suggested"/);
 assert.ok(html.indexOf('src="global-context.js"')<html.indexOf('src="app.js"'));
 assert.match(html,/Currency follows the selected country while automatic mode is active/);assert.match(html,/Monetary tools display and interpret entered amounts in this currency/);assert.match(html,/Tax-profile and US-specific retirement tools retain their required currencies/);
});

test("syntax and GitHub Pages packaging include the global context module",()=>{
 const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
 const deploy=fs.readFileSync(".github/workflows/deploy.yml","utf8");
 assert.match(pkg.scripts.check,/node --check global-context\.js/);
 assert.match(pkg.scripts.test,/tests\/global-context\.test\.cjs/);
 assert.match(deploy,/smart-ui\.js global-context\.js tax-data\.js/);
});
