"use strict";
const http=require("node:http"),fs=require("node:fs"),path=require("node:path"),zlib=require("node:zlib");
const root=process.cwd();
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8",".svg":"image/svg+xml"};
http.createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname)}catch{res.writeHead(400);res.end("Bad request");return}
 if(pathname==="/")pathname="/index.html";
 const target=path.resolve(root,"."+pathname);
 if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);res.end("Forbidden");return}
 fs.readFile(target,(err,data)=>{
  if(err){res.writeHead(404);res.end("Not found");return}
  const type=mime[path.extname(target).toLowerCase()]||"application/octet-stream";
  res.setHeader("Content-Type",type);
  res.setHeader("Cache-Control","no-store");
  if(/text\/|javascript|xml|json/.test(type)&&/\bgzip\b/.test(req.headers["accept-encoding"]||"")){
   zlib.gzip(data,(error,compressed)=>{if(error){res.writeHead(500);res.end("Compression failed");return}res.setHeader("Content-Encoding","gzip");res.setHeader("Vary","Accept-Encoding");res.writeHead(200);res.end(compressed)});
  }else{res.writeHead(200);res.end(data)}
 });
}).listen(4173,"127.0.0.1");
