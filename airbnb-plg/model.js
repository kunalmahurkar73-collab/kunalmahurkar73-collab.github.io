(function(root){
 'use strict';
 const disclosure='This independent product management case study currently uses publicly available secondary research and a clearly labelled synthetic customer dataset to demonstrate research analysis, hypothesis formation, feature prioritization and MVP design. Primary customer research is ongoing. Synthetic responses are not actual participant responses and are excluded from verified research findings. Product recommendations will be reassessed as genuine customer and host feedback becomes available.';
 const number=(x,min=0,max=1e12)=>Math.min(max,Math.max(min,Number.isFinite(Number(x))?Number(x):0));
 function finance(v){const bookings=number(v.bookings),uplift=number(v.uplift,0,100)/100,abv=number(v.abv),fee=number(v.fee,0,100)/100,experience=number(v.experience),variable=number(v.variable),fixed=number(v.fixed);const incrementalBookings=Math.round(bookings*uplift),gbv=incrementalBookings*abv,accommodation=gbv*fee,revenue=accommodation+experience,variableCosts=incrementalBookings*variable,contribution=revenue-variableCosts,profit=contribution-fixed,costs=variableCosts+fixed,unitMargin=abv*fee-variable;return{incrementalBookings,gbv,accommodation,experience,revenue,variableCosts,fixed,contribution,profit,costs,roi:costs?profit/costs*100:null,breakEven:unitMargin>0?Math.ceil(Math.max(0,fixed-experience)/unitMargin):null};}
 function rice(v){return number(v.effort)>0?number(v.reach)*number(v.impact,0,3)*number(v.confidence,0,100)/100/number(v.effort):0;}
 function filter(records,filters){return records.filter(r=>Object.entries(filters).every(([k,v])=>!v||r[k]===v));}
 function counts(records,key){return records.reduce((a,r)=>{for(const v of Array.isArray(r[key])?r[key]:[r[key]]){if(v!==undefined)a[v]=(a[v]||0)+1}return a},{});}
 function tripCost(property,people,nights){const nightly=property.nightly*number(nights,1,30),cleaning=property.cleaning,service=Math.round(nightly*.12),tax=Math.round((nightly+cleaning)*.12),total=nightly+cleaning+service+tax;return{nightly,cleaning,service,tax,total,perPerson:total/number(people,1,12)};}
 function readiness(checks){return Math.round(checks.filter(Boolean).length/checks.length*100);}
 function nights(start,end){const n=(new Date(end+'T00:00:00Z')-new Date(start+'T00:00:00Z'))/86400000;return Number.isFinite(n)&&n>=1&&n<=30?n:null;}
 const api={disclosure,finance,rice,filter,counts,tripCost,readiness,nights,number};root.PLG=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
