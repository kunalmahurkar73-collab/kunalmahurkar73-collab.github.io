/* Cloudflare Worker: no real booking/payment/message actions. Secrets live in Worker settings. */
const enums={
 ageGroup:['18–24','25–34','35–44','45–54','55+'],
 city:['Mumbai','Pune','Bengaluru','Delhi NCR','Hyderabad','Ahmedabad','Chennai','Kolkata','Jaipur','Kochi','Other India city / town'],
 travelFrequency:['0','1','2–4','5+'],
 bookingBehaviour:['Booked Airbnb','Booked hotel / OTA','Browsed Airbnb, never booked','Someone else booked','No accommodation booking in past year'],
 platforms:['Airbnb','MakeMyTrip','Booking.com','Agoda','StayVista','Direct hotel / host','Other','None'],
 tripDuration:['1 night','2–3 nights','4–6 nights','7+ nights','Not applicable'],
 groupSize:['Solo','2 people','3–4 people','5–6 people','7+ people'],
 budget:['Under ₹1,500','₹1,500–2,999','₹3,000–4,999','₹5,000+','Varies / not sure'],
 painPoints:['Group trip coordination','Trust and property reliability','Budget disagreements','Total booking cost','Finding suitable dates','Local activity discovery','None'],
 priceClarity:['Very clear','Somewhat clear','Neither clear nor unclear','Somewhat unclear','Very unclear','Did not book'],
 abandonment:['Did not abandon a booking','Total cost','Could not agree with group','Property uncertainty','Dates unavailable','Payment difficulty','Changed travel plans','Other'],
 repeatBehaviour:['Always','Often','Sometimes','Rarely','Never','Have not booked before'],
 localActivities:['Friends / family','Search / maps','Social media','Accommodation platform','Host recommendation','Did not look for activities'],
 groupPreference:['Very useful','Somewhat useful','Neutral','Not very useful','Not useful'],
 repeatPreference:['Very useful','Somewhat useful','Neutral','Not very useful','Not useful'],
 experiencePreference:['Very useful','Somewhat useful','Neutral','Not very useful','Not useful'],
 propertyType:['Entire apartment','Villa','Private room','Homestay','Hotel / guesthouse','Other'],
 experience:['Not yet hosting','Under 1 year','1–3 years','4+ years'],
 occupancyChallenge:['Weekday gaps','Seasonal demand','Low discovery','Last-minute cancellations','No significant challenge','Other'],
 guestExpectations:['Accurate property details','Cleanliness','Wi-Fi / workspace','Kitchen access','Check-in flexibility','Group space','None'],
 pricingChallenge:['Seasonal price decisions','Competitor comparison','Communicating total cost','Discount expectations','No significant challenge','Other'],
 groupRequirements:['Shared dining space','Enough beds','Parking','Multiple bathrooms','Flexible arrival','Child-friendly amenities','Not sure'],
 readiness:['Fully prepared','Mostly prepared','Some improvements needed','Not suitable','Not sure'],
 operations:['Cleaning coordination','Guest communication','Maintenance','Cancellations','Check-in','None'],
 recommendationDemand:['Very useful','Somewhat useful','Neutral','Not very useful','Not useful'],
 recommendationAction:['Evidence of guest demand','Cost estimate','Clear explanation','Ability to dismiss it','I would not use recommendations','Other']
};
const arrays=['platforms','painPoints','guestExpectations','groupRequirements','operations'];
const required={traveller:['ageGroup','city','travelFrequency','bookingBehaviour','tripDuration','groupSize','budget','priceClarity','abandonment','repeatBehaviour','localActivities','groupPreference','repeatPreference','experiencePreference'],host:['city','propertyType','experience','occupancyChallenge','pricingChallenge','readiness','recommendationDemand','recommendationAction']};
const optional={traveller:['platforms','painPoints','feedback'],host:['guestExpectations','groupRequirements','operations','feedback']};
export function validatePayload(p){
 if(!p||!['traveller','host'].includes(p.role)||p.consent!==true||p.website||!Number.isFinite(p.elapsedMs)||p.elapsedMs<10000||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(p.id||'')||typeof p.turnstileToken!=='string'||p.turnstileToken.length>2048)return false;
 const a=p.answers;if(!a||typeof a!=='object'||Array.isArray(a)||a.role!==p.role)return false;
 const allowed=[...required[p.role],...optional[p.role],'role'];
 if(Object.keys(a).some(k=>!allowed.includes(k)))return false;
 for(const k of required[p.role])if(!enums[k]?.includes(a[k]))return false;
 for(const k of arrays)if(a[k]!==undefined&&(!Array.isArray(a[k])||a[k].length>10||new Set(a[k]).size!==a[k].length||a[k].some(v=>!enums[k].includes(v))||(a[k].includes('None')&&a[k].length>1)))return false;
 if(a.feedback!==undefined&&(typeof a.feedback!=='string'||a.feedback.length>1200))return false;
 return true;
}
export default {async fetch(request,env){
 const origin=request.headers.get('Origin'),allowed=(env.ALLOWED_ORIGINS||'https://kunalmahurkar.is-a.dev').split(',').map(s=>s.trim());
 const cors={'Access-Control-Allow-Origin':allowed.includes(origin)?origin:allowed[0],'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin','Cache-Control':'no-store','Content-Type':'application/json'};
 const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:cors});
 if(!allowed.includes(origin))return reply({error:'Origin not allowed.'},403);
 if(new URL(request.url).pathname!=='/submit')return reply({error:'Not found.'},404);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
 if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
 if(!env.SUPABASE_URL||!env.SUPABASE_SERVICE_ROLE_KEY||!env.TURNSTILE_SECRET||!env.RATE_HASH_SECRET||!env.TURNSTILE_HOSTNAME)return reply({error:'Research collection is not configured.'},503);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply({error:'JSON required.'},415);
 try{
  // Bound the stream before JSON parsing, including requests without Content-Length.
  let total=0,chunks=[];const reader=request.body?.getReader();if(!reader)return reply({error:'Empty response.'},400);
  while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>16000){await reader.cancel();return reply({error:'Response too large.'},413);}chunks.push(value);}
  const all=new Uint8Array(total);let at=0;for(const chunk of chunks){all.set(chunk,at);at+=chunk.length;}const p=JSON.parse(new TextDecoder().decode(all));
  if(!validatePayload(p))return reply({error:'Please review your answers. Select None by itself when applicable.'},400);
  const ip=request.headers.get('CF-Connecting-IP')||'unknown';
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET,response:p.turnstileToken,remoteip:ip})});
  const verified=await verification.json();if(!verified.success||verified.hostname!==env.TURNSTILE_HOSTNAME)return reply({error:'Anti-spam verification failed. Please try again.'},403);
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.RATE_HASH_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const signature=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(new Date().toISOString().slice(0,10)+'|'+ip));
  const hash=Array.from(new Uint8Array(signature),b=>b.toString(16).padStart(2,'0')).join('');
  const result=await fetch(env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/rpc/airbnb_plg_submit',{method:'POST',headers:{'Content-Type':'application/json','apikey':env.SUPABASE_SERVICE_ROLE_KEY,'Authorization':'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY},body:JSON.stringify({p_id:p.id,p_role:p.role,p_answers:p.answers,p_rate_hash:hash})});
  if(!result.ok)return reply({error:'Storage is temporarily unavailable. Your response was not confirmed.'},503);
  if(await result.json()!==true)return reply({error:'This network reached the daily response limit. Please try another day.'},429);
  return reply({saved:true});
 }catch{return reply({error:'Submission could not be confirmed. Please retry.'},503);}
}};
