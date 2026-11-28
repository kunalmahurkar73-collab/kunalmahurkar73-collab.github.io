import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createCanvas, DOMMatrix, ImageData, Path2D} from './artifact-build/node_modules/@napi-rs/canvas/index.js';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const pdfjs=await import('./artifact-build/node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'tools/artifact-build/previews');fs.mkdirSync(output,{recursive:true});
const result=[];
for(const name of (process.argv.slice(2).length?process.argv.slice(2):['airbnb-india-case-study','airbnb-india-executive'])){
 const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(path.join(root,'downloads',name+'.pdf'))),useSystemFonts:true}).promise;
 const thumbs=[];
 for(let n=1;n<=doc.numPages;n++){
  const p=await doc.getPage(n),v=p.getViewport({scale:1});const c=createCanvas(Math.ceil(v.width),Math.ceil(v.height));
  await p.render({canvasContext:c.getContext('2d'),viewport:v}).promise;
  const fname=path.join(output,`${name}-${n}.png`);fs.writeFileSync(fname,c.toBuffer('image/png'));
  const txt=await p.getTextContent();result.push({document:name,page:n,textItems:txt.items.length,text:txt.items.map(i=>i.str).join(' ')});
  thumbs.push(c);
 }
 const tw=name.endsWith('executive')?480:238,th=name.endsWith('executive')?270:337,cols=name.endsWith('executive')?2:4,rows=Math.ceil(thumbs.length/cols);
 const m=createCanvas(cols*tw,rows*th);const ctx=m.getContext('2d');ctx.fillStyle='#ddd';ctx.fillRect(0,0,m.width,m.height);thumbs.forEach((c,i)=>ctx.drawImage(c,(i%cols)*tw+3,Math.floor(i/cols)*th+3,tw-6,th-6));fs.writeFileSync(path.join(output,name+'-montage.png'),m.toBuffer('image/png'));
 console.log(name,doc.numPages,'pages rendered');
}
fs.writeFileSync(path.join(output,'text-extraction.json'),JSON.stringify(result,null,2));
