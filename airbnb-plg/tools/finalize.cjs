const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
let file=path.join(root,'styles.css'),s=fs.readFileSync(file,'utf8').replace("font:16px/1.65,'DM Sans'","font:16px/1.65 'DM Sans'");fs.writeFileSync(file,s);
file=path.join(root,'app.js');s=fs.readFileSync(file,'utf8').replace("['case-study.pdf'","['airbnb-india-case-study.pdf'").replace("['executive-presentation.pdf'","['airbnb-india-executive.pdf'").replace("['executive-presentation.html'","['airbnb-india-executive.html'");fs.writeFileSync(file,s);
file=path.join(root,'../index.html');s=fs.readFileSync(file,'utf8').replace('05 ? Product-led growth','05 · Product-led growth').replace('research ? four','research · four').replace('together ? stay together ? return','together · stay together · return');fs.writeFileSync(file,s);
fs.writeFileSync(path.join(root,'downloads/manifest.json'),JSON.stringify(fs.readdirSync(path.join(root,'downloads')).filter(x=>/\.(pdf|pptx?)$/.test(x)),null,2)+'\n');
