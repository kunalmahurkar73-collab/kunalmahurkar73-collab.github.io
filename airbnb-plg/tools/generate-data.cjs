const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
fs.mkdirSync(path.join(root, 'downloads'), {recursive:true});
const cities = ['Mumbai','Pune','Bengaluru','Delhi NCR','Hyderabad','Ahmedabad','Chennai','Kolkata','Jaipur','Kochi'];
const ages = ['18–24','25–34','35–44','45–54','55+'];
const segments = ['Existing Airbnb customer','Hotel and OTA customer','Airbnb explorer','Occasional domestic traveller'];
const counts = [35,30,20,15];
const pains = {coordination:68,trust:61,budget:57,totalCost:54,dates:48,activities:32};
const painSets = Object.fromEntries(Object.entries(pains).map(([key,n],k)=>[key,new Set(Array.from({length:n},(_,i)=>(i*37+k*13)%100))]));
const travellers = Array.from({length:100},(_,i)=>{
 let rest=i, s=0;while(rest>=counts[s]) rest-=counts[s++];
 const frequent=(i*7)%10;
 return {id:`SYN-T${String(i+1).padStart(3,'0')}`,synthetic:true,segment:segments[s],city:cities[(i*3+Math.floor(i/10))%10],ageGroup:ages[(i*7+Math.floor(i/7))%5],travelFrequency:frequent<3?'1 trip / year':frequent<8?'2–4 trips / year':'5+ trips / year',bookingBehaviour:s===0?'Booked Airbnb':s===1?'Booked hotel / OTA':s===2?'Browsed Airbnb, never booked':'Infrequent accommodation booking',platform:s===0?'Airbnb':s===1?['MakeMyTrip','Booking.com','Agoda'][i%3]:s===2?['MakeMyTrip','Direct hotel'][i%2]:'Direct hotel',budget:[1500,2500,3500,5000,7500][(i*3)%5],tripDuration:[2,3,4,5,7][i%5],groupSize:[2,3,4,5,6,8][i%6],painPoints:Object.keys(pains).filter(p=>painSets[p].has(i)),featurePreferences:[...(i%5!==0?['group']:[]),...(i%3!==0?['repeat']:[]),...(i%4===0?['experiences']:[])],repeatBehaviour:i%3===0?'Usually tries a different platform':'Considers the previous platform',priceClarity:i%4===0?'Clear':i%4===1?'Somewhat clear':'Unclear',abandonment:i%5===0?'No recent abandonment':i%2===0?'Final price exceeded budget':'Could not agree as a group'};
});
const hosts=Array.from({length:20},(_,i)=>({id:`SYN-H${String(i+1).padStart(3,'0')}`,synthetic:true,city:cities[i%10],propertyType:['Entire apartment','Villa','Private room','Homestay'][i%4],experience:['Under 1 year','1–3 years','4+ years'][i%3],occupancyChallenge:['Weekday gaps','Seasonal demand','Last-minute cancellations','Low discovery'][i%4],needs:['Clearer group requirements','Amenity prioritization','Pricing context','Guest expectation alignment'].filter((_,j)=>(i+j)%3!==0),readiness:40+(i*7)%51,actionableRecommendations:i%5!==0}));
const themes=['Group coordination','Trust and reliability','Budget negotiation','Total price comprehension','Date alignment','Local discovery'];
const interviews=Array.from({length:12},(_,i)=>({id:`FIC-I${String(i+1).padStart(2,'0')}`,fictional:true,role:i<9?'Traveller':'Host',theme:themes[i%6],scenario:i<9?`A fictional ${cities[i%10]} traveller compares a ${[3,4,6][i%3]}-person short break with friends.`:`A fictional ${hosts[i].propertyType.toLowerCase()} host considers how to support a group stay.`,hypothesis:['Shared decisions may reduce coordination effort.','Property details may influence perceived reliability.','Explicit per-person costs may reveal budget conflicts.','A consistent total may improve cost comprehension.','Availability overlap may help a group shortlist dates.','Optional relevant activities may improve itinerary usefulness.'][i%6],limitation:'Scripted discovery prompt, not a completed interview or customer quote.'}));
const data={metadata:{version:1,seed:'airbnb-india-v1-fixed-permutation',synthetic:true,travellerCount:100,hostCount:20,fictionalInterviewCount:12,notice:'Illustrative assumptions. No actual participant responses. Excluded from verified research findings.'},travellers,hosts,interviews};
fs.writeFileSync(path.join(root,'data.js'),'/* Deterministic synthetic demonstration data. Never mix with real responses. */\nwindow.STUDY_DATA = '+JSON.stringify(data,null,2)+';\n');
function csv(name,rows){const keys=Object.keys(rows[0]);const quote=v=>'"'+String(Array.isArray(v)?v.join(' | '):v).replaceAll('"','""')+'"';fs.writeFileSync(path.join(root,'downloads',name),keys.join(',')+'\n'+rows.map(r=>keys.map(k=>quote(r[k])).join(',')).join('\n')+'\n');}
csv('travellers-synthetic.csv',travellers);csv('hosts-synthetic.csv',hosts);csv('interviews-fictional.csv',interviews);
for(const [pain,n]of Object.entries(pains)){if(travellers.filter(t=>t.painPoints.includes(pain)).length!==n)throw Error(pain);}
for(let i=0;i<4;i++)if(travellers.filter(t=>t.segment===segments[i]).length!==counts[i])throw Error('segments');
console.log('Generated and verified: 100 synthetic travellers; 20 hosts; 12 fictional scenarios; exact pain and segment counts.');
